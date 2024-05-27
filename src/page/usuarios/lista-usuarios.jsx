import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUsuarios } from "../../context/UsuariosContext.jsx";
import { FaUserPlus, FaUser, FaUserEdit, FaUserTimes } from "react-icons/fa";
import { toast, Bounce, ToastContainer } from "react-toastify";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

import { openAdd } from "../../components/toast/OpenType.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
const ListaUsuarios = () => {
  const [loading, setLoading] = useState(true);
  const { getUsuarios, deleteUsuario, usuarios } = useUsuarios();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const estado = location.state;

  useEffect(() => {
    getUsuarios();
    if (estado) {
      if (estado.toast === "success") {
        openAdd(estado.usuario);
      } else if (estado.toast === "warning") {
        console.log(estado.toast);
      }
    }
    navigate(location.pathname, { replace: true });
  }, []);

  if (usuarios == [""]) {
    setLoading(false);
  }

  const ToastDelete = ({ id, text }) => {
    return (
      <div className="px-4 py-2">
        <p>Eliminar:</p>
        <p className="text-red-700">{text}</p>
        <div className="mt-2 flex gap-5 ">
          <button
            onClick={() => deleteUsuario(id)}
            className="bg-red-400 rounded-lg px-2 text-white"
          >
            Si
          </button>
          <button className="bg-green-400 rounded-lg px-2 text-white">
            No
          </button>
        </div>
      </div>
    );
  };

  function openDelete(id, text) {
    toast.warning(<ToastDelete id={id} text={text} />, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }

  const columns = [
    {
      header: "Usuario",
      accessorKey: "nombre_usuario",
    },
    {
      header: "Nombre",
      accessorKey: "primer_n",
    },
    {
      header: "Rol",
      accessorKey: "rol",
    },
    {
      header: "Estado",
      accessorKey: "activo",
    },
    {
      header: "Correo",
      accessorKey: "correo",
    },
  ];

  const reactTable = useReactTable({
    usuarios,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  console.log(usuarios);

  if (!usuarios) {
    return (
      <div className="px-4 py-1 bg-red-200 rounded-lg w-auto text-sm">
        No hay datos
      </div>
    );
  }

  if (!usuarios & loading) {
    return (
      <div className="px-4 py-1 bg-red-200 rounded-lg w-auto text-sm">
        Cargando datos...
      </div>
    );
  }

  if (usuarios) {
    return (
      <main>
        <section className="flex gap-4 flex-wrap">
          <ToastContainer />
          <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
            <thead className="align-bottom">
              <tr>
                <th
                  className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b
                  border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap 
                  text-slate-400 opacity-70"
                >
                  Usuario
                </th>
                <th
                  className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent 
                    border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap
                  text-slate-400 opacity-70"
                >
                  Nombre
                </th>
                <th
                  className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent 
                    border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap
                  text-slate-400 opacity-70"
                >
                  Rol
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
                  border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70"
                >
                  Correo
                </th>
                <th
                  className="font-semibold capitalize align-middle text-center bg-transparent border-b
                  border-gray-200 border-solid shadow-none tracking-none whitespace-nowrap text-[#ed9e36]"
                >
                  <Link className="" to="../crear">
                    <FaUserPlus size={30} />
                  </Link>
                </th>
              </tr>
            </thead>
            <tbody>
              {usuarios?.map((u) =>
                user?.rol === "SuperAdministrador" ? (
                  <tr key={u._id}>
                    <td className="p-2 align-middle h-20 bg-transparent border-b whitespace-nowrap shadow-transparent">
                      <div className="flex px-2 py-1 justify-center">
                        <div>
                          <FaUser />{" "}
                        </div>
                        <div className="flex flex-col justify-center">
                          <p className="mb-0 pl-2 font-semibold leading-tight text-xs">
                            {`${u.nombre_usuario}`}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-2 align-middle bg-transparent border-b w-auto h-auto whitespace-nowrap shadow-transparent">
                      <p className="mb-0 leading-tight text-xs text-slate-400 truncate text-balance text-ellipsis overflow-hidden">
                        {`${u.primer_n} ${u.apellido_p}`}
                      </p>
                    </td>
                    <td className="p-2 align-middle bg-transparent border-b w-auto h-auto whitespace-nowrap shadow-transparent">
                      <p className="mb-0 leading-tight text-xs text-slate-400 truncate text-balance text-ellipsis overflow-hidden">
                        {`${u.rol}`}
                      </p>
                    </td>
                    <td
                      className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm 
                        whitespace-nowrap shadow-transparent"
                    >
                      <span
                        className={`${
                          u.activo ? `bg-green-400` : "bg-red-400"
                        } px-3.6 text-xs rounded 
                          py-2.2 inline-block whitespace-nowrap text-center align-baseline font-normal p-1
                          leading-none text-white `}
                      >
                        {`${u.activo ? `Activo` : "Inactivo"}`}
                      </span>
                    </td>
                    <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                      <span className="font-semibold leading-tight text-xs text-slate-400">
                        {u.correo}
                      </span>
                    </td>
                    <td
                      className="p-2 gap-4 bg-transparent border-b
                        flex-col h-full"
                    >
                      <button className="transition duration-300 hover:text-blue-400">
                        <FaUserEdit size={14} />
                      </button>
                      <button
                        onClick={() => openDelete(u._id, u.nombre_usuario)}
                        className="transition duration-300 hover:text-red-400"
                      >
                        <FaUserTimes size={14} />
                      </button>
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
                ) : u.rol !== "Administrador" ? (
                  <tr key={u._id}>
                    <td className="p-2 align-middle h-20 bg-transparent border-b whitespace-nowrap shadow-transparent">
                      <div className="flex px-2 py-1 justify-center">
                        <div>
                          <FaUser />{" "}
                        </div>
                        <div className="flex flex-col justify-center">
                          <p className="mb-0 pl-2 font-semibold leading-tight text-xs">
                            {`${u.nombre_usuario}`}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-2 align-middle bg-transparent border-b w-auto h-auto whitespace-nowrap shadow-transparent">
                      <p className="mb-0 leading-tight text-xs text-slate-400 truncate text-balance text-ellipsis overflow-hidden">
                        {`${u.primer_n} ${u.apellido_p}`}
                      </p>
                    </td>
                    <td className="p-2 align-middle bg-transparent border-b w-auto h-auto whitespace-nowrap shadow-transparent">
                      <p className="mb-0 leading-tight text-xs text-slate-400 truncate text-balance text-ellipsis overflow-hidden">
                        {`${u.rol}`}
                      </p>
                    </td>
                    <td
                      className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm 
                        whitespace-nowrap shadow-transparent"
                    >
                      <span
                        className={`${
                          u.activo ? `bg-green-400` : "bg-red-400"
                        } px-3.6 text-xs rounded 
                          py-2.2 inline-block whitespace-nowrap text-center align-baseline font-normal p-1
                          leading-none text-white `}
                      >
                        {`${u.activo ? `Activo` : "Inactivo"}`}
                      </span>
                    </td>
                    <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                      <span className="font-semibold leading-tight text-xs text-slate-400">
                        {u.correo}
                      </span>
                    </td>
                    <td
                      className="p-2 gap-4 bg-transparent border-b
                        flex-col h-full"
                    >
                      <button className="transition duration-300 hover:text-blue-400">
                        <FaUserEdit size={14} />
                      </button>
                      <button
                        onClick={() => openDelete(u._id, u.nombre_usuario)}
                        className="transition duration-300 hover:text-red-400"
                      >
                        <FaUserTimes size={14} />
                      </button>
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
                ) : null
              )}
            </tbody>
          </table>
        </section>
      </main>
    );
  }
};

export default ListaUsuarios;
