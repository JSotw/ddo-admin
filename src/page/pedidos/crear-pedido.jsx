import { useNavigate } from "react-router-dom";
import { useUsuarios } from "../../context/UsuariosContext.jsx";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext.jsx";
import { useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

const CrearPedido = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { postUsuario } = useUsuarios();
  const { user } = useAuth();
  const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const uploadDB = async (data) => {
    try {
      await postUsuario(data);
      return navigate("/modulo-usuarios/lista", {
        state: { toast: "success", usuario: data.nombre_usuario },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onKeyUpValidate = (e) => {
    let errorCorreo = document.getElementById("error__correo");
    if (e.target?.value && e.target.value.match(isValidEmail)) {
      errorCorreo.textContent = "";
    } else {
      errorCorreo.textContent = "Correo inválido";
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    let dataCorreo = data.correo;
    let errorCorreo = document.getElementById("error__correo");

    if (dataCorreo && dataCorreo.length && dataCorreo.match(isValidEmail)) {
      const usuarioData = {
        primer_n: data.primer_n,
        segundo_n: data.segundo_n,
        apellido_p: data.apellido_p,
        apellido_m: data.apellido_m,
        correo: dataCorreo,
        nombre_usuario: data.nombre_usuario,
        contrasenia: data.contrasenia,
        imagen_perfil: "",
        rol: data.rol,
        activo: true,
      };
      uploadDB(usuarioData);
    } else {
      errorCorreo.textContent = "Correo ingresado incorrecto";
    }
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
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="primer_n"
                >
                  Primer Nombre (*)
                </label>
                <input
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border
                  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
                  id="primer_n"
                  {...register("primer_n", { required: true })}
                  type="text"
                  placeholder="José"
                />
                {errors.primer_n && (
                  <p className="text-red-500 mt-0 text-xs flex">
                    Se requiere el primer nombre
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="segundo_n"
                >
                  Segundo Nombre
                </label>
                <input
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border
                  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
                  id="segundo_n"
                  {...register("segundo_n")}
                  type="text"
                  placeholder="Pedro"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="apellido_p"
                >
                  Apellido Paterno
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 
                  px-4 leading-tight focus:outline-none focus:bg-white"
                  id="apellido_p"
                  type="text"
                  placeholder="González"
                  {...register("apellido_p", { required: true })}
                />
                {errors.apellido_p && (
                  <p className="text-red-500 mt-0 text-xs flex">
                    Se requiere el apellido paterno
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/2 px-3 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="apellido_m"
                >
                  Apellido Materno
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 
                  px-4 leading-tight focus:outline-none focus:bg-white"
                  id="apellido_m"
                  type="text"
                  placeholder="Pérez"
                  {...register("apellido_m", { required: true })}
                />
                {errors.apellido_m && (
                  <p className="text-red-500 mt-0 text-xs flex">
                    Se requiere el apellido materno
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="correo"
                >
                  Correo (*)
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border 
                  border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white 
                  focus:border-gray-500"
                  type="email"
                  id="correo"
                  onKeyUp={(e) => onKeyUpValidate(e)}
                  {...register("correo", { required: true })}
                  placeholder="1234@gmail.com"
                />
                <p className="text-red-500 text-xs" id="error__correo">
                  {errors.correo && "Se requiere un correo válido"}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="nombre_usuario"
                >
                  Usuario (*)
                </label>
                <input
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 
                    py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="nombre_usuario"
                  {...register("nombre_usuario", { required: true })}
                  placeholder="1234Abc"
                />
                {errors.nombre_usuario && (
                  <p className="text-red-500 text-xs">Se requiere un usuario</p>
                )}
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-state"
                >
                  Contraseña (*)
                </label>
                <div className="flex justify-around items-center relative">
                  <input
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 
                    py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="contrasenia"
                    type={showPassword ? "text" : "password"}
                    {...register("contrasenia", { required: true })}
                    placeholder="1234Abc"
                  />
                  <button
                    className="p-1 rounded-lg  absolute right-4 transition duration-200"
                    onClick={toggleShowPassword}
                    type="button"
                  >
                    {showPassword ? (
                      <RiEyeOffFill size={20} />
                    ) : (
                      <RiEyeFill size={20} />
                    )}
                  </button>
                </div>
                {errors.contrasenia && (
                  <p className="text-red-500 text-xs">
                    Se requiere una contraseña
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6 pt-5">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="rol"
                >
                  Rol (*)
                </label>
                <div className="relative cursor-pointer">
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 
                    py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="category"
                    {...register("rol", { required: true })}
                  >
                    {user?.rol === "SuperAdministrador" ? (
                      <>
                        <option value="SuperAdministrador">
                          SuperAdministrador
                        </option>
                        <option value="Administrador">Administrador</option>
                        <option value="Cajero">Cajero</option>
                      </>
                    ) : (
                      <>
                        <option value="Cajero">Cajero</option>
                      </>
                    )}
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
                {errors.rol && (
                  <p className="text-red-500 text-xs">Se requiere el rol</p>
                )}
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="imagen_perfil"
                >
                  Imagen de perfil
                </label>
                <input
                  className="appearance-none cursor-pointer block w-full bg-gray-200 text-gray-700 border rounded
                  leading-tight focus:outline-none focus:bg-white file:mr-4
                  text-sm file:cursor-pointer file:py-3 file:px-4 file:rounded
                  file:border-0 file:text-sm file:font-normal file:bg-purple-50 file:text-purple-700
                hover:file:bg-purple-200"
                  id="imagen_perfil"
                  type="file"
                  accept=".jpg, .jpeg, .png, .webp"
                  {...register("imagen_perfil")}
                />
              </div>
            </div>

            <button
              type="submit"
              className=" bg-purple-300 hover:bg-purple-400 text-gray-800 font-semibold text-sm py-2 
              px-4 rounded inline-flex items-center justify-center gap-2 transition-all w-full"
            >
              <span>Agregar</span>
            </button>
          </form>
        </div>
      </section>
      <style>{}</style>
    </>
  );
};
export default CrearPedido;
