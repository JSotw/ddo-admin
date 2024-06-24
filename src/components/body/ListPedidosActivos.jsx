
import { useForm } from "react-hook-form";  
import { useState } from "react";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
const ListPedidosActivos = ({pedidos, pedidoActivo, setPedido}) => {
  return (
    <div className="flex flex-col gap-2 shadow w-auto p-4 rounded">
        {
            pedidos?.map(item =>(
                <div key={item._id} onClick={() => setPedido(item)} className={item._id === pedidoActivo? "bg-green-500" : ""}>
                    <button><FaRegArrowAltCircleLeft /></button>
                    <label>{item.nombre_retiro}</label>
                </div>
            ))
        }
    </div>
  )
}

export default ListPedidosActivos;