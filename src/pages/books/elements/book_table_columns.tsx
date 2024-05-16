import { ColumnsType } from "antd/es/table";
import { IBook } from "./book.interface";
import { ButtonStyle } from "../../../components/Button";
import Icon from "@ant-design/icons";
import HeartIcon from "../../components/SvgIcons/SvgHeart/heart";

// export const book_table_columns: ColumnsType<BookType> = [
//     {
//       title: 'Id',
//       dataIndex: 'id',
//       key: 'id',
//     },
//     {
//       title: 'Название',
//       dataIndex: 'name',
//       key: 'name',
//       render: (name, book) => <a href={book.link}>{name}</a>,
//     },
//     {
//       title: 'Действия',
//       dataIndex: 'is_favorite',
//       key: 'is_favorite',
//       render: (is_favorite, book, idx) => (
//         <>
//           {is_favorite ?
//             <ButtonStyle danger size='large' onClick={() => removeBookFromFavorite(book, idx)}
//               icon={<Icon component={HeartSvg} />}/>
//             : <ButtonStyle size='large' onClick={() => addBookToFavorite(book, idx)}
//                 icon={<Icon component={HeartSvg} />}/>
//           }
//         </>
//       ),
//     },
//     {
//       title: 'Авторы',
//       dataIndex: 'authors',
//       key: 'authors',
//       render: (authors) => (
//         <>
//           {authors.map((author: String, idx: number) => {
//             return (
//               <>{author}{idx < authors.length - 1 ? ", " : ""}</>
//             );
//           })}
//         </>
//       ),
//     },
//     {
//       title: 'Год публикации',
//       dataIndex: 'year_published',
//       key: 'year_published',
//     },
//     {
//       title: 'Количество страниц',
//       dataIndex: 'pages_count',
//       key: 'pages_count',
//     },
//     {
//       title: 'Дисциплины',
//       dataIndex: 'disciplines',
//       key: 'disciplines',
//       render: (disciplines) => (
//         <>
//           {disciplines.map((discipline: String, idx: number) => {
//             return (
//               <>{discipline}{idx < disciplines.length - 1 ? ", " : ""}</>
//             );
//           })}
//         </>
//       ),
//     },
//   ]
