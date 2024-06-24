import { useNavigate, useParams } from "react-router-dom";
import { useProductos } from "../../context/ProductosContext.jsx";
import { useForm } from "react-hook-form";  
import { useAuth } from "../../context/AuthContext.jsx";
import { useState, useEffect } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { ToastContainer, toast, Bounce } from "react-toastify";

const ActualizarProducto = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { agregados, setAgregados, getProducto, putProducto } = useProductos();
  const params = useParams();
  const [error, setError] = useState([]);
  const [agregadosLength, setAgregadosLength] = useState(0);
  const agregadoBaseName = "agregado_";
  const agregadoBasePrecio = "agregado_precio_";
  const agregadoBaseMax = "agregado_min_";
  const agregadoBaseMin = "agregado_max_";

  useEffect(() => {
    if (params.id) {
      async function loadProducto(_id) {
        setAgregados(1);
        const producto = await getProducto(_id);
        setValue("codigo", producto.codigo);
        setValue("nombre", producto.nombre);
        setValue("descripcion", producto.descripcion);
        setValue("precio_base", parseInt(producto.precio_base));
        setValue("activo", producto.activo);
        if(producto.agregados != undefined){
          setAgregados(producto.agregados.length);
          [...Array(agregados)].map((x, i) =>{
            if(producto.agregados[i] != undefined){
              console.log(producto.agregados[i])
              setValue(`${agregadoBaseName}${i}`, producto.agregados[i].nombre);
              setValue(`${agregadoBasePrecio}${i}`, producto.agregados[i].precio);
              setValue(`${agregadoBaseMin}${i}`, producto.agregados[i].minimo_selec);
              setValue(`${agregadoBaseMax}${i}`, producto.agregados[i].maximo_select);
            }
          });
        }
      }
      loadProducto(params.id);
    }
  }, []);

  const uploadDB = async (data) => {
    try {
        const result = await putProducto(params.id, data);
        if(result.status == 200){
            return navigate("/modulo-productos/lista", {
            state: { toast: "success", producto: data.nombre },
            });
        }else{
            setError(result.response.data);
        }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    let _agregados = [];
    [...Array(agregados)].map((x, i) =>{
      if(data[`${agregadoBaseName}${i}`] != undefined && data[`${agregadoBaseName}${i}`] != ""){
        _agregados.push({
          nombre: data[`${agregadoBaseName}${i}`],
          precio: data[`${agregadoBasePrecio}${i}`],
          minimo_selec: data[`${agregadoBaseMin}${i}`],
          maximo_select: data[`${agregadoBaseMax}${i}`]
        });
      }
    });
    const productoData = {
      codigo: data.codigo,
      nombre: data.nombre,
      descripcion: data.descripcion,
      agregados: _agregados,
      precio_base: parseInt(data.precio_base),
      activo: data.activo
    };
    uploadDB(productoData);
  });
  const addAgregado = () =>{
    setAgregados(agregados+1);
  }

  return (
    <>
      <section className="flex gap-4 flex-wrap">
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
                Código
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border 
                border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white 
                focus:border-gray-500"
                type="text"
                id="codigo"
                placeholder="codigo"
                {...register("codigo", { required: true })}
              />
              {errors.codigo && (
                <p className="text-red-500 mt-0 text-xs flex">
                  Se requiere código
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="nombre">
                Nombre
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border 
                border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white 
                focus:border-gray-500"
                type="text"
                id="nombre"
                placeholder="nombre"
                {...register("nombre", { required: true })}
              />
              {errors.nombre && (
                <p className="text-red-500 mt-0 text-xs flex">
                  Se requiere Nombre
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="descripcion">
                Descripción
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border 
                border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white 
                focus:border-gray-500"
                type="text"
                id="descripcion"
                placeholder="descripcion"
                {...register("descripcion", { required: true })}
              />
              {errors.descripcion && (
                <p className="text-red-500 mt-0 text-xs flex">
                  Se requiere Descripción
                </p>
              )}
            </div>
          </div>
          {[...Array(agregadosLength)].map((x, i) =>
          <div className="shadow w-auto p-5 rounded">
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor={`${agregadoBaseName}${i}`}>
                  {i+1}° Agregado 
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border 
                  border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white 
                  focus:border-gray-500"
                  type="text"
                  name={`${agregadoBaseName}${i}`}
                  id={`${agregadoBaseName}${i}`}
                  {...register(`${agregadoBaseName}${i}`, { required: true })}
                  placeholder="nombre"
                />
              </div>
              <div className="w-full md:w-1/3 px-3 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor={`${agregadoBasePrecio}${i}`}>
                  Precio
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border 
                  border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white 
                  focus:border-gray-500"
                  type="number"
                  name={`${agregadoBasePrecio}${i}`}
                  id={`${agregadoBasePrecio}${i}`}
                  {...register(`${agregadoBasePrecio}${i}`, { required: false })}
                  placeholder="000"
                  defaultValue={0}
                />
              </div>
              <div className="w-full md:w-1/3 px-3 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor={`${agregadoBaseMin}${i}`}>
                  Min
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border 
                  border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white 
                  focus:border-gray-500"
                  type="number"
                  name={`${agregadoBaseMin}${i}`}
                  id={`${agregadoBaseMin}${i}`}
                  {...register(`${agregadoBaseMin}${i}`, { required: true })}
                  placeholder="000"
                  defaultValue={0}
                />
              </div>
              <div className="w-full md:w-1/3 px-3 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor={`${agregadoBaseMax}${i}`}>
                  Max
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border 
                  border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white 
                  focus:border-gray-500"
                  type="number"
                  name={`${agregadoBaseMax}${i}`}
                  id={`${agregadoBaseMax}${i}`}
                  {...register(`${agregadoBaseMax}${i}`, { required: true })}
                  placeholder="000"
                  defaultValue={1}
                />
              </div>
            </div>
          </div>
          )}
            <button
              type="button"
              className=" bg-purple-300 hover:bg-purple-400 text-gray-800 font-semibold text-sm py-2 
              px-4 rounded inline-flex items-center justify-center gap-2 transition-all w-full"
              onClick={addAgregado}
              >
              <span>+</span>
            </button>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="precio_base">
                Precio Base
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border 
                border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white 
                focus:border-gray-500"
                type="number"
                id="precio_base"
                placeholder="000"
                {...register("precio_base", { required: true })}
              />
              {errors.descripcion && (
                <p className="text-red-500 mt-0 text-xs flex">
                  Se requiere Precio Base
                </p>
              )}
            </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="rol"
                >
                  Estado (*)
                </label>
                <div className="relative cursor-pointer">
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 
                    py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="estado"
                    {...register("estado", { required: true })}
                  >
                    <option value="true" defaultChecked>Activo</option>
                    <option value="false">Inactivo</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
                {errors.estado && (
                  <p className="text-red-500 text-xs">Se requiere un estado</p>
                )}
              </div>
          </div>
            <button
              type="submit"
              className=" bg-purple-300 hover:bg-purple-400 text-gray-800 font-semibold text-sm py-2 
              px-4 rounded inline-flex items-center justify-center gap-2 transition-all w-full"
            >
              <span>Actualizar</span>
            </button>
            {error != "" ? (
              <label
                className="block uppercase tracking-wide text-red-700 text-xs font-bold mb-2">
                {error}
              </label>) : <></>}
          </form>
        </div>
      </section>
      <style>{}</style>
    </>
  );
};
export default ActualizarProducto;
