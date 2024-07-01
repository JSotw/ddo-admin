
import { useForm } from "react-hook-form";  
import { useState } from "react";
import { FaRegArrowAltCircleLeft, FaTrash } from "react-icons/fa";
const ListPedidosActivos = ({pedidos, pedidoActivo, setPedido, eliminarPedido}) => {
  const handlePedidoClick = (pedido) => {
    setPedido(pedido);
  };
  const handleDelete = (pedido_id) => {
    eliminarPedido(pedido_id);
  };
  return (
    <div className="flex flex-col gap-2 shadow w-auto p-4 rounded">
        {
            pedidos?.map(item =>(
                <div className={item._id === pedidoActivo? "bg-green-500" : ""}>
                    <button onClick={() => handlePedidoClick(item)}><FaRegArrowAltCircleLeft /></button>
                    <label>{item.nombre_retiro}</label>
                    <button onClick={() => handleDelete(item._id)}><FaTrash /></button>
                </div>
            ))
        }
    </div>
  )
}

export default ListPedidosActivos;