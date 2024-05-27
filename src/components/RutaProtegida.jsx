import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function RutaProtegida() {
  const { user, loading, isAuth } = useAuth();
  //console.log(loading, isAuth, user);

  if (!loading && !isAuth) return <Navigate to="/" replace />;
  return <Outlet />;
}

export default RutaProtegida;
