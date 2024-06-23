import { useNavigate } from "react-router-dom";
import { usePedidos } from "../../context/PedidosContext.jsx";
import PedidoItem from "../../components/body/PedidoItem.jsx"
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext.jsx";
import { useState, useEffect } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

const CrearPedido = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [detalles, setDetalles] = useState([]);
  const {
    pedidos,
    loading,
    records,
    productos,
    recordsProductos,
    pedidoId,

    setRecords,
    setRecordsProductos,
    getPedidos,
    getPedido,
    postPedido,
    putPedido,
    deletePedido,
    getProductos,
    getProducto,
    getProductoCodigo
  } = usePedidos();

  useEffect(() => {
    getProductos();
    console.log(productos);
  }, []);

  const addPedidoItem = async (producto) => {
    try {
      let _agregados = [];
      producto.agregados?.map(ag =>{
        _agregados.push({
          nombre: ag.nombre,
          cantidad: ag.minimo_selec
        });
      });
      let newDetalle = {
        cantidad: 1,
        producto_id: producto._id,
        producto: producto,
        agregados: _agregados
      }
      let _dets = detalles;
      _dets.push(newDetalle)
      setDetalles(_dets);
    } catch (error) {
      return error;
    }
  };

  const savePedido = async () => {
    
  };
  const onKeyDownValidate = async (e) => {
    if (e.key === "Enter") {
      const productoEncontrado = productos.filter((prod) => prod.codigo === e.target.value);
      if (productoEncontrado.length === 1) {
        addPedidoItem(productoEncontrado[0]);
      } else {

      }
    }
  };

  const onSubmit = handleSubmit(async (data) => {

  });

  return (
    <>
      <section className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full md:w-3/4 px-3 md:mb-0">
          <div className="shadow w-auto p-5 rounded">
            <form
              className="w-full max-w-lg text-sm"
              onSubmit={onSubmit}
              method="post"
            >
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="codigo">
                    Nombre Cliente
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border 
                    border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white 
                    focus:border-gray-500"
                    type="text"
                    id="nombre_cliente"
                    placeholder="Nombre Cliente"
                    onKeyDown={(e) => onKeyDownValidate(e)}
                    {...register("nombre_cliente", { required: false })}
                  />
                  {errors.nombre_cliente && (
                    <p className="text-red-500 mt-0 text-xs flex">
                      Se requiere Nombre del cliente
                    </p>
                  )}
                </div>
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="codigo">
                    Buscador
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border 
                    border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white 
                    focus:border-gray-500"
                    type="text"
                    id="codigo"
                    placeholder="codigo"
                    onKeyDown={(e) => onKeyDownValidate(e)}
                    {...register("codigo", { required: false })}
                  />
                  {errors.codigo && (
                    <p className="text-red-500 mt-0 text-xs flex">
                      Se requiere código
                    </p>
                  )}
                </div>
              </div>
              <div className="">
                {
                  detalles?.map((item, i) => (
                    <PedidoItem key={i} detalle={item} index={i} updateDetalle={savePedido} />
                  ))
                }
              </div>
            </form>
          </div>
        </div>
        <div className="w-full md:w-1/4 px-3 md:mb-0">
          <div className="shadow w-auto p-5 rounded">
            <form
              className="w-full max-w-lg text-sm"
              onSubmit={onSubmit}
              method="post"
            >
              Listado
            </form>

          </div>
        </div>
      </section>
      <style>{ }</style>
    </>
  );
};
export default CrearPedido;
