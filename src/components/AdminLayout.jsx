import Sidebar, { SidebarItem } from "./body/Sidebar.jsx";
import {
  FaHamburger,
  FaUser,
  FaChartPie,
  FaCalendarCheck,
} from "react-icons/fa";
import { useMediaQuery } from "react-responsive";

import { useAuth } from "../context/AuthContext.jsx";
import NavBottom from "./body/NavBottom.jsx";

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
    icon: <FaChartPie size={27} />,
    name: "control",
    defaultRef: "lista",
  },
  {
    icon: <FaCalendarCheck size={27} />,
    name: "pedidos",
    defaultRef: "lista",
  },
  {
    icon: <FaHamburger size={27} />,
    name: "productos",
    defaultRef: "lista",
  },
  {
    icon: <FaUser size={27} />,
    name: "usuarios",
    defaultRef: "lista",
  },
];

function AdminLayout({ children }) {
  const { user } = useAuth();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  console.log(isMobile);
  return (
    <main className="">
      {user ? (
        !isMobile ? (
          <section className="flex h-full">
            <Sidebar
              nombre_usuario={user ? user.nombre_usuario : ""}
              nombre_completo={
                user ? `${user.primer_n} ${user.apellido_p}` : ""
              }
              imagen_perfil={user ? user.imagen_perfil : ""}
            >
              {items?.map((item, index = "lista") =>
                items ? (
                  <div key={index}>
                    <SidebarItem
                      icon={item.icon}
                      text={item.name}
                      href={`/modulo-${item.name}/${item.defaultRef}`}
                    />
                  </div>
                ) : (
                  "No hay items disponibles"
                )
              )}
            </Sidebar>
            <section className="p-2 px-24">{children}</section>
          </section>
        ) : (
          <section className="grid gap-6">
            <div className="p-4 pb-20">{children}</div>
            <NavBottom />
          </section>
        )
      ) : (
        <>{children}</>
      )}
    </main>
  );
}

export default AdminLayout;
