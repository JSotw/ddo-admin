import { createContext, useContext, useState, useEffect } from "react";
import{ reporteDiario, reportePorDia } from '../api/apiReports.js';

const ReporteContext = createContext();

export const useReport = () => {
  const context = useContext(ReporteContext);

  if (!context) {
    throw new Error("useReport debe usarse dentro de un ReportProvider");
  }

  return context;
};

export function ReportProvider({ children }) {
    const [dataReporteDiario, setReporteDiario] = useState([]);
    const [dataReportePorDia, setReporteDelDia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState([]);
  
    useEffect(() => {
      if (errors.length > 0) {
        const timer = setTimeout(() => {
          setErrors([]);
        }, 5000);
        return () => clearTimeout(timer);
      }
    }, [errors]);
  
    const getReporteDiario = async () => {
      try {
        let hasta= new Date();
        let desde= new Date();
        desde.setDate(desde.getDate() - 6);
        const res = await reporteDiario(desde, hasta);
        setLoading(false);
        setReporteDiario(res.data);
      } catch (error) {
        setLoading(true);
        console.error(error);
      }
    };
    const getReportePorDia = async () => {
      try {
        let hasta= new Date(); 
        let desde= new Date();
        desde.setDate(desde.getDate() - 6);
        const res = await reportePorDia(desde, hasta, "dia");
        setLoading(false);
        setReporteDelDia(res.data.registros);
      } catch (error) {
        setLoading(true);
        console.error(error);
      }
    };
    return (
      <ReporteContext.Provider
        value={{
          dataReporteDiario,
          dataReportePorDia,
          loading,
  
          getReporteDiario,
          getReportePorDia,
        }}
      >
        {children}
      </ReporteContext.Provider>
    );
  }
  