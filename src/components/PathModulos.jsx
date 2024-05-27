import { Link, Outlet, useLocation } from "react-router-dom";
import Header from "./header/Header";
import { useAuth } from "../context/AuthContext";
import { BsChevronRight } from "react-icons/bs";




function PathModulos({ modulo }) {
  const { user } = useAuth();
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(segment => segment);
  const lastSegment = pathSegments[pathSegments.length - 1];
  return (
    <>
      <Header text={user ? `${user.primer_n}, estás en ${modulo} ` : ""} />
      <div className="capitalize text-gray-400 text-sm px-4 py-2 inline-flex items-center">
        <Link
          className="text-blue-400"
          to={`/modulo-${modulo}/lista`}
        >
          {`Módulo ${modulo}`}
        </Link>
        <BsChevronRight className="mx-[2px]" size={14}/>
        <p className="">{lastSegment}</p>
      </div>
      <Outlet />
    </>
  );
}

export default PathModulos;
