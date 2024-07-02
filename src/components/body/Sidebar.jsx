import { LuMoreVertical, LuChevronLast, LuChevronFirst, LuLogOut } from "react-icons/lu";
import { FaHouseUser, FaUser } from "react-icons/fa";
import { useContext, createContext, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/logos/01.jpeg";
import PerfilMenu from "./perfil/PerfilMenu.jsx";

const SidebarContext = createContext();

export default function Sidebar({ children, nombre_usuario, nombre_completo, imagen_perfil }) {
  const [expanded, setExpanded] = useState(false);
  const [showPerfil, setShowPerfil] = useState(false);

  return (
    <>
      <aside className={`min-h-screen z-30 fixed ${expanded ? 'w-64' : 'w-20'}`}>
        <nav className="min-h-screen flex flex-col bg-[#fffcf4] border-r shadow-sm">
          <div className={`p-4 pb-2 flex items-center ${expanded ? "justify-between" : "justify-center"}`}>
            <Link to="/modulo-control/lista">
              <img
                src={Logo}
                className={`overflow-hidden opacity-80 transition-all drop-shadow-md shadow-black ${expanded ? "w-14 rounded-xl" : "w-0"}`}
                alt="Logo"
              />
            </Link>
            <button onClick={() => setExpanded(curr => !curr)} className="p-1.5 rounded-lg bg-amber-300 hover:bg-amber-400 transition duration-300">
              {expanded ? <LuChevronFirst /> : <LuChevronLast />}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">{children}</ul>
          </SidebarContext.Provider>

          <div className="border-t flex p-2 justify-center items-center">
            {nombre_completo ? (
              <div className="flex place-items-center justify-center">
                <button className="p-1.5 rounded-lg bg-amber-300 hover:bg-amber-400 transition duration-300" onClick={() => setShowPerfil(!showPerfil)}>
                  <LuMoreVertical size={20} />
                </button>
                {showPerfil && <PerfilMenu />}
              </div>
            ) : (
              <div className="w-10 h-10 shadow rounded place-items-center grid">
                <FaHouseUser className="rounded-md w-5 h-5" />
              </div>
            )}

            <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>
              <div className="leading-4">
                <h4 className="font-semibold">{nombre_usuario ? nombre_usuario : ""}</h4>
                <span className="text-xs text-gray-600">{nombre_completo ? nombre_completo : ""}</span>
              </div>
              <div className="grid place-items-center p-1">
                {imagen_perfil ? (
                  <img src={imagen_perfil} className="w-10 h-10 rounded-xl shadow-sm" alt="Imagen de perfil" />
                ) : (
                  <div className="w-10 h-10 rounded-xl shadow-sm grid place-items-center bg-amber-100">
                    <FaUser size={20} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </aside>
      <main className={`transition-all duration-300 ${expanded ? 'ml-64' : 'ml-20'}`}>
        {/* Aquí va el contenido principal */}
      </main>
    </>
  );
}

export function SidebarItem({ icon, text, active, alert, href }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <Link to={href} className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-lg cursor-pointer transition-colors group justify-center ${active ? "bg-gradient-to-tr from-amber-400 to-indigo-100 text-amber-500" : "hover:bg-amber-300 text-gray-600"}`}>
      {icon}
      <span className={`overflow-hidden transition-all capitalize ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>
      {alert && <div className={`absolute right-2 w-2 h-2 rounded-lg bg-amber-500 ${expanded ? "" : "top-2"}`} />}
      {!expanded && <div className={`absolute left-full rounded-lg px-2 py-1 ml-6 bg-amber-300 text-gray-700 text-sm capitalize invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>{text}</div>}
    </Link>
  );
}