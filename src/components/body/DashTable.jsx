import { useEffect } from "react";
import { useProperty } from "../../context/PropertyContext";
import { Link } from "react-router-dom";

const DashTable = () => {
  const { getProperties, properties } = useProperty();

  useEffect(() => {
    getProperties();
  }, []);

  return (
    <div
      className="relative flex flex-col w-full min-w-0 mb-0 break-words bg-white border-0 
      border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border"
    >
      <div className="p-6 pb-0 mb-0 bg-white rounded-t-2xl">
        <h6>Lista de propiedades</h6>
      </div>
      <div className="flex-auto px-0 pt-0 pb-2">
        <div className="p-0 overflow-x-auto">
          <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
            <thead className="align-bottom">
              <tr>
                <th
                  className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b
                  border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap 
                  text-slate-400 opacity-70"
                >
                  Propiedad
                </th>
                <th
                  className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent 
                  border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap
                text-slate-400 opacity-70"
                >
                  Descripción
                </th>
                <th
                  className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b
                border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap 
                  text-slate-400 opacity-70"
                >
                  Precio
                </th>
                <th
                  className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b 
                  border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70"
                >
                  Tipo
                </th>
                <th
                  className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b 
                  border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70"
                >
                  Categoría
                </th>
                <th
                  className="px-6 py-3 font-semibold capitalize align-middle bg-transparent border-b 
                  border-gray-200 border-solid shadow-none tracking-none whitespace-nowrap text-slate-400 
                  opacity-70"
                ><Link className="" to="/admin/agregar-propiedad">Agregar nueva</Link></th>
              </tr>
            </thead>
            <tbody>
              {properties.map((p) => (
                <tr key={p.id}>
                  <td className="p-2 align-middle h-20 bg-transparent border-b whitespace-nowrap shadow-transparent">
                    <div className="flex px-2 py-1">
                      <div>
                        <img
                          src={p.images[0]}
                          className="inline-flex items-center justify-center mr-4 text-white transition-all 
                          duration-200 ease-soft-in-out text-sm h-20 w-20 rounded-xl"
                          alt="imagen"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <p className="mb-0 font-semibold leading-tight text-xs">
                          {p.title}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-2 align-middle bg-transparent border-b w-60 h-28 whitespace-nowrap shadow-transparent">
                    <p className="mb-0 leading-tight text-xs text-slate-400 truncate text-balance text-ellipsis overflow-hidden">
                      {p.description}
                    </p>
                  </td>
                  <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm 
                    whitespace-nowrap shadow-transparent">
                    <span className="bg-gradient-to-tl from-green-600 to-lime-400 px-3.6 text-xs rounded 
                      py-2.2 inline-block whitespace-nowrap text-center align-baseline font-normal p-1
                        leading-none text-white">
                      {`${p.price} - ${p.price_type}`}
                    </span>
                  </td>
                  <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                    <span className="font-semibold leading-tight text-xs text-slate-400">
                      {p.type}
                    </span>
                  </td>
                  <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                    <span className="font-semibold leading-tight text-xs text-slate-400">
                      {p.category}
                    </span>
                  </td>
                  {/* <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                    <a
                      href="javascript:;"
                      className="font-semibold leading-tight text-xs text-slate-400"
                    >
                      {" "}
                      Ver más{" "}
                    </a>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashTable;
