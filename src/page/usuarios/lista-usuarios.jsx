/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUsuarios } from "../../context/UsuariosContext.jsx";
import { FaPen, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import { toast, Bounce, ToastContainer } from "react-toastify";
import { IoIosSend } from "react-icons/io";

import DataTable, { createTheme } from "react-data-table-component";

import { openSuccess, openError } from "../../components/toast/OpenType.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const ListaUsuarios = () => {
  const { getUsuarios, deleteUsuario, loading, usuarios, records, setRecords } =
    useUsuarios();
  const { user } = useAuth();
  const navigate = useNavigate();

  const location = useLocation();
  const estado = location.state;
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    getUsuarios();

    if (estado) {
      if (estado.toast === "success") {
        openSuccess("usuario", estado.usuario);
      } else if (estado.toast === "error") {
        openError("err", estado.err);
      }
    }
    navigate(location.pathname, { replace: true });

    // const timeout = setTimeout(() => {
    //   setRecords(usuarios);
    // }, 1000);
    // return () => clearTimeout(timeout);
  }, []);

  const ToastDelete = ({ selectedRecords }) => {
    let selectedUser = [];
    let selectedId = [];
    for (let i = 0; i < selectedRecords.length; i++) {
      selectedUser.push(
        selectedRecords[i].primer_n + " " + selectedRecords[i].apellido_p
      );
      selectedId.push(selectedRecords[i]._id);
    }
    // console.log(selectedUser);
    // console.log(selectedId);
    return (
      <div className="px-4 py-2">
        <p>Seguro de eliminar a:</p>
        {selectedUser?.map((user, index) => (
          <div key={index}>
            <p className="text-red-400">{user}</p>
          </div>
        ))}
        <span className="mt-2 flex gap-2">
          <button
            className="bg-red-400 rounded-lg text-white text-sm px-3 py-1"
            onClick={() => userDelete(selectedId)}
          >
            Si
          </button>
          <button className="bg-green-400 rounded-lg text-white text-sm px-3 py-1">
            No
          </button>
        </span>
      </div>
    );
  };

  function userDelete(id) {
    //console.log(id);
    for (let i = 0; i < id.length; i++) {
      deleteUsuario(id[i]);
    }
    window.location.reload();
  }

  function openDelete(selectedRecords) {
    toast.warning(<ToastDelete selectedRecords={selectedRecords} />, {
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

  //console.log(!usuarios);

  if (!usuarios) {
    return (
      <div className="px-4 py-1 bg-red-200 rounded-lg w-auto text-sm">
        No hay datos
      </div>
    );
  }

  const LoadingData = () => {
    return (
      <div className="px-4 py-1 bg-red-200 rounded-lg w-auto text-sm">
        Cargando datos...
      </div>
    );
  };
  const NoDataComponent = () => {
    return (
      <div className="px-4 py-1 bg-red-200 rounded-lg w-auto text-sm">
        No se encuentran datos.
      </div>
    );
  };

  const columns = [
    {
      name: "Nombre",
      selector: (row) => `${row.primer_n} ${row.apellido_p}`,
      sortable: true,
    },
    {
      name: "Usuario",
      selector: (row) => row.nombre_usuario,
    },
    {
      name: "Rol",
      selector: (row) => row.rol,
      id: "rol",
    },
    {
      name: "Estado",
      selector: (row) => `${row.activo ? "Activo" : "Inactivo"}`,
      sortable: true,
    },
  ];

  //Filtrar los datos por nombre de usuario
  const filteredData = usuarios.filter(row => row.nombre_usuario !== 'admin');
  const filteredRecords = records.filter(row => row.nombre_usuario !== 'admin');

  const searchChange = (e) => {
    const filteredRecords = filteredData.filter((record) => {
      return record.primer_n
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setRecords(filteredRecords);
    //console.log(records);
  };

  const ExpandableRows = ({ data }) => {
    let user = JSON.stringify(data);
    let userData = JSON.parse(user);
    return (
      <section className=" bg-white rounded-b-lg z-4 w-full h-auto text-sm ">
        <div className=" rounded-lg flex items-center gap-2 p-2 text-black">
          <a
            className="text-white bg-amber-700 shadow-md flex items-center gap-2 px-3 py-1 rounded-lg"
            href={`mailto:${userData.correo}?subject=Contacto DDO`}
          >
            {userData.correo}
            <IoIosSend />
          </a>
        </div>
      </section>
    );
  };

  // Opciones personalizadas (español)
  const paginationOptions = {
    rowsPerPageText: "Filas por página:",
    rangeSeparatorText: "de",
    noRowsPerPage: false,
  };

  const customCellStyles = [
    {
      // Aplicar estilo a la celda con la clave 'activo'
      on: "cell",
      key: "activo",
      style: (rowData) => ({
        color: rowData.activo ? "red" : "inherit", // Usar rowData.activo directamente
      }),
    },
  ];

  if (usuarios) {
    return (
      <main>
        <section className="flex flex-col gap-4 w-auto">
          <ToastContainer />
          <div className="flex m-full gap-2 px-4 justify-between items-center py-2 bg-amber-100 text-sm rounded-t-2xl">
            <p className="font-semibold text-amber-900">Lista de Usuarios</p>
            <div className="flex gap-2">
              <div className="flex gap-2 relative">
                <input
                  className="appearance-none block w-full bg-amber-50 text-gray-700
                  rounded leading-tight focus:outline-none focus:bg-white px-2"
                  placeholder="Buscar usuarios"
                  type="text"
                  id="search"
                  onChange={searchChange}
                />
                <FaSearch className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
              <Link
                className="transition duration-300 items-center flex bg-purple-400 hover:bg-purple-500 
              rounded-lg p-2 text-white"
                to={`../crear`}
              >
                <FaPlus size={15} />
              </Link>
              {/* Si está seleccionado 1 usuario se podrá editar y eliminar, 
                  si se seleccionan varios se podrá eliminar. */}

              {selectedRows.selectedCount === 1 ? (
                <>
                  <Link
                    to={`../actualizar/${selectedRows.selectedRows[0]._id}`}
                    className="transition duration-300 bg-blue-400 hover:bg-blue-500 
                rounded-lg p-2 text-white"
                  >
                    <FaPen size={15} />
                  </Link>
                </>
              ) : (
                ""
              )}
              {selectedRows.selectedCount > 0 ? (
                <button
                  className="transition duration-300 bg-red-400 hover:bg-red-500 
                    rounded-lg p-2 text-white"
                  onClick={() => openDelete(selectedRows.selectedRows)}
                >
                  <FaTrash size={15} />
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="w-[720px] h-[500px] overflow-y-scroll ">
            <DataTable
              data={filteredRecords}
              columns={columns}
              defaultSortFieldId={4}
              fixedHeader={true}
              fixedHeaderScrollHeight="700px"
              selectableRows={true}
              pagination={true}
              paginationRowsPerPageOptions={[3, 6, 8]} // Opciones de paginación personalizadas
              paginationPerPage={8}
              paginationComponentOptions={paginationOptions}
              onSelectedRowsChange={(row) => setSelectedRows(row)}
              progressPending={loading}
              progressComponent={<LoadingData />}
              expandableRows={true}
              expandableRowsComponent={ExpandableRows}
              conditionalCellStyles={customCellStyles}
              noDataComponent={<NoDataComponent />}
              conditionalRowStyles={[
                {
                  when: (rowData) => rowData.activo === true,
                  style: {
                    backgroundColor: "#e9ffea", // Color de fondo para filas activas
                  },
                },
                {
                  when: (rowData) => rowData.activo === false,
                  style: {
                    backgroundColor: "#ffc2c2", // Color de fondo para filas inactivas
                  },
                },
              ]}
            />
          </div>
        </section>
      </main>
    );
  }
};

export default ListaUsuarios;
