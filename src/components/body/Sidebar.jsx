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

const SidebarContext = createContext();

export default function Sidebar({ children, nombre, correo }) {
  const [expanded, setExpanded] = useState(true);
  const {logout} = useAuth();

  return (
    <aside className="sm:h-screen flex z-30">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src={"Logo"}
            className={`overflow-hidden opacity-80 transition-all drop-shadow-md shadow-black ${
              expanded ? "w-12" : "w-0"
            }`}
            alt=""
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
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
                className="w-14 h-10 shadow rounded z-0 place-items-center relative grid"
              >
                <LuLogOut className="rounded-md w-5 h-5" />
                <div
                  className="absolute h-10 shadow rounded z-80 place-items-center transition-all 
                  duration-300 p-2 hover:w-full text-center w-0 bottom-0
                  text-[12px] bg-gray-800 text-white opacity-0 flex hover:opacity-100"
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
              <h4 className="font-semibold">{nombre ? nombre : ""}</h4>
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
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
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
