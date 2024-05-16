import { createContext, useState } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";
import axios from "axios";
import { API_LOGIN_ROUTE, API_REFRESH_ROUTE, LOGIN_ROUTE } from "../app/routing/config";

import { useNavigate } from "react-router-dom";

const AuthContext = createContext<any>({});

export default AuthContext;

interface DecodedUserType extends JwtPayload {
  user_id: number;
  username: string;
  email: string;
  is_admin: boolean;
}

function instanceofDecodedUser(object: any): object is DecodedUserType {
  return "user_id" in object && "username" in object && "email" in object;
}

export const AuthProvider = ({ children }: { children: any }) => {
  let navigate = useNavigate();

  let [access_token, setStateAccessToken] = useState<string | null>(
    (function initAccessToken() {
      return localStorage.getItem("access_token") ? localStorage.getItem("access_token") : null;
    })(),
  );
  let [refresh_token, setStateRefreshToken] = useState<string | null>(
    (function initRefreshToken() {
      return localStorage.getItem("refresh_token") ? localStorage.getItem("refresh_token") : null;
    })(),
  );
  let [user, setUser] = useState<DecodedUserType | null>(
    (function initUser() {
      if (access_token === null) return null;

      let user = jwtDecode(access_token);
      console.log("[init] decoded user: ", user);
      if (!instanceofDecodedUser(user)) return null;
      return user;
    })(),
  );
  let [isAuth, setIsAuth] = useState(() => {
    if (user !== null) return true;
    return false;
  });

  function decodeUser(access_token: string): void {
    let user = jwtDecode(access_token);
    console.log("decoded user: ", user);
    if (!instanceofDecodedUser(user)) throw new Error("User not matched type decoded user.");
    // localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  }

  const setAccessToken = function (access_token: string): void {
    decodeUser(access_token);
    setStateAccessToken(access_token);
    localStorage.setItem("access_token", access_token);
  };
  let setRefreshToken = function (refresh_token: string): void {
    setStateRefreshToken(refresh_token);
    localStorage.setItem("refresh_token", refresh_token);
  };
  let setJWTokens = function ({ access, refresh }: { access: string; refresh: string }): void {
    setAccessToken(access);
    setRefreshToken(refresh);
  };

  let login = async function (form_data: { username: string; password: string }) {
    console.log("Logging in with", form_data);

    let resp = await fetch(`${API_LOGIN_ROUTE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Accept: "application/json",
      },
      body: JSON.stringify(form_data),
    });

    if (!resp.ok) {
      let msg = await resp.json();
      return Promise.reject(msg);
    }

    let res = resp
      .json()
      .then((data) => {
        console.log("[Auth] data: ", data);
        setJWTokens(data);

        setIsAuth(true);

        navigate("success");

        return Promise.resolve(true);
      })
      .catch((err) => {
        return Promise.reject(err);
      });

    return res;
  };
  // Logout.
  let logout = () => {
    console.log("[LOGGED OUT]");
    setStateAccessToken(null);
    setStateRefreshToken(null);
    setUser(null);
    setIsAuth(false);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate(LOGIN_ROUTE);
  };

  // Refresh token.
  const refreshAccessToken = async () => {
    console.log("[REFRESH] access token");
    try {
      const res = await axios.post(API_REFRESH_ROUTE, {
        refresh: refresh_token,
      });

      console.log("[REFRESH] NEW access token", { access: res.data["access"] });
      setAccessToken(res.data["access"]);
      return res.data["access"];
    } catch (err) {
      logout();
      console.log(err);
    }
  };

  let contextData = {
    login: login,
    logout: logout,
    refreshAccessToken: refreshAccessToken,
    access_token: access_token,

    setAccessToken: setAccessToken,
    refresh_token: refresh_token,

    isAuth: isAuth,
    user: user,
  };

  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};
