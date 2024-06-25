import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Rectangle,
} from "recharts";
import { useReport } from "../../context/ReportsContext.jsx";
import { useEffect, useState } from "react";

export default function Chart() {
	const { dataReportePorDia, loading, getReportePorDia } = useReport();
  
	useEffect(() => {
		getReportePorDia();
		console.log("Data Reporte");
		console.log(dataReportePorDia);
  }, []);

  return (
    <div className="h-[22rem] bg-white p-4 rounded-xl shadow-md shadow-gray-100 border border-gray-200 flex flex-col flex-1">
      <strong className="text-gray-700 font-medium text-center">Transacciones</strong>
      <div className="mt-3 w-full flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={dataReportePorDia ? dataReportePorDia : "No hay datos"}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="fecha" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="monto"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
