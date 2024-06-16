import { Link, Outlet, useParams } from "react-router-dom";
import Header from "./header/Header";
import { useAuth } from "../context/AuthContext";
import { BsChevronRight } from "react-icons/bs";


function PathModulos({ modulo }) {
  const { user } = useAuth();
  const params = useParams();

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
        <p className="">{params["*"]}</p>
      </div>
      <Outlet />
    </>
  );
}

export default PathModulos;
