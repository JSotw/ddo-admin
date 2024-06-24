import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.jsx";

const PerfilMenu = () => {
  const { logout } = useAuth();

  return (
    <nav className="absolute z-10 bottom-16 left-0 w-full p-1 animate-duration-300 animate-flip-up">
      <ul className="flex flex-col gap-2 p-2 bg-white shadow-sm rounded-lg w-full h-auto ">
        <li className="">
          <Link
            to="/modulo-perfil/lista"
            className="text-black flex items-center text-xs gap-1 
            hover:text-amber-500 transition duration-300"
          >
            <FaUser />
            Perfil
          </Link>
        </li>
        <li className="">
          <Link
            onClick={logout}
            className="text-black text-xs flex items-center gap-1 
              hover:text-amber-500 transition duration-300"
          >
            <FaSignOutAlt />
            Salir
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default PerfilMenu;
