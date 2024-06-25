import { Link, Outlet, useParams } from "react-router-dom";
import Header from "./header/Header";
import { useAuth } from "../context/AuthContext";
import { BsChevronRight } from "react-icons/bs";
import { FaLink, FaSave } from "react-icons/fa";

function PathModulos({ modulo }) {
  const { user } = useAuth();
  const params = useParams();

  return (
    <>
      <Header text={user ? `${user.primer_n}, estás en ${modulo} ` : ""} />
      <div className="capitalize text-gray-400 text-sm px-4 py-2 flex justify-between">
        <span className="inline-flex items-center">
          <Link className="text-blue-400" to={`/modulo-${modulo}/lista`}>
            {`Módulo ${modulo}`}
          </Link>
          <BsChevronRight className="mx-[2px]" size={14} />
          <p className="">{params["*"]}</p>
        </span>
        {params["*"] === "crear" || params["id"] ? (
          <button
            form={`form-${modulo}`}
            type="submit"
            className="mt-3 shadow-md bg-purple-400 hover:bg-purple-500 text-white
            font-semibold py-2 text-sm px-4 rounded inline-flex items-center justify-center gap-2 
            transition-all w-auto"
          >
            {params["*"] === "crear" ? "Crear" : "Actualizar"}
            <FaSave className="text-white" />
          </button>
        ) : (
          ""
        )}
      </div>
      <Outlet />
    </>
  );
}

export default PathModulos;
