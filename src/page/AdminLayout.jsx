import Header from "../components/header/Header.jsx";
import Sidebar, { SidebarItem } from "../components/body/Sidebar.jsx";
import { LuBarChart3 } from "react-icons/lu";

import { useAuth } from "../context/AuthContext.jsx";

const AdminLayout = ({ children }) => {
  const { user } = useAuth();
  return (
    <main className="flex">
      <Sidebar
        nombre={user ? user.nombre : ""}
        correo={user ? user.correo : ""}
      >
        <SidebarItem
          icon={<LuBarChart3 size={20} />}
          text={"Propiedades"}
          href={"/"}
          active
        />
        
      </Sidebar>
      <section className="p-2 pl-10">
        <div className="mt-5">{children}</div>
      </section>
    </main>
  );
};

export default AdminLayout;
