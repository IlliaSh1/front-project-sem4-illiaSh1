import { useCallback, useContext, useEffect, useState } from "react";
import { Flex } from "antd";

import {
  API_ADD_BOOK_TO_FAVORITE_ROUTE,
  API_FAVORITE_BOOKS_ROUTE,
  API_REMOVE_BOOK_TO_FAVORITE_ROUTE,
} from "../../app/routing/config";
import ApiContext from "../../context/apiContext";
import { IBook } from "./elements/book.interface";
import { ButtonStyle } from "../../components/Button";
import { TableStyle } from "../../components/Table";
import { ColumnsType } from "antd/es/table";

import HeartIcon from "../../components/SvgIcons/heartIcon";

import Icon from "@ant-design/icons";

const LIMIT_LIST_BOOKS = 3;

function FavoriteBooks() {
  const book_table_columns: ColumnsType<IBook> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Название",
      dataIndex: "name",
      key: "name",
      render: (name, book) => <a href={book.link}>{name}</a>,
    },
    {
      title: "Действия",
      dataIndex: "is_favorite",
      key: "is_favorite",
      render: (is_favorite, book, idx) => (
        <>
          {is_favorite ? (
            <ButtonStyle
              danger
              size="large"
              onClick={async () => {
                await removeBookFromFavorite(book, idx);
              }}
              icon={<Icon component={HeartIcon} />}
            />
          ) : (
            <ButtonStyle
              size="large"
              onClick={async () => {
                await addBookToFavorite(book, idx);
              }}
              icon={<Icon component={HeartIcon} />}
            />
          )}
        </>
      ),
    },
    {
      title: "Авторы",
      dataIndex: "authors",
      key: "authors",
      render: (authors) => (
        <>
          {authors.map((author: string, idx: number) => {
            return (
              <>
                {author}
                {idx < authors.length - 1 ? ", " : ""}
              </>
            );
          })}
        </>
      ),
    },
    {
      title: "Год публикации",
      dataIndex: "year_published",
      key: "year_published",
    },
    {
      title: "Количество страниц",
      dataIndex: "pages_count",
      key: "pages_count",
    },
    {
      title: "Дисциплины",
      dataIndex: "disciplines",
      key: "disciplines",
      render: (disciplines) => (
        <>
          {disciplines.map((discipline: string, idx: number) => {
            return (
              <>
                {discipline}
                {idx < disciplines.length - 1 ? ", " : ""}
              </>
            );
          })}
        </>
      ),
    },
  ];
  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const [dataSource, setDataSource] = useState<IBook[]>();

  const { api } = useContext(ApiContext);

  const getFavoriteBooks = useCallback(
    async (page: number, limit: number) => {
      const offset: number = (page - 1) * LIMIT_LIST_BOOKS;

      const resp = await api.get(`${API_FAVORITE_BOOKS_ROUTE}?offset=${offset}&limit=${limit}`).catch((err: Error) => {
        console.log(`[Err] Get favorite books`, err);
      });

      console.log("[FV BOOKS]", resp);
      if (resp) {
        setDataSource(resp.data.results);
        setLastPage(Math.ceil(resp.data.count / LIMIT_LIST_BOOKS));
      }
    },
    [api],
  );

  useEffect(() => {
    getFavoriteBooks(page, LIMIT_LIST_BOOKS);
  }, [getFavoriteBooks, page]);

  const addBookToFavorite = useCallback(
    async (book: IBook, idx: number) => {
      const resp = await api.post(API_ADD_BOOK_TO_FAVORITE_ROUTE(book.id)).catch((err: Error) => {
        console.log(`[Err] Add to favorite`, err);
      });
      if (resp) {
        console.log("resp", resp);
        if (dataSource) {
          console.log("dataSource");
          const updated_book = dataSource[idx];
          updated_book.is_favorite = true;

          setDataSource([
            ...dataSource.slice(0, idx),
            updated_book,
            ...dataSource.slice(idx + 1, dataSource.length + 1),
          ]);
        }
      }
    },
    [api, dataSource],
  );

  const removeBookFromFavorite = useCallback(
    async (book: IBook, idx: number) => {
      const resp = await api.post(API_REMOVE_BOOK_TO_FAVORITE_ROUTE(book.id)).catch((err: Error) => {
        console.log(`[Err] Remove from favorite`, err);
      });

      if (resp) {
        console.log(resp);
        if (dataSource) {
          const updated_book = dataSource[idx];
          updated_book.is_favorite = false;

          setDataSource([
            ...dataSource.slice(0, idx),
            updated_book,
            ...dataSource.slice(idx + 1, dataSource.length + 1),
          ]);
        }
      }
    },
    [api, dataSource],
  );

  return (
    <div className="FavoriteBooks">
      <h2>Избранные книги </h2>
      {/* @ts-expect-error  */}
      <TableStyle dataSource={dataSource} columns={book_table_columns} pagination={false} />
      <Flex className="" justify="center" align="center" gap="15px">
        <ButtonStyle
          onClick={() => {
            setPage(page - 1);
          }}
          disabled={page === 1}
        >
          Назад
        </ButtonStyle>
        <p>
          Страница {page} / {lastPage}
        </p>
        <ButtonStyle
          onClick={() => {
            setPage(page + 1);
          }}
          disabled={page === lastPage}
        >
          Вперед
        </ButtonStyle>
      </Flex>
    </div>
  );
}

export default FavoriteBooks;
