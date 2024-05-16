import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../../../context/authContext";
import { LOGIN_ROUTE } from "../config";

const AuthRoute = () => {
  let { isAuth } = useContext(AuthContext);
  return <>{isAuth ? <Outlet /> : <Navigate to={LOGIN_ROUTE} />}</>;
};

export default AuthRoute;
