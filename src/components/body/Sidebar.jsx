import {
  LuMoreVertical,
  LuChevronLast,
  LuChevronFirst,
  LuLogOut,
} from "react-icons/lu";
import { FaHouseUser } from "react-icons/fa";

import { useContext, createContext, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import Logo from "../../assets/img/logos/01.jpeg";

const SidebarContext = createContext();

export default function Sidebar({ children, nombre_usuario, correo }) {
  const [expanded, setExpanded] = useState(true);
  const { logout } = useAuth();

  return (
    <aside className="h-full z-10">
      <nav className="h-screen flex flex-col bg-[#fffcf4] border-r shadow-sm">
        <div
          className={`p-4 pb-2 flex items-center ${
            expanded ? "justify-between" : "justify-center"
          }`}
        >
          <Link to="/modulo-control/lista">
            <img
              src={Logo}
              className={`overflow-hidden opacity-80 transition-all drop-shadow-md shadow-black ${
                expanded ? "w-14 rounded-xl" : "w-0"
              }`}
              alt=""
            />
          </Link>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-amber-300 hover:bg-amber-400 transition duration-300"
          >
            {expanded ? <LuChevronFirst /> : <LuChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3 items-center">
          {correo ? (
            <div className="flex place-items-center">
              <Link
                to="/"
                onClick={() => logout()}
                className="w-14 h-10 shadow bg-amber-300 rounded z-0 place-items-center relative grid"
              >
                <LuLogOut className="rounded-md w-5 h-5" />
                <div
                  className="absolute h-10 shadow rounded z-80 place-items-center transition-all 
                  duration-300 p-2 hover:w-full text-center w-0 bottom-0 font-semibold
                  text-[12px] bg-amber-400 text-black opacity-0 flex hover:opacity-100"
                >
                  Cerrar sesión
                </div>
              </Link>
            </div>
          ) : (
            <div className="w-10 h-10 shadow rounded place-items-center grid">
              <FaHouseUser src="" alt="" className="rounded-md w-5 h-5" />
            </div>
          )}

          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">{nombre_usuario ? nombre_usuario : ""}</h4>
              <span className="text-xs text-gray-600">
                {correo ? correo : ""}
              </span>
            </div>
            <LuMoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert, href }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <Link
      to={href}
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group justify-center
        ${
          active
            ? "bg-gradient-to-tr from-amber-200 to-indigo-100 text-amber-500"
            : "hover:bg-amber-300 text-gray-600"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all capitalize ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-amber-500 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-amber-100 text-gray-700 text-sm capitalize
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </Link>
  );
}
