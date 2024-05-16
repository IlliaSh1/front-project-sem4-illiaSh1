import HeartIcon from "../../components/SvgIcons/SvgHeart/heart";
import { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Flex } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  API_ADD_BOOK_TO_FAVORITE_ROUTE,
  API_BOOKS_ROUTE,
  API_REMOVE_BOOK_TO_FAVORITE_ROUTE,
  LOGIN_ROUTE,
} from "../../../app/routing/config";

import { useNavigate } from "react-router-dom";

import Icon from "@ant-design/icons";
import { useQuery } from "react-query";
import AuthContext from "../../../context/authContext";
import ApiContext from "../../../context/apiContext";
import { TableStyle } from "../../Table";
import { ButtonStyle } from "../../Button";

interface IBook {
  id: number;
  link: string;
  authors: string[];
  name: string;
  cover: string;
  annotation: string;
  bibl_record: string;
  year_published: number;
  pages_count: number;
  isbn: string;
  disciplines: string[];
  is_favorite?: boolean;
}

const LIMIT_LIST_BOOKS = 3;

function BooksTable() {
  let navigate = useNavigate();

  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const [booksCount, setBooksCount] = useState<number>(0);
  const [dataSource, setDataSource] = useState<IBook[]>();

  const { data, isLoading, isError } = useQuery(["books", page], () => getBooks(page, LIMIT_LIST_BOOKS), {
    keepPreviousData: true,
  });

  let { isAuth } = useContext(AuthContext);

  const { api } = useContext(ApiContext);

  const getBooks = useCallback(
    async (page: number, limit: number) => {
      const offset: number = (page - 1) * LIMIT_LIST_BOOKS;

      let source = axios;
      if (isAuth) source = api;
      const resp = await source.get(`${API_BOOKS_ROUTE}?offset=${offset}&limit=${limit}`).catch((err: Error) => {
        console.log(`[Err] Get books`, err);
      });

      if (resp) {
        setDataSource(resp.data.results);
        setBooksCount(resp.data.count);
        setLastPage(Math.ceil(resp.data.count / LIMIT_LIST_BOOKS));
        return resp.data.results;
      }
    },
    [api, isAuth],
  );

  useEffect(() => {
    getBooks(page, LIMIT_LIST_BOOKS);
  }, [getBooks, page]);

  //
  console.warn("[BOOKS PAGE]");
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
              onClick={() => removeBookFromFavorite(book, idx)}
              icon={<Icon component={HeartSvg} />}
            />
          ) : (
            <ButtonStyle
              size="large"
              onClick={() => addBookToFavorite(book, idx)}
              icon={<Icon component={HeartSvg} />}
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
          {authors.map((author: String, idx: number) => {
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
          {disciplines.map((discipline: String, idx: number) => {
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

  // const addBookToFavorite = useCallback(async (book: IBook, idx: number) => {
  //   if(!isAuth) {
  //     console.log("Чтобы добавлять книги в избранное нужно авторизоваться!");
  //     navigate(LOGIN_ROUTE);
  //     return;
  //   }
  //   let resp = await api.post(API_ADD_BOOK_TO_FAVORITE_ROUTE(book.id))
  //     .catch((err: Error) => {
  //       console.log(`[Err] Add to favorite`, err);
  //     })
  //   if(resp) {
  //     console.log("resp", resp);
  //     if(dataSource) {
  //       console.log("dataSource");
  //       let updated_book = dataSource[idx]
  //       updated_book.is_favorite = true;

  //       setDataSource([...dataSource.slice(0, idx), updated_book, ...dataSource.slice(idx+1, dataSource.length + 1)]);
  //     }
  //   }

  // }, [api, dataSource, isAuth, navigate]);

  // const removeBookFromFavorite = useCallback(async (book: IBook, idx: number) => {
  //   let resp = await api.post(API_REMOVE_BOOK_TO_FAVORITE_ROUTE(book.id))
  //     .catch( (err: Error) => {
  //       console.log(`[Err] Remove from favorite`, err)
  //     });

  //   if(resp) {
  //     console.log(resp);
  //     if(dataSource) {
  //       let updated_book = dataSource[idx]
  //       updated_book.is_favorite = false;

  //       setDataSource([...dataSource.slice(0, idx), updated_book, ...dataSource.slice(idx+1, dataSource.length + 1)]);
  //     }
  //   }

  // }, [api, dataSource]);

  return (
    <div className="BooksTable">
      <p>Всего: {booksCount}</p>
      {/* @ts-ignore  */}
      <TableStyle
        dataSource={dataSource}
        columns={book_table_columns}
        pagination={false}
        rowKey={(record) => String(record.id)}
      />
      {/* <CustomTable dataSource={dataSource} columns={book_table_columns} /> */}
      <Flex className="" justify="center" align="center" gap="15px">
        <ButtonStyle onClick={() => setPage(page - 1)} disabled={page === 1}>
          Назад
        </ButtonStyle>
        <p>
          Страница {page} / {lastPage}
        </p>
        <ButtonStyle onClick={() => setPage(page + 1)} disabled={page === lastPage}>
          Вперед
        </ButtonStyle>
      </Flex>
    </div>
  );
}

export default BooksTable;
