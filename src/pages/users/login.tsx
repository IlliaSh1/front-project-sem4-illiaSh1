import { useContext, useState } from "react";
import { Flex, Form, Input } from "antd";
import AuthContext from "../../context/authContext";
import { ButtonStyle } from "../../components/Button";
import FormItemStyle from "../../components/Form/AntFormItem";
import InputErrorStyle from "../../components/Form/InputError";

interface FormDataType {
  username: string;
  password: string;
}

type FieldType = {
  username?: string;
  password?: string;
};

interface ILoginFormErrors {
  username?: string;
  password?: string;
  detail?: string;
}
function instanceOfILoginFormErrors(obj: any): obj is ILoginFormErrors {
  return "username" in obj || "password" in obj || "detail" in obj;
}

function Login() {
  let { login, logout } = useContext(AuthContext);
  let { isAuth } = useContext(AuthContext);

  const [loginFormErrors, setLoginFormErrors] = useState<ILoginFormErrors>({});

  const onFinish = (form_data: FormDataType) => {
    setLoginFormErrors({});

    console.log("Sending:", form_data);
    login(form_data)
      .then((res: any) => {
        console.log("Success:", res);
      })
      .catch((err: Error) => {
        console.log("Error:", err);
        if (instanceOfILoginFormErrors(err)) setLoginFormErrors(err);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Flex className="Users" align="center" vertical>
      {isAuth ? <h2>Профиль</h2> : <h2>Вход</h2>}
      {isAuth ? (
        <Flex vertical gap={"5px"}>
          <p>Вы уже авторизованы!</p>
          <ButtonStyle onClick={logout} danger>
            Выйти
          </ButtonStyle>
        </Flex>
      ) : (
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, width: "100%" }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
        >
          {/* @ts-ignore */}
          <FormItemStyle<FieldType>
            label="Имя пользователя"
            name="username"
            rules={[{ required: true, message: "Пожалуйста введите имя пользователя" }]}
          >
            <Input />
          </FormItemStyle>
          {/* @ts-ignore */}
          <FormItemStyle<FieldType>
            label="Пароль"
            name="password"
            rules={[{ required: true, message: "Пожалуйста введите пароль!" }]}
          >
            <Input.Password />
          </FormItemStyle>

          {loginFormErrors.detail ? (
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <InputErrorStyle>{loginFormErrors.detail}</InputErrorStyle>
            </Form.Item>
          ) : (
            <></>
          )}

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <ButtonStyle type="primary" htmlType="submit">
              Войти
            </ButtonStyle>
          </Form.Item>
        </Form>
      )}
    </Flex>
  );
}

export default Login;
