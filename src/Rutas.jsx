import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { UsuariosProvider } from "./context/UsuariosContext.jsx";
import { ProductosProvider } from "./context/ProductosContext.jsx";
import { PedidosProvider } from "./context/PedidosContext.jsx";
import { ReportProvider } from "./context/ReportsContext.jsx";
import AdminLayout from "./components/AdminLayout.jsx";

// Páginas de Autentificación
import RutaProtegida from "./components/RutaProtegida.jsx";
import Dashboard from "./page/dashboard.jsx";
import Login from "./page/login.jsx";
import RecuperarCuenta from "./page/recuperar-cuenta.jsx";
import PathModulos from "./components/PathModulos.jsx";
// Páginas de perfil
import Perfil from "./page/perfil/perfil.jsx";

// Páginas de Usuarios
import ListaUsuarios from "./page/usuarios/lista-usuarios.jsx";
import CrearUsuario from "./page/usuarios/crear-usuario.jsx";

// Páginas de Productos
import ListaProductos from "./page/productos/lista-productos.jsx";
import CrearProducto from "./page/productos/crear-producto.jsx";
import ActualizarProducto from "./page/productos/actualizar-producto.jsx";

//Páginas de pedidos
import CrearPedidos from "./page/pedidos/crear-pedido.jsx";
// 
import "./App.css";
import ActualizarUsuario from "./page/usuarios/actualizar-usuario.jsx";

const Rutas = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AdminLayout>
          {/* -> Navegación */}
          <Routes>
            {/* Rutas de generales */}
            <Route path="/" element={<Login />}></Route>
            <Route path="/recuperar-cuenta" element={<RecuperarCuenta />} />
          </Routes>

          {/* Rutas de control*/}
          <ReportProvider>
            <Routes>
              <Route element={<RutaProtegida />}>
                <Route
                  path="/modulo-control/*"
                  element={<PathModulos modulo={"control"} />}
                >
                  <Route path="lista" element={<Dashboard />} />
                </Route>
              </Route>
            </Routes>
          </ReportProvider>
          {/* Rutas del modulo de usuarios */}
          <UsuariosProvider>
            <Routes>
              <Route element={<RutaProtegida />}>
                <Route
                  path="/modulo-usuarios/*"
                  element={<PathModulos modulo={"usuarios"} />}
                >
                  <Route path="lista" element={<ListaUsuarios />} />
                  <Route path="crear" element={<CrearUsuario />} />
                  <Route
                    path="actualizar/:id"
                    element={<ActualizarUsuario />}
                  />
                </Route>
              </Route>
            </Routes>
          </UsuariosProvider>
          {/* Rutas del modulo de productos */}
          <ProductosProvider>
            <Routes>
              <Route element={<RutaProtegida />}>
                <Route
                  path="/modulo-productos/*"
                  element={<PathModulos modulo={"productos"} />}
                >
                  {/* Rutas anidadas */}
                  <Route path="lista" element={<ListaProductos />} />
                  <Route path="crear" element={<CrearProducto />} />
                  <Route path="actualizar/:id" element={<ActualizarProducto />} />
                </Route>
              </Route>
            </Routes>
          </ProductosProvider>
          {/* Rutas del modulo de pedidos */}
          <PedidosProvider>
            <Routes>
              <Route element={<RutaProtegida />}>
                <Route
                  path="/modulo-pedidos/*"
                  element={<PathModulos modulo={"pedidos"} />}
                >
                  {/* Rutas anidadas */}
                  <Route path="crear" element={<CrearPedidos />} />
                  <Route path="lista" element={<CrearPedidos />} />
                </Route>
              </Route>
            </Routes>
          </PedidosProvider>
        </AdminLayout>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default Rutas;
