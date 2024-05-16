// BookTable.tsx
import { ColumnsType } from "antd/es/table";
import { TableStyle } from "../Table.styles";
import HeartIcon from "../../SvgIcons/heartIcon";
import Icon from "@ant-design/icons";
import { ButtonStyle } from "../../Button/Button.styles";
import { IBook } from "../../../types/book.interface";

interface BookTableProps {
  books: IBook[];
  isLoading: boolean;
  addBookToFavorite: (book: IBook, idx: number) => Promise<void>;
  removeBookFromFavorite: (book: IBook, idx: number) => Promise<void>;
}

export const BookTable = ({ books, isLoading, addBookToFavorite, removeBookFromFavorite }: BookTableProps) => {
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
      render: (is_favorite: boolean, book, idx: number) => (
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
              <span key={idx}>
                {author}
                {idx < authors.length - 1 ? ", " : ""}
              </span>
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
              <span key={idx}>
                {discipline}
                {idx < disciplines.length - 1 ? ", " : ""}
              </span>
            );
          })}
        </>
      ),
    },
  ];

  return (
    <TableStyle
      dataSource={books}
      columns={book_table_columns}
      loading={isLoading}
      pagination={false}
      rowKey={(record) => String(record.id)}
    />
  );
};
