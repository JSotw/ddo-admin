import { useNavigate, useParams } from "react-router-dom";
import { useProductos } from "../../context/ProductosContext.jsx";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext.jsx";
import { useState, useEffect } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { FaPlus } from "react-icons/fa";

const CrearProducto = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { postProducto, agregados, setAgregados, getProducto, putProducto } =
    useProductos();
  const params = useParams();
  const [error, setError] = useState([]);
  const agregadoBaseName = "agregado_";
  const agregadoBasePrecio = "agregado_precio_";
  const agregadoBaseMax = "agregado_min_";
  const agregadoBaseMin = "agregado_max_";

  useEffect(() => {}, []);

  const uploadDB = async (data) => {
    try {
      if (params.id != undefined) {
        const result = await putProducto(params.id, data);
        if (result.status == 200) {
          return navigate("/modulo-productos/lista", {
            state: { toast: "success", producto: data.nombre },
          });
        } else {
          setError(result.response.data);
        }
      } else {
        const result = await postProducto(data);
        if (result.status == 200) {
          return navigate("/modulo-productos/lista", {
            state: { toast: "success", producto: data.nombre },
          });
        } else {
          setError(result.response.data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    let _agregados = [];
    [...Array(agregados)].map((x, i) => {
      if (
        data[`${agregadoBaseName}${i}`] != undefined &&
        data[`${agregadoBaseName}${i}`] != ""
      ) {
        _agregados.push({
          nombre: data[`${agregadoBaseName}${i}`],
          precio: data[`${agregadoBasePrecio}${i}`],
          minimo_selec: data[`${agregadoBaseMin}${i}`],
          maximo_select: data[`${agregadoBaseMax}${i}`],
        });
      }
    });
    const productoData = {
      codigo: data.codigo,
      nombre: data.nombre,
      descripcion: data.descripcion,
      agregados: _agregados,
      precio_base: parseInt(data.precio_base),
      activo: data.activo,
    };
    uploadDB(productoData);
  });
  const addAgregado = () => {
    setAgregados(agregados + 1);
  };

  return (
    <>
      <section className="flex w-auto gap-5 flex-wrap bg-white rounded-lg">
        <div className="shadow-md w-full p-5 rounded-lg">
          <form
            className=""
            onSubmit={onSubmit}
            method="post"
          >
            <section className="max-w-3xl text-sm flex justify-between gap-10">
              <section>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="codigo"
                    >
                      Código (*)
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border 
                border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white 
                focus:border-gray-500"
                      type="text"
                      id="codigo"
                      placeholder="Código"
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
                      htmlFor="nombre"
                    >
                      Nombre (*)
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border 
                border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white 
                focus:border-gray-500"
                      type="text"
                      id="nombre"
                      placeholder="Nombre"
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
                      htmlFor="descripcion"
                    >
                      Descripción (*)
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border 
                border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white 
                focus:border-gray-500"
                      type="text"
                      id="descripcion"
                      placeholder="Descripción"
                      {...register("descripcion", { required: true })}
                    />
                    {errors.descripcion && (
                      <p className="text-red-500 mt-0 text-xs flex">
                        Se requiere Descripción
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6 mt-3">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="precio_base"
                    >
                      Precio Base (*)
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
                        <option value="true" defaultChecked>
                          Activo
                        </option>
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
                      <p className="text-red-500 text-xs">
                        Se requiere un estado
                      </p>
                    )}
                  </div>
                </div>
              </section>
              <section className="w-96">
                <div className="flex justify-between items-center mb-2">
                  <p className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Agregados
                  </p>
                  <button
                    type="button"
                    className=" bg-purple-300 hover:bg-purple-400 text-gray-800 font-semibold text-[10px] 
                py-2 px-3 rounded inline-flex items-center justify-center gap-2 transition-all w-auto shadow-md"
                    onClick={addAgregado}
                  >
                    <span>
                      <FaPlus width={10} />
                    </span>
                  </button>
                </div>
                {[...Array(agregados)].map((x, i) => (
                  <div
                    key={i}
                    className="mt-1 shadow-sm bg-white w-auto px-2 py-[1px] rounded"
                  >
                    <div className="flex flex-wrap -mx-3 mb-4 mt-2">
                      <div className="w-full md:w-1/3 px-3 md:mb-0 text-[10px] ">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-[10px] font-bold mb-2"
                          htmlFor={`${agregadoBaseName}${i}`}
                        >
                          {i + 1}° Agregado
                        </label>
                        <input
                          className="appearance-none block text-[10px] 
                      w-full bg-gray-200 text-gray-700 border 
                      border-gray-200 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white 
                      focus:border-gray-500"
                          type="text"
                          name={`${agregadoBaseName}${i}`}
                          id={`${agregadoBaseName}${i}`}
                          {...register(`${agregadoBaseName}${i}`, {
                            required: true,
                          })}
                          placeholder="Nombre"
                        />
                      </div>
                      <div className="w-full md:w-1/4 px-2 md:mb-0 text-[10px] ">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-[10px] font-bold mb-2"
                          htmlFor={`${agregadoBasePrecio}${i}`}
                        >
                          Precio
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border 
                      border-gray-200 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white 
                      focus:border-gray-500 text-[10px] "
                          type="number"
                          name={`${agregadoBasePrecio}${i}`}
                          id={`${agregadoBasePrecio}${i}`}
                          {...register(`${agregadoBasePrecio}${i}`, {
                            required: false,
                          })}
                          placeholder="000"
                          defaultValue={0}
                        />
                      </div>
                      <div className="w-full md:w-1/5 px-3 md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-[10px] text-gray-700 font-bold mb-2"
                          htmlFor={`${agregadoBaseMin}${i}`}
                        >
                          Min
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border 
                  border-gray-200 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white 
                  focus:border-gray-500 text-[10px] "
                          type="number"
                          name={`${agregadoBaseMin}${i}`}
                          id={`${agregadoBaseMin}${i}`}
                          {...register(`${agregadoBaseMin}${i}`, {
                            required: true,
                          })}
                          placeholder="000"
                          defaultValue={0}
                        />
                      </div>
                      <div className="w-full md:w-1/5 px-3 md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-[10px] font-bold mb-2"
                          htmlFor={`${agregadoBaseMax}${i}`}
                        >
                          Max
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border 
                      border-gray-200 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white 
                      focus:border-gray-500 text-[10px]"
                          type="number"
                          name={`${agregadoBaseMax}${i}`}
                          id={`${agregadoBaseMax}${i}`}
                          {...register(`${agregadoBaseMax}${i}`, {
                            required: true,
                          })}
                          placeholder="000"
                          defaultValue={1}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            </section>
            <button
              type="submit"
              className=" bg-purple-300 hover:bg-purple-400 text-gray-800 font-semibold text-sm py-2 
              px-4 rounded inline-flex items-center justify-center gap-2 transition-all w-full"
            >
              {(params.id && <span>Actualizar</span>) || <span>Agregar</span>}
            </button>
            {error != "" ? (
              <label className="block uppercase tracking-wide text-red-700 text-xs font-bold mb-2">
                {error}
              </label>
            ) : (
              <></>
            )}
          </form>
        </div>
      </section>
      <style>{}</style>
    </>
  );
};
export default CrearProducto;
