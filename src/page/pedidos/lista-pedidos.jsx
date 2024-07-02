import {
  FaAngleDoubleRight,
  FaAngleDown,
  FaAngleRight,
  FaCalendarCheck,
  FaClipboard,
  FaClipboardCheck,
  FaClipboardList,
  FaPen,
  FaPlus,
  FaSearch,
  FaStop,
  FaStopCircle,
  FaTrash,
} from "react-icons/fa";
import CardPedidos from "../../components/cards/CardPedidos";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { openSuccess } from "../../components/toast/OpenType";
import { usePedidos } from "../../context/PedidosContext";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { format } from "date-fns";
import { TbBowlChopsticksFilled, TbCalendarCancel, TbCalendarCheck, TbSquareRoundedCheckFilled, TbSquareRoundedXFilled } from "react-icons/tb";

const menuList = [
  {
    icon: <FaClipboardCheck size={23} />,
    text: "Diarios Terminados",
    color: "#CFFFD4",
  },
  {
    icon: <FaClipboardList size={23} />,
    text: "Diarios en Proceso",
    color: "#CFE3FF",
  },
  {
    icon: <FaClipboard size={23} />,
    text: "Crear Nuevo",
    href: "../crear",
    color: "#EBD8FF",
  },
];

const ListaPedidos = () => {
  const {
    pedidos,
    usuarios,
    allPedidos,
    allRecords,
    records,
    loading,
    setRecords,
    getPedidos,
    getUsuarios,
    getAllPedidos,
    deletePedido,
    putPedido,
    putEstadoPedido,
  } = usePedidos();
  const navigate = useNavigate();
  const location = useLocation();
  const estado = location.state;
  const [selectedRows, setSelectedRows] = useState([]);

  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    getAllPedidos();
    getUsuarios();
    if (estado) {
      if (estado.toast === "success") {
        openSuccess("producto", estado.producto);
      } else if (estado.toast === "error") {
        console.log(estado.toast);
      }
    }
    navigate(location.pathname, { replace: true });

    // const timeout = setTimeout(() => {
    //   setRecords(usuarios);
    // }, 1000);
    // return () => clearTimeout(timeout);
  }, []);

  const ToastDelete = ({ selectedRecords }) => {
    let selectedOrder = [];
    let selectedId = [];
    for (let i = 0; i < selectedRecords.length; i++) {
      selectedOrder.push(
        selectedRecords[i].codigo + "-" + selectedRecords[i].nombre
      );
      selectedId.push(selectedRecords[i]._id);
    }
    return (
      <div className="px-4 py-2">
        <p>Seguro de eliminar el producto:</p>
        {selectedOrder?.map((producto, index) => (
          <div key={index}>
            <p className="text-red-400">{producto}</p>
          </div>
        ))}
        <span className="mt-2 flex gap-2">
          <button
            className="bg-red-400 rounded-lg text-white text-sm px-3 py-1"
            onClick={() => productoDelete(selectedId)}
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

  function productoDelete(id) {
    //console.log(id);
    for (let i = 0; i < id.length; i++) {
      deletePedido(id[i]);
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

  if (!pedidos) {
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

  const conditionalCellStyles = [
    {
      when: (row) => row.estado.nombre === "Terminado",
      style: {
        backgroundColor: "#CFFFD4",
      },
    },
    {
      when: (row) => row.estado.nombre === "Cancelado",
      style: {
        backgroundColor: "#FECACA",
      },
    },
    {
      when: (row) => row.estado.nombre === "En Proceso",
      style: {
        backgroundColor: "#CFE3FF",
      },
    },
  ];

  const columns = [
    {
      name: "Usuario",
      selector: (row) =>
        usuarios?.find((usuario) => usuario._id === row.id_usuario)
          ?.nombre_usuario,
      sortable: true,
      width: "100px",
    },
    {
      name: "Nombre Retiro",
      selector: (row) => row.nombre_retiro,
      width: "130px",
    },
    {
      name: "Precio Total",
      selector: (row) => `$ ${row.monto_total}`,
      width: "100px",
    },
    {
      name: "Estado",
      selector: (row) => (
        row.estado.nombre === "Cancelado"
          ? <span className="flex item-center gap-2 p-1">{row.estado.nombre}<TbSquareRoundedXFilled className="" size={17} /></span>
          :
        row.estado.nombre === "Terminado"
          ? <span className="flex item-center gap-2 p-1 ">{row.estado.nombre}<TbSquareRoundedCheckFilled className="" size={17} /></span>
          :
        row.estado.nombre === "En Proceso"
          ? <span className="flex item-center gap-2 p-1">{row.estado.nombre}<TbBowlChopsticksFilled className="animate-bounce" size={17} /></span>
          : ""
        ),
      sortable: true,
      conditionalCellStyles,
      width: "130px",
      style: {
        color: "black",
        fontWeight: "bold",
        fontSize: "12px",
        margin: "10px",
        width: "100%",
        display: "flex",
        borderRadius: "15px",
        justifyContent: "center",
        textTransform: "capitalize",
      },
    },
    {
      name: "Fecha y hora",
      selector: (row) =>
        row.estado.nombre === "Terminado"
          ? format(new Date(row["updatedAt"]), "dd/MM/yyyy hh:mm")
          : format(new Date(row["createdAt"]), "dd/MM/yyyy hh:mm"),
      sortable: true,
      conditionalCellStyles,
      width: "140px",
      style: {
        color: "black",
        fontWeight: "600",
        fontSize: "12px",
        margin: "10px",
        width: "100%",
        display: "flex",
        borderRadius: "15px",
        justifyContent: "center",
        textTransform: "capitalize",
      },
    },
  ];
  const searchChange = (e) => {
    const filteredRecords = pedidos.filter((record) => {
      return record.nombre.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setRecords(filteredRecords);
    //console.log(records);
  };
  const updateEstadoPedido = (id, data) => {
    putEstadoPedido(id, data);
    window.location.reload();
  };

  const ExpandableRows = ({ data }) => {
    let order = JSON.stringify(data);
    let orderData = JSON.parse(order);
    let orderEstado = orderData.estado.nombre;
    let orderDetails = orderData.detalles;
    return (
      <section
        className="animate-duration-300 bg-white z-30 shadow-sm animate-flip-down 
        rounded-b-lg z-4 w-full h-auto text-sm"
      >
        {orderDetails.map((item, index) => (
          <article
            key={index}
            className={`text-black text-[11px] bg-gray-50 shadow-md flex items-center gap-2 
                  px-3 py-2 rounded-lg `}
          >
            {item.producto.agregados.map((a) => (
              <div
                key={a.nombre}
                className={`text-black text-[11px] bg-gray-50 shadow-md flex items-center gap-2 
                      px-3 py-2 rounded-lg `}
              >
                {a.precio > 0 ? (
                  <div className="flex flex-col">
                    <p className="text-black -mb-1"> {a.nombre}</p>
                    <p className="text-green-500">$ {a.precio}</p>
                  </div>
                ) : (
                  ``
                )}
              </div>
            ))}
            <FaAngleRight />
            <p className="font-semibold text-[11px] text-wrap">
              {item.producto.descripcion}
            </p>
            <FaAngleDoubleRight size={15} className="ml-4" />
            {orderEstado === "En Proceso" ? (
              <div className="flex gap-2">
                <button 
                  onClick={() => updateEstadoPedido(data._id, {
                    estado: "Terminado",
                  })}
                  className="bg-green-200 shadow-xl hover:scale-105 duration-200 transition 
                  shadow-gray-100 rounded-xl text-black text-xs font-semibold px-5 py-3 flex item-center gap-2">
                  Terminar 
                  <TbCalendarCheck size={20} />
                </button>
                <button 
                  onClick={() => updateEstadoPedido(data._id, {
                    estado: "Cancelado",
                  })}
                  className="bg-red-200 shadow-xl hover:scale-105 duration-200 transition 
                  shadow-gray-100 rounded-xl text-black text-xs font-semibold px-5 py-3 flex item-center gap-2">
                  Cancelar  
                  <TbCalendarCancel size={20} />
                </button>
              </div>
              
            ) : (
              ""
            )}
          </article>
        ))}
      </section>
    );
  };

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

  const handleRowClicked = (row) => {
    if (expandedRow === row["_id"]) {
      // Si la fila actualmente expandida se hace clic de nuevo, cierra la expansión
      setExpandedRow(null);
    } else {
      // Si se hace clic en una nueva fila expandible, expande esa fila y cierra cualquier otra fila expandida
      setExpandedRow(row["_id"]);
    }
  };
  return (
    <>
      <main className="">
        <section className="py-2 flex gap-4 flex-wrap flex-col justify-between md:flex-row">
          {menuList?.map((item, index) => (
            <section key={index} className="">
              <CardPedidos
                key={index}
                icon={item.icon}
                text={item.text}
                href={item.href}
                color={item.color}
              />
            </section>
          ))}
        </section>
        <section className="flex flex-col gap-0 shadow-md rounded-xl w-auto">
          <ToastContainer />
          <div className="flex m-full gap-2 px-4 justify-between items-center py-2 bg-amber-100 text-sm rounded-t-2xl">
            <p className="font-semibold text-amber-900">Lista de Pedidos</p>
            <div className="flex gap-2">
              <div className="flex gap-2 relative">
                <input
                  className="appearance-none block w-full bg-amber-50 text-gray-700
                  rounded leading-tight focus:outline-none py-2 focus:bg-white px-2"
                  placeholder="Buscar productos"
                  type="text"
                  id="search"
                  onChange={searchChange}
                />
                <FaSearch className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
              {/* <Link
                className="transition duration-300 items-center flex bg-purple-400 hover:bg-purple-500 
              rounded-lg p-2 text-white"
                to={`../crear`}
              >
                <FaPlus size={15} />
              </Link> */}
              {/* Si está seleccionado 1 usuario se podrá editar y eliminar, 
                  si se seleccionan varios se podrá eliminar. */}

              
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
          <div className="min-h-[400px] w-[700px] bg-white rounded-xl">
            <DataTable
              className="cursor-pointer h-[400px] w-full rounded-xl"
              data={allRecords}
              columns={columns}
              defaultSortFieldId={5}
              fixedHeader={true}
              fixedHeaderScrollHeight="700px"
              selectableRows={true}
              pagination={true}
              paginationRowsPerPageOptions={[3, 7]} // Opciones de paginación personalizadas
              paginationPerPage={7}
              paginationComponentOptions={paginationOptions}
              onSelectedRowsChange={(row) => setSelectedRows(row)}
              progressPending={loading}
              progressComponent={<LoadingData />}
              expandableRows={true}
              expandableRowsComponent={ExpandableRows}
              conditionalCellStyles={customCellStyles}
              noDataComponent={<NoDataComponent />}
              highlightOnHover={true}
              defaultSortAsc={true} // Orden descendente por defecto
              expandableRowExpanded={(row) => row["_id"] === expandedRow}
              onRowClicked={handleRowClicked}
              expandableRowsHideExpander={true}
              loadingComponent={LoadingData}
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default ListaPedidos;
