import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";

/* Back Pages */
import RutaProtegida from "./page/RutaProtegida.jsx";
import Dashboard from "./page/Dashboard.jsx";
import Login from "./page/Login.jsx";

import ModuloUsuarios from "./page/usuarios/modulo-usuarios.jsx";
import ModuloProductos from "./page/productos/modulo-productos.jsx";
import { UsuariosProvider } from "./context/UsuariosContext.jsx";
import { ProductosProvider } from "./context/ProductosContext.jsx";

const Rutas = () => {
  return (
    <AuthProvider>
      <UsuariosProvider><ProductosProvider>
        <BrowserRouter>
          <Routes>
            {/* Rutas admin */}
            <Route>
              <Route path="/" element={<Login />} />
              {/* Rutas privadas */}
              <Route element={<RutaProtegida />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/modulo-usuarios" element={<ModuloUsuarios />} />
                <Route path="/modulo-productos" element={<ModuloProductos />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
        </ProductosProvider></UsuariosProvider>
    </AuthProvider>
  );
};

export default Rutas;
