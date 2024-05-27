import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { UsuariosProvider } from "./context/UsuariosContext.jsx";
import { ProductosProvider } from "./context/ProductosContext.jsx";
import AdminLayout from "./components/AdminLayout.jsx";

// Páginas de Autentificación
import RutaProtegida from "./components/RutaProtegida.jsx";
import Dashboard from "./page/Dashboard.jsx";
import Login from "./page/Login.jsx";
import RecuperarCuenta from "./page/recuperar-cuenta.jsx";
import PathModulos from "./components/PathModulos.jsx";

// Páginas de Usuarios
import ListaUsuarios from "./page/usuarios/lista-usuarios.jsx";
import CrearUsuario from "./page/usuarios/crear-usuario.jsx";

// Páginas de Productos
import ListaProductos from "./page/productos/lista-productos.jsx";

const Rutas = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AdminLayout>
          {/* -> Navegación */}
          <Routes>
            {/* Rutas de autentificación */}
            <Route path="/" element={<Login />}></Route>
            <Route path="/recuperar-cuenta" element={<RecuperarCuenta />} />

            {/* Rutas de inicio*/}
            <Route element={<RutaProtegida />}>
              <Route path="/modulo-control/*" element={<PathModulos modulo={"control"} />}>
                <Route path="lista" element={<Dashboard />} />
              </Route>
            </Route>
          </Routes>
          {/* Rutas del modulo de usuarios */}
          <UsuariosProvider>
            <Routes>
              <Route element={<RutaProtegida />}>
                <Route path="/modulo-usuarios/*" element={<PathModulos modulo={"usuarios"} />}>
                  <Route path="lista" element={<ListaUsuarios />} />
                  <Route path="crear" element={<CrearUsuario />} />
                </Route>
              </Route>
            </Routes>
          </UsuariosProvider>
          {/* Rutas del modulo de productos */}
          <ProductosProvider>
            <Routes>
              <Route element={<RutaProtegida />}>
                <Route path="/modulo-productos/*" element={<PathModulos modulo={"productos"} />}>
                  {/* Rutas anidadas */}
                  <Route path="lista" element={<ListaProductos />} />
                  <Route path="crear" element={<CrearUsuario />} />
                </Route>
              </Route>
            </Routes>
          </ProductosProvider>
        </AdminLayout>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default Rutas;
