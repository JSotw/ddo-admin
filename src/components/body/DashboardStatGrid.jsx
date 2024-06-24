import { IoBagHandle, IoPieChart, IoPeople, IoCart } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useReport } from "../../context/ReportsContext.jsx";

export default function DashboardStatsGrid() {
  const { dataReporteDiario, loading, getReporteDiario } = useReport();
  useEffect(() => {
    getReporteDiario();
  }, []);

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <div className="flex flex-wrap gap-2 justify-center items-center rounded-xl shadow-md">
        <BoxWrapper>
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
            <IoBagHandle className="text-2xl text-white" />
          </div>
          <div className="pl-4">
            <span className="text-sm text-gray-500 font-light">
              Ventas totales
            </span>
            <div className="flex items-center">
              <strong className="text-xl text-gray-700 font-semibold">
                {dataReporteDiario.total}
              </strong>
              {dataReporteDiario.totalAnterior > dataReporteDiario.total ? (
                <span className="text-sm text-red-500 pl-2">
                  -{dataReporteDiario.totalAnterior - dataReporteDiario.total}
                </span>
              ) : dataReporteDiario.totalAnterior == dataReporteDiario.total ? (
                <span className="text-sm text-gray-500 pl-2">--</span>
              ) : (
                <span className="text-sm text-green-500 pl-2">
                  +{dataReporteDiario.total - dataReporteDiario.totalAnterior}
                </span>
              )}
            </div>
          </div>
        </BoxWrapper>
      </div>
      <div className="flex flex-wrap gap-2 justify-center items-center rounded-xl shadow-md">
        <BoxWrapper>
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
            <IoPieChart className="text-2xl text-white" />
          </div>
          <div className="pl-4">
            <span className="text-sm text-gray-500 font-light">
              Gastos totales
            </span>
            <div className="flex items-center">
              <strong className="text-xl text-gray-700 font-semibold">
                {dataReporteDiario.gastos}
              </strong>
              {dataReporteDiario.gastosAnteriores > dataReporteDiario.gastos ? (
                <span className="text-sm text-red-500 pl-2">
                  -
                  {dataReporteDiario.gastosAnteriores -
                    dataReporteDiario.gastos}
                </span>
              ) : dataReporteDiario.gastosAnteriores ==
                dataReporteDiario.gastos ? (
                <span className="text-sm text-gray-500 pl-2">--</span>
              ) : (
                <span className="text-sm text-green-500 pl-2">
                  +
                  {dataReporteDiario.gastos -
                    dataReporteDiario.gastosAnteriores}
                </span>
              )}
            </div>
          </div>
        </BoxWrapper>
      </div>
      <div className="flex flex-wrap gap-2 justify-center items-center rounded-xl shadow-md">
        <BoxWrapper>
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
            <IoPeople className="text-2xl text-white" />
          </div>
          <div className="pl-4">
            <span className="text-sm text-gray-500 font-light">
              Clientes totales
            </span>
            <div className="flex items-center">
              <strong className="text-xl text-gray-700 font-semibold">
                {dataReporteDiario.clientes}
              </strong>
              {dataReporteDiario.clientesAnteriores >
              dataReporteDiario.clientes ? (
                <span className="text-sm text-red-500 pl-2">
                  -
                  {dataReporteDiario.clientesAnteriores -
                    dataReporteDiario.clientes}
                </span>
              ) : dataReporteDiario.clientesAnteriores ==
                dataReporteDiario.clientes ? (
                <span className="text-sm text-gray-500 pl-2">--</span>
              ) : (
                <span className="text-sm text-green-500 pl-2">
                  +
                  {dataReporteDiario.clientes -
                    dataReporteDiario.clientesAnteriores}
                </span>
              )}
            </div>
          </div>
        </BoxWrapper>
      </div>
      <div className="flex flex-wrap gap-2 justify-center items-center rounded-xl shadow-md">
        <BoxWrapper>
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
            <IoCart className="text-2xl text-white" />
          </div>
          <div className="pl-4">
            <span className="text-sm text-gray-500 font-light">
              Ordenes totales
            </span>
            <div className="flex items-center">
              <strong className="text-xl text-gray-700 font-semibold">
                {dataReporteDiario.ordenes}
              </strong>
              {dataReporteDiario.ordenesAnteriores >
              dataReporteDiario.ordenes ? (
                <span className="text-sm text-red-500 pl-2">
                  -
                  {dataReporteDiario.ordenesAnteriores -
                    dataReporteDiario.ordenes}
                </span>
              ) : dataReporteDiario.ordenesAnteriores ==
                dataReporteDiario.ordenes ? (
                <span className="text-sm text-gray-500 pl-2">--</span>
              ) : (
                <span className="text-sm text-green-500 pl-2">
                  +
                  {dataReporteDiario.ordenes -
                    dataReporteDiario.ordenesAnteriores}
                </span>
              )}
            </div>
          </div>
        </BoxWrapper>
      </div>
    </div>
  );
}

function BoxWrapper({ children }) {
  return (
    <div className="bg-white rounded-xl p-4 flex-1 border border-gray-200 flex items-center">
      {children}
    </div>
  );
}
