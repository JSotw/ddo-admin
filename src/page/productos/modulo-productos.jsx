import { useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../AdminLayout.jsx";
import { useProductos } from "../../context/ProductosContext.jsx";
import {
  FaPen,
  FaPlus,
  FaPlusCircle,
  FaPlusSquare,
  FaTrash,
  FaHamburger 
} from "react-icons/fa";

const ModuloProductos = () => {
  const { getProductos, productos } = useProductos();

  useEffect(() => {
    getProductos();
  }, []);

  return (
    <section>
      <AdminLayout>
        <section className="flex gap-4 flex-wrap">
          <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
            <thead className="align-bottom">
              <tr>
                <th
                  className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b
                  border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap 
                  text-slate-400 opacity-70"
                >
                  Cod
                </th>
                <th
                  className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent 
                  border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap
                text-slate-400 opacity-70"
                >
                  Nombre
                </th>
                <th
                  className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b
                border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap 
                  text-slate-400 opacity-70"
                >
                  Agregados
                </th>
                <th
                  className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b
                border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap 
                  text-slate-400 opacity-70"
                >
                  Estado
                </th>
                <th
                  className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b
                border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap 
                  text-slate-400 opacity-70"
                >
                  Precio Base
                </th>
                <th
                  className="font-semibold capitalize align-middle text-center bg-transparent border-b
                  border-gray-200 border-solid shadow-none tracking-none whitespace-nowrap text-[#ed9e36]"
                >
                  <Link className="" to="#">
                    <FaPlusCircle size={30} />
                  </Link>
                </th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p._id}>
                  <td className="p-2 align-middle h-20 bg-transparent border-b whitespace-nowrap shadow-transparent">
                    <div className="flex px-2 py-1 justify-center">
                      <div>
                        <FaHamburger />{" "}
                      </div>
                      <div className="flex flex-col justify-center">
                        <p className="mb-0 pl-2 font-semibold leading-tight text-xs">
                          {`${p.codigo}`}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-2 align-middle bg-transparent border-b w-60 h-28 whitespace-nowrap shadow-transparent">
                    <p className="mb-0 leading-tight text-xs text-slate-400 truncate text-balance text-ellipsis overflow-hidden">
                      {`${p.nombre}`}
                    </p>
                  </td>
                  <td className="p-2 align-middle bg-transparent border-b w-60 h-28 whitespace-nowrap shadow-transparent">
                    {p.agregados.map((a) => (
                      <span key={a.key}
                        className={`bg-gray-400 px-3.6 text-xs rounded 
                        py-2.2 inline-block whitespace-nowrap text-center align-baseline font-normal p-1
                          leading-none text-white `}
                      >
                        {`${a.nombre} (+${a.precio})`}
                      </span>
                    ))}
                  </td>
                  <td
                    className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm 
                    whitespace-nowrap shadow-transparent"
                  >
                    <span
                      className={`${
                        p.activo ? `bg-green-400` : "bg-red-400"
                      } px-3.6 text-xs rounded 
                      py-2.2 inline-block whitespace-nowrap text-center align-baseline font-normal p-1
                        leading-none text-white `}
                    >
                      {`${p.activo ? `Activo` : "Inactivo"}`}
                    </span>
                  </td>
                  <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                    <span className="font-semibold leading-tight text-xs text-slate-400">
                      {p.precio_base}
                    </span>
                  </td>
                  <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                    <span className="font-semibold leading-tight text-xs text-slate-400">
                      {
                        <Link className="transition duration-300 hover:text-blue-400">
                          <FaPen size={14}/>
                        </Link>
                      }
                    </span>
                    <span className="font-semibold leading-tight text-xs pl-4 text-slate-400">
                      {
                        <Link className="transition duration-300 hover:text-red-400">
                          <FaTrash size={14}/>
                        </Link>
                      }
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </AdminLayout>
    </section>
  );
};

export default ModuloProductos;
