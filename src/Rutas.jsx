import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { PropertyProvider } from "./context/PropertyContext.jsx";

/* Back Pages */
import RutaProtegida from "./page/RutaProtegida.jsx";
import Dashboard from "./page/Dashboard.jsx";
import Login from "./page/Login.jsx";

const Rutas = () => {
  return (
    <AuthProvider>
      <PropertyProvider>
        <BrowserRouter>
          <Routes>
            {/* Rutas admin */}
            <Route>
              <Route path="/" element={<Login />} />
              {/* Rutas privadas */}
              <Route element={<RutaProtegida />}>
                <Route
                  path="/dashboard"
                  element={<Dashboard />}
                />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </PropertyProvider>
    </AuthProvider>
  );
};

export default Rutas;
