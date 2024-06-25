import { useNavigate } from "react-router-dom";
import { usePedidos } from "../../context/PedidosContext.jsx";
import PedidoItem from "../../components/body/PedidoItem.jsx";
import ListPedidosActivos from "../../components/body/ListPedidosActivos.jsx";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext.jsx";
import { useState, useEffect, useRef } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

const CrearPedido = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const formRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [error, setError] = useState([]);
  const {
    pedidos,
    loading,
    records,
    productos,
    recordsProductos,
    pedidoId,
    detalles,
    countDetalles,
    cliente,
    mediosPago,

    setCliente,
    setRecords,
    setDetalles,
    setCountDetalles,
    setRecordsProductos,
    getPedidos,
    getPedido,
    postPedido,
    putPedido,
    deletePedido,
    getProductos,
    getProducto,
    getProductoCodigo,
    setPedidoId,
    getMediosPago
  } = usePedidos();

  useEffect(() => {
    setDetalles([]);
    setCountDetalles(0);
    setCliente("");
    getProductos();
    getMediosPago();

    let desde= new Date(); 
    let hasta= new Date();

    desde.setHours(0, 0, 0, 0);
    hasta.setHours(23, 59, 59, 999);
    getPedidos(desde, hasta, 1)
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
      setCountDetalles(_dets.length);
      savePedido();
    } catch (error) {
      return error;
    }
  };
  const uploadDB = async (data) => {
    if(pedidoId == ""){
      postPedido(data);
    }else{
      putPedido(pedidoId, data);
    }
  };
  
  const setPedido = async (pedido) => {
    let _detalles = await pedido.detalles;
    await _detalles.map(item =>{
      item.producto.agregados.map(ag =>{
        let _busqueda = item.ingredientes.filter((i) => i.agregado.nombre === ag.nombre);
        if(_busqueda !== null && _busqueda !== undefined){
          ag.cantidad = _busqueda[0].cantidad;
        }
      })
    })
    setDetalles(_detalles);
    setCountDetalles(_detalles.length);
    setPedidoId(pedido._id);
    setCliente(pedido.nombre_retiro);
    setValue("nombre_cliente", pedido.nombre_retiro);
  };

  const savePedido = async () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
          new Event('submit', { bubbles: true, cancelable: true })
      );
    }
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
  const onKeyDownValidateCliente = async (e) => {
    if(e.target.value != ""){
      setCliente(e.target.value);
    }
  };
  const onValuePagoChange = async (e) => {
    if(e.target.value != ""){
      
    }
  };
  const submit = async (e) => {
    //e.preventDefault();
    let nombre_retiro = document.getElementById(`nombre_cliente`).value;
    if(nombre_retiro != ""){
      let _errors = {};
      let _errorsCount = 0;
        let _detalles = [];
        let _pagos = [];
        detalles.map((detalle, i) => {
          let _det = detalle;
          _det.agregados = [];
          detalle.producto.agregados?.map(item =>{
            let _ag = {
                nombre: item.nombre,
                cantidad: 0
            };
            const itemId = `${i}_${item.nombre}`;
            try{
              const cantidadAg = document.getElementById(itemId).value;
              if(cantidadAg !== undefined && cantidadAg !== 0){
                _ag.cantidad = cantidadAg;
                _det.agregados.push(_ag);
              }
            }catch(err){}
          })
          _detalles.push(_det);
        });
        mediosPago.map((mp, i)=>{
          const montoPagado = document.getElementById(mp.nombre).value;
          if(montoPagado !== undefined && montoPagado !== null && montoPagado !== 0 && montoPagado !== ""){
            let _pago = {
              tipo_pago:mp,
              monto: montoPagado
            };
            let _errorPagos = 0;
            _pago.tipo_pago.camposExtra.map((tp, i)=>{
              const valueCampo = document.getElementById(tp.nombre).value;
              if((valueCampo === undefined || valueCampo === null || valueCampo === "") && tp.obligatorio){
                _errorPagos++;
              }else{
                tp.valor = valueCampo;
              }
            });
            if(_errorPagos == 0){
              _pagos.push(_pago);
            }else{
              _errorsCount++;
            }
          }
        });
      if(_errorsCount === 0){
          uploadDB({
            nombre_retiro: nombre_retiro,
            detalles: _detalles,
            id_usuario: user.id,
            pagos: _pagos
          });
      }else{
        setError(_errors);
      }
    }else{
      setError({nombre_cliente: true})
    }
  };

  return (
    <>
      <section className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full md:w-3/4 px-3 md:mb-0">
          <div className="shadow w-auto p-5 rounded">
            <form
              className="w-full max-w-lg text-sm"
              method="post"
              id="form_pedido"
              key="form_pedido"
              onSubmit={handleSubmit(submit)}
              ref={formRef}
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
                    onKeyDown={(e) => onKeyDownValidateCliente(e)}
                    {...register("nombre_cliente", { required: true })}
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
                  [...Array(detalles.length)].map((item, i) => (
                    <PedidoItem key={i} detalle={detalles[i]} index={i} updateDetalle={savePedido}/>
                  ))
                }
              </div>
            </form>
          </div>
        </div>
        <div className="w-full md:w-1/4 px-3 md:mb-0">
          <div>
            <div className="shadow w-auto p-5 rounded">
                Listado otros pedido abiertos
            </div>
            <div>
              <ListPedidosActivos pedidos={pedidos} pedidoActivo={pedidoId} setPedido={setPedido}/>
            </div>
            
          </div>
          <div>
            <div className="shadow w-auto p-5 rounded">
                Pagos
              <div>
                {
                    [...Array(mediosPago.length)].map((item, i) => (
                      <div className="shadow w-auto p-5 rounded">
                        <label>{mediosPago[i].nombre}</label>
                        <div>
                        {[...Array(mediosPago[i].camposExtra.length)].map((ce, ice) => (
                          <div>
                            <label>{mediosPago[i].camposExtra[ice].nombre}</label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border 
                            border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white 
                            focus:border-gray-500" type="text" 
                            id={mediosPago[i].camposExtra[ice].nombre}
                            {...register(mediosPago[i].camposExtra[ice].nombre, { required: (mediosPago[i].camposExtra[ice].obligatorio && (mediosPago[i].monto !== undefined && mediosPago[i].monto >= 0 )) })}/>
                            {errors[mediosPago[i].camposExtra[ice].nombre] && (
                              <p className="text-red-500 mt-0 text-xs flex">
                                Se requiere {mediosPago[i].camposExtra[ice].nombre}
                              </p>
                            )}
                          </div>
                        ))}
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border 
                        border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white 
                        focus:border-gray-500" 
                        id={mediosPago[i].nombre}
                        placeholder="$00"
                        onChange={onValuePagoChange}
                        type="number" />
                        </div>
                      </div>
                    ))
                }
              </div>
            </div>
          </div>
        </div>
      </section>
      <style>{ }</style>
    </>
  );
};
export default CrearPedido;
