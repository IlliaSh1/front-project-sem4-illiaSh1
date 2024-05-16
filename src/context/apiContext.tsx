import { createContext, useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import { API_LOGIN_ROUTE, API_REFRESH_ROUTE } from "../app/routing/config";

const ApiContext = createContext<any>({});

export default ApiContext;

export const ApiProvider = ({ children }: { children: any }) => {
  console.warn(`API INIT`);
  let { access_token, logout, refreshAccessToken } = useContext(AuthContext);

  let instance = axios.create({
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use(
    (config) => {
      console.log("[API] req", { url: config.url, access: access_token });
      if (!access_token) Promise.reject(new Error("No access token"));
      if (!config.headers["Authorization"]) config.headers["Authorization"] = `Bearer ${access_token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      console.log("aboba 2");
      const originalConfig = err.config;
      console.log(err);
      console.log("[resp] config", { url: originalConfig.url, access: access_token });

      if (originalConfig.url !== API_LOGIN_ROUTE && err.response /* || auth.isAuth === false */) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          console.log("[Err] token expired", err);
          originalConfig._retry = true;

          try {
            let access_token = await refreshAccessToken();

            originalConfig.headers["Authorization"] = `Bearer ${access_token}`;
            return instance(originalConfig);
          } catch (_error) {
            logout();
            console.log("[REFRESH ERR]", _error);
            return Promise.reject(_error);
          }
        }
      }

      console.log("[API] Request failed", err);
      return Promise.reject(err);
    },
  );

  let contextData = {
    api: instance,
  };

  return <ApiContext.Provider value={contextData}>{children}</ApiContext.Provider>;
};
// let resp = async () => {
//   console.log("[REFRESH] access token");
//   try {
//     const res = await axios.post(API_REFRESH_ROUTE, {
//       refresh: refresh_token,
//     });

//     console.log("[REFRESH] NEW access token", res.data['access']);
//     setAccessToken(res.data['access']);

//   } catch (err) {
//     logout();
//     console.log(err);
//   }

// }
// originalConfig.headers["Authorization"] = `Bearer ${access_token}`
// console.log(`instance refreshed AC - `, {'access': access_token});
