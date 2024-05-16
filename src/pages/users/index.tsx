import { useCallback, useContext, useEffect, useState } from "react";
import { Flex } from "antd";
import { ColumnsType } from "antd/es/table";
import { API_USERS_ROUTE } from "../../app/routing/config";
import ApiContext from "../../context/apiContext";
import { ButtonStyle } from "../../components/Button/Button.styles";
import { TableStyle } from "../../components/Tables/Table.styles";

interface UserType {
  id: number;
  username: string;
  email: string[];
}

function AllUsers() {
  const user_table_columns: ColumnsType<UserType> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Имя пользователя",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  const LIMIT_LIST_USERS = 3;
  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const [dataSource, setDataSource] = useState<UserType[]>();

  let { api } = useContext(ApiContext);

  const getUsers = useCallback(
    async (page: number, limit: number) => {
      const offset: number = (page - 1) * LIMIT_LIST_USERS;
      const resp = await api.get(`${API_USERS_ROUTE}?offset=${offset}&limit=${limit}`).catch((err: Error) => {
        console.log(`[Err] Get users`, err);
      });

      console.log("[USERS]", resp);
      if (resp) {
        console.log(`aboba`);
        setDataSource(resp.data.results);
        setLastPage(Math.ceil(resp.data.count / LIMIT_LIST_USERS));
      }
    },
    [api],
  );

  useEffect(() => {
    console.log("getting users.");
    getUsers(page, LIMIT_LIST_USERS);
  }, [getUsers, page]);

  return (
    <div className="Users">
      <h2>Все пользователи</h2>
      {/* @ts-ignore  */}
      <TableStyle dataSource={dataSource} columns={user_table_columns} pagination={false} />
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

export default AllUsers;
