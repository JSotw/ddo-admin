import { useState } from "react";

const DataTable = ({ data, records, columns, rowExpandableName, module, ExpandableRows, loading }) => {
  const [expandedRow, setExpandedRow] = useState(null);


    

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
    if (expandedRow === row[`${rowExpandableName}`]) {
      // Si la fila actualmente expandida se hace clic de nuevo, cierra la expansión
      setExpandedRow(null);
    } else {
      // Si se hace clic en una nueva fila expandible, expande esa fila y cierra cualquier otra fila expandida
      setExpandedRow(row[`${rowExpandableName}`]);
    }
  };
  return (
    <section>
      <div className="min-h-[500px] w-[700px]">
        <DataTable
          data={records}
          columns={columns}
          defaultSortFieldId={4}
          fixedHeader={true}
          fixedHeaderScrollHeight="600px"
          selectableRows={true}
          pagination={true}
          paginationRowsPerPageOptions={[3, 6, 8]} // Opciones de paginación personalizadas
          paginationPerPage={8}
          paginationComponentOptions={paginationOptions}
          onSelectedRowsChange={(row) => {row}}
          progressPending={loading}
          progressComponent={<LoadingData />}
          expandableRows={true}
          expandableRowsComponent={ExpandableRows}
          conditionalCellStyles={customCellStyles}
          noDataComponent={<NoDataComponent />}
          className="cursor-pointer"
          highlightOnHover={true}
          defaultSortAsc={false} // Orden descendente por defecto
          expandableRowExpanded={(row) => row[`${rowExpandableName}`] === expandedRow}
          onRowClicked={handleRowClicked}
          expandableRowsHideExpander={true}
          loadingComponent={LoadingData}
        />
      </div>
    </section>
  );
};

export default DataTable;
