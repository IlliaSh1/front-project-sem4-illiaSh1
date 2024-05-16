import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../../../context/authContext";
import { HOME_ROUTE } from "../config";

const AdminRoute = () => {
  let { isAuth, user } = useContext(AuthContext);

  return (
    <>
      {isAuth && user.is_admin ? (
        <Outlet />
      ) : (
        function () {
          alert("У вас нет прав администратора");
          <Navigate to={HOME_ROUTE} />;
        }
      )}
    </>
  );
};

export default AdminRoute;
