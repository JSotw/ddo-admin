import { useNavigate } from "react-router-dom";
import { useProductos } from "../../context/ProductosContext.jsx";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext.jsx";
import { useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { ToastContainer, toast, Bounce } from "react-toastify";

const CrearProducto = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { postProducto } = useProductos();
  const [error, setError] = useState([]);

  const uploadDB = async (data) => {
    try {
      const result = await postProducto(data);
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
    const productoData = {
      codigo: data.codigo,
      nombre: data.nombre,
      descripcion: data.descripcion,
      precio_base: parseInt(data.precio_base),
      activo: true
    };
    uploadDB(productoData);
  });

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
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="agregados">
                Agregados
              </label>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
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
          </div>
            <button
              type="submit"
              className=" bg-purple-300 hover:bg-purple-400 text-gray-800 font-semibold text-sm py-2 
              px-4 rounded inline-flex items-center justify-center gap-2 transition-all w-full"
            >
              <span>Agregar</span>
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
export default CrearProducto;
