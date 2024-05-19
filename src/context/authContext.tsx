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
  const navigate = useNavigate();

  const [access_token, setStateAccessToken] = useState<string | null>(
    (function initAccessToken() {
      return localStorage.getItem("access_token") ? localStorage.getItem("access_token") : null;
    })(),
  );
  const [refresh_token, setStateRefreshToken] = useState<string | null>(
    (function initRefreshToken() {
      return localStorage.getItem("refresh_token") ? localStorage.getItem("refresh_token") : null;
    })(),
  );
  const [user, setUser] = useState<DecodedUserType | null>(
    (function initUser() {
      if (access_token === null) return null;

      const user = jwtDecode(access_token);
      console.log("[init] decoded user: ", user);
      if (!instanceofDecodedUser(user)) return null;
      return user;
    })(),
  );
  const [isAuth, setIsAuth] = useState(() => {
    if (user !== null) return true;
    return false;
  });

  function decodeUser(access_token: string): void {
    const user = jwtDecode(access_token);
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
  const setRefreshToken = function (refresh_token: string): void {
    setStateRefreshToken(refresh_token);
    localStorage.setItem("refresh_token", refresh_token);
  };
  const setJWTokens = function ({ access, refresh }: { access: string; refresh: string }): void {
    setAccessToken(access);
    setRefreshToken(refresh);
  };

  const login = async function (form_data: { username: string; password: string }) {
    console.log("Logging in with", form_data);

    const resp = await fetch(`${API_LOGIN_ROUTE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Accept: "application/json",
      },
      body: JSON.stringify(form_data),
    });

    if (!resp.ok) {
      const msg = await resp.json();
      return await Promise.reject(msg);
    }

    const res = resp
      .json()
      .then(async (data) => {
        console.log("[Auth] data: ", data);
        setJWTokens(data);

        setIsAuth(true);

        navigate("success");

        return await Promise.resolve(true);
      })
      .catch(async (err) => {
        return await Promise.reject(err);
      });

    return await res;
  };
  // Logout.
  const logout = () => {
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

      console.log("[REFRESH] NEW access token", { access: res.data.access });
      setAccessToken(res.data.access);
      return res.data.access;
    } catch (err) {
      logout();
      console.log(err);
    }
  };

  const contextData = {
    login,
    logout,
    refreshAccessToken,
    access_token,

    setAccessToken,
    refresh_token,

    isAuth,
    user,
  };

  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};
