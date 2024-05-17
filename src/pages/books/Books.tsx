import { useCallback, useContext, useState } from "react";
import axios from "axios";
import { Flex } from "antd";
import {
  API_ADD_BOOK_TO_FAVORITE_ROUTE,
  API_BOOKS_ROUTE,
  API_REMOVE_BOOK_TO_FAVORITE_ROUTE,
  LOGIN_ROUTE,
} from "../../app/routing/config";
import { ButtonStyle } from "../../components/Button/Button.styles";
import ApiContext from "../../context/apiContext";
import AuthContext from "../../context/authContext";

import { useNavigate } from "react-router-dom";

import { useQuery, useQueryClient } from "react-query";
import { IBook } from "../../types/book.interface";
import { BookTable } from "../../components/Tables/BookTable/BookTable";

const LIMIT_LIST_BOOKS = 3;

function Books() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { isAuth } = useContext(AuthContext);
  const { api } = useContext(ApiContext);

  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const [booksCount, setBooksCount] = useState<number>(0);

  const {
    data: books,
    isLoading,
    isError,
  } = useQuery(["books", page], async () => await getBooks(page), {
    staleTime: 10 * 60 * 1000,
  });

  const getBooks = useCallback(
    async (page: number) => {
      const offset: number = (page - 1) * LIMIT_LIST_BOOKS;

      let source = axios;
      if (isAuth) source = api;
      const resp = await source
        .get(`${API_BOOKS_ROUTE}?offset=${offset}&limit=${LIMIT_LIST_BOOKS}`)
        .catch((err: Error) => {
          console.log(`[Err] Get books`, err);
        });

      if (resp) {
        setBooksCount(resp.data.count);
        setLastPage(Math.ceil(resp.data.count / LIMIT_LIST_BOOKS));
        return resp.data.results;
      }
    },
    [api, isAuth],
  );

  console.warn("[BOOKS PAGE]");

  const addBookToFavorite = useCallback(
    async (book: IBook, idx: number) => {
      if (!isAuth) {
        alert("To add books to favorites, please log in!");
        navigate(LOGIN_ROUTE);
        return;
      }

      const resp = await api.post(API_ADD_BOOK_TO_FAVORITE_ROUTE(book.id)).catch((err: Error) => {
        console.log(`[Error] Add to favorite`, err);
      });

      if (!resp) {
        return;
      }

      const updatedBooks = books.map((book: IBook, index: number) => {
        if (index === idx) {
          return { ...book, is_favorite: true };
        }
        return book;
      });

      queryClient.setQueryData(["books", page], updatedBooks);
    },
    [api, books, isAuth, navigate, queryClient, page],
  );

  const removeBookFromFavorite = useCallback(
    async (book: IBook, idx: number) => {
      const resp = await api.post(API_REMOVE_BOOK_TO_FAVORITE_ROUTE(book.id)).catch((err: Error) => {
        console.log(`[Err] Remove from favorite`, err);
      });

      if (!resp) {
        return;
      }
      console.log(resp);

      const updatedBooks = books.map((book: IBook, index: number) => {
        if (index === idx) {
          return { ...book, is_favorite: false };
        }
        return book;
      });

      queryClient.setQueryData(["books", page], updatedBooks);
    },
    [api, books, queryClient, page],
  );

  return (
    <div className="Books">
      <h2>Книги</h2>
      <p>Всего: {booksCount}</p>
      <BookTable
        books={books}
        isLoading={isLoading}
        // isError={isError}
        addBookToFavorite={addBookToFavorite}
        removeBookFromFavorite={removeBookFromFavorite}
      />
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

export default Books;
