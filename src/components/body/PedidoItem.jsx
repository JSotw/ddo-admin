
import { useForm } from "react-hook-form";  
import { useState } from "react";
const PedidoItem = ({detalle, index, updateDetalle}) => {
    const {
      setValue,
    } = useForm();
    const [total, setTotal] = useState(detalle.producto.precio_base);
    const [producto] = useState(detalle.producto);
    function onChange(){
        calculateSubTotal();
    }
    
  const calculateSubTotal = async () => {
    try {
        let _agregadosTotal = 0;
        const cantidad = document.getElementById(`${index}_cantidad`).value
        detalle.producto.agregados?.map(item =>{
            const itemId = `${index}_${item.nombre}`;
            const cantidadAg = document.getElementById(itemId).value
            if(cantidadAg != undefined && cantidadAg != null && cantidadAg != 0){
                _agregadosTotal += cantidadAg*item.precio;
            }
        })
        setTotal(((_agregadosTotal + producto.precio_base) * cantidad))
        let updatedDetalle = detalle;
        
        updatedDetalle.cantidad = cantidad;
        updateDetalle();
    } catch (error) {
      return error;
    }
  };
  return (
    <div className="flex flex-col gap-2 shadow w-auto p-4 rounded">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">{producto.codigo} - {producto.nombre}</label>
        <div className="flex flex-wrap -mx-4 mb-4">
            {producto.agregados?.map(item =>(
                <div className="w-full md:w-1/4 px-3 md:mb-0">
                    {console.log(item.minimo_selec)}
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={`${index}_${item.nombre}`}>{item.nombre}</label>
                    <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border 
                    border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white 
                    focus:border-gray-500"
                    type="number"
                    name={`${index}_${item.nombre}`}
                    id={`${index}_${item.nombre}`}
                    key={`${index}_${item.nombre}`}
                    placeholder="000"
                    defaultValue={item.minimo_selec}
                    max={item.maximo_select}
                    min={item.minimo_selec}
                    onChange={onChange}
                    />
                </div>
            ))}
        </div>
        <div className="flex flex-wrap -mx-4 mb-4">
            <div className="w-full md:w-2/5 px-3 md:mb-0">Precio Base: {producto.precio_base}</div>
            <div className="w-full md:w-1/5 px-3 md:mb-0">
                <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border 
                    border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white 
                    focus:border-gray-500"
                    type="number"
                    name={`${index}_cantidad`}
                    id={`${index}_cantidad`}
                    key={`${index}_cantidad`}
                    placeholder="000"
                    defaultValue={detalle.cantidad}
                    min={1}
                    onChange={onChange}
                />
            </div>
            <div className="w-full md:w-2/5 px-3 md:mb-0">Precio Total: {total}</div>
        </div>
    </div>
  )
}

export default PedidoItem