/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useProductos } from "../../context/ProductosContext.jsx";
import { FaPen, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import { toast, Bounce, ToastContainer } from "react-toastify";
import { FaAngleRight } from "react-icons/fa";

import DataTable from "react-data-table-component";

import { openSuccess } from "../../components/toast/OpenType.jsx";

const ListaProductos = () => {
  const {
    getProductos,
    loading,
    productos,
    setRecords,
    records,
    deleteProducto,
  } = useProductos();
  const navigate = useNavigate();

  const location = useLocation();
  const estado = location.state;
  const [selectedRows, setSelectedRows] = useState([]);

  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    getProductos();

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
    let selectedProduct = [];
    let selectedId = [];
    for (let i = 0; i < selectedRecords.length; i++) {
      selectedProduct.push(
        selectedRecords[i].codigo + "-" + selectedRecords[i].nombre
      );
      selectedId.push(selectedRecords[i]._id);
    }
    return (
      <div className="px-4 py-2">
        <p>Seguro de eliminar el producto:</p>
        {selectedProduct?.map((producto, index) => (
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
      deleteProducto(id[i]);
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

  if (!productos) {
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
      when: (row) => row["activo"] === true,
      style: {
        backgroundColor: "#CFFFD4",
      },
    },
    {
      when: (row) => row["activo"] === false,
      style: {
        backgroundColor: "#FFCFEC",
      },
    },
  ];

  const columns = [
    {
      name: "Codigo",
      selector: (row) => `${row.codigo}`,
      sortable: true,
      width: "100px",
    },
    {
      name: "Nombre",
      selector: (row) => row.nombre,
      width: "170px",
    },
    {
      name: "Descripción",
      selector: (row) => row.descripcion,
      width: "140px",
    },
    {
      name: "Precio Base",
      selector: (row) => `$ ${row.precio_base}`,
      width: "100px",
    },
    {
      name: "Estado",
      selector: (row) => `${row.activo ? "Activo" : "Inactivo"}`,
      sortable: true,
      conditionalCellStyles,
      width: "100px",
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
  ];

  // const elements = document.querySelectorAll(".rdt_TableCell");
  // elements.forEach((element) => {
  //   const innerDiv = element.querySelector('div[data-tag="allowRowEvents"]');
  //   if (innerDiv && innerDiv.textContent.trim().toLowerCase() === "activo") {
  //     innerDiv.classList.add("text-white", "bg-green-300", "rounded-lg", "px-2", "py-1");
  //   }
  // });

  const searchChange = (e) => {
    const filteredRecords = productos.filter((record) => {
      return record.nombre.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setRecords(filteredRecords);
    //console.log(records);
  };

  const ExpandableRows = ({ data }) => {
    let product = JSON.stringify(data);
    let productData = JSON.parse(product);
    return (
      <section
        className="animate-duration-300 bg-white z-30 shadow-sm animate-flip-down 
        rounded-b-lg z-4 w-full h-auto text-sm"
      >
        <div className=" rounded-lg flex items-center gap-2 p-1 text-black">
          {productData.agregados.map((a) => (
            <article
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
            </article>
          ))}
          <FaAngleRight />
          <p className="font-semibold text-[11px] text-wrap">
            {productData.descripcion}
          </p>
        </div>
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
    if (expandedRow === row["codigo"]) {
      // Si la fila actualmente expandida se hace clic de nuevo, cierra la expansión
      setExpandedRow(null);
    } else {
      // Si se hace clic en una nueva fila expandible, expande esa fila y cierra cualquier otra fila expandida
      setExpandedRow(row["codigo"]);
    }
  };

  if (productos) {
    return (
      <main>
        <section className="flex flex-col gap-0 shadow-md rounded-xl w-auto">
          <ToastContainer />
          <div className="flex m-full gap-2 px-4 justify-between items-center py-2 bg-amber-100 text-sm rounded-t-2xl">
            <p className="font-semibold text-amber-900">Lista de Productos</p>
            <div className="flex gap-2">
              <div className="flex gap-2 relative">
                <input
                  className="appearance-none block w-full bg-amber-50 text-gray-700
                  rounded leading-tight focus:outline-none focus:bg-white px-2"
                  placeholder="Buscar productos"
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
          <div className="relative min-h-[450px] w-[700px] bg-white rounded-xl overflow-y-auto">
            <DataTable
              className="cursor-pointer h-[450px] w-full rounded-xl"
              data={records}
              columns={columns}
              defaultSortFieldId={1}
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
              highlightOnHover={true}
              defaultSortAsc={true} // Orden descendente por defecto
              expandableRowExpanded={(row) => row["codigo"] === expandedRow}
              onRowClicked={handleRowClicked}
              expandableRowsHideExpander={true}
              loadingComponent={LoadingData}
            />
          </div>
        </section>
      </main>
    );
  }
};

export default ListaProductos;
