import Header from "./header/Header.jsx";
import Sidebar, { SidebarItem } from "./body/Sidebar.jsx";
import { LuBarChart3, LuDollarSign, LuUser2 } from "react-icons/lu";
import { FaHamburger } from "react-icons/fa";
import Logo from "../assets/img/logos/01.jpeg";

import { useAuth } from "../context/AuthContext.jsx";

const items = [
  // {
  //   icon: <LuBarChart3 size={20} />,
  //   name: "productos",
  // },
  // {
  //   icon: <LuDollarSign size={20} />,
  //   name: "ventas",
  // },
  {
    icon: <LuUser2 size={20} />,
    name: "usuarios",
  },
  {
    icon: <FaHamburger size={20} />,
    name: "productos",
  },
];

function AdminLayout({ children }) {
  const { user } = useAuth();
  return (
    <main className="">
      {user ? (
        <section className="flex h-full">
          <Sidebar
            nombre_usuario={user ? user.nombre_usuario : ""}
            correo={user ? user.correo : ""}
          >
            {items?.map((item, index) =>
              items ? (
                <div key={index}>
                  <SidebarItem
                    icon={item.icon}
                    text={item.name}
                    href={`/modulo-${item.name}/lista`}
                  />
                </div>
              ) : (
                "No hay items disponibles"
              )
            )}
          </Sidebar>
          <section className="p-2 pl-10">{children}</section>
        </section>
      ) : (
        <>{children}</>
      )}
    </main>
  );
}

export default AdminLayout;
