import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, verifyTokenRequest } from "../api/apiAuth.js";
import Cookie  from "js-cookie";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookie.get();
      if (!cookies.token) {
        setIsAuth(false);
        setLoading(false);
        return setUser(null);
      }
      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) {
          setIsAuth(false);
          setLoading(false);
          return;
        }

        setIsAuth(true);
        setLoading(false);
        setUser(res.data);
      } catch (error) {
        setIsAuth(false);
        setUser(null);
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuth(true);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setIsAuth(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signin,
        user,
        isAuth,
        loading,
        errors,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
