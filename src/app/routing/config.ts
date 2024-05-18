// export const UNIVERSITIES_ROUTE = '/universities'
export const HOME_ROUTE = "/";
export const USERS_ROUTE = "/users";
export const LOGIN_ROUTE = "/login";
export const BOOKS_ROUTE = "/books";
export const FAVORITE_BOOKS_ROUTE = "/books/favorite";

export const FEEDBACK_ROUTE = "/feedback";

// API fetch routes
export const API_ROOT_ROUTE = "http://127.0.0.1:8000/";

export const API_LOGIN_ROUTE = "http://127.0.0.1:8000/users/api/v1/login/";
export const API_REFRESH_RELATED_ROUTE = "users/api/v1/refresh/";
export const API_REFRESH_ROUTE = "http://127.0.0.1:8000/users/api/v1/refresh/";

export const API_BOOKS_ROUTE = "http://127.0.0.1:8000/parser/api/v1/books/";
export const API_FAVORITE_BOOKS_ROUTE = "http://127.0.0.1:8000/parser/api/v1/books/get_favorite_books/";
export const API_ADD_BOOK_TO_FAVORITE_ROUTE = (book_id: number): string =>
  `http://127.0.0.1:8000/parser/api/v1/books/${book_id}/add_to_favorite/`;
export const API_REMOVE_BOOK_TO_FAVORITE_ROUTE = API_ADD_BOOK_TO_FAVORITE_ROUTE;

export const API_USERS_ROUTE = "http://127.0.0.1:8000/users/api/v1/user/";

// PDF
export const PDF_ROUTE = "/pdf";
//
export const UNIVERSITIES_DYNAMIC_PAGINATION = "/universities";
