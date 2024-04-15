import Header from "../components/header/Header.jsx";
import Sidebar, { SidebarItem } from "../components/body/Sidebar.jsx";
import { LuBarChart3, LuDollarSign, LuUser2 } from "react-icons/lu";

import { useAuth } from "../context/AuthContext.jsx";

const items = [
  {
    icon: <LuBarChart3 size={20} />,
    name: "productos",
  },
  {
    icon: <LuDollarSign size={20} />,
    name: "ventas",
  },
  {
    icon: <LuUser2 size={20} />,
    name: "usuarios",
  },
];

const AdminLayout = ({ children }) => {
  const { user } = useAuth();
  return (
    <main className="flex">
      <Sidebar
        nombre={user ? user.nombre : ""}
        correo={user ? user.correo : ""}
      >
        {items?.map((item, index) =>
          items ? (
            <div key={index}>
              <SidebarItem icon={item.icon} text={item.name} href={`/${item.name}`} />
            </div>
          ) : (
            "No hay items disponibles"
          )
        )}
      </Sidebar>
      <section className="p-2 pl-10">
        <div className="mt-5">{children}</div>
      </section>
    </main>
  );
};

export default AdminLayout;
