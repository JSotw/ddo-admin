import { useNavigate, useParams } from "react-router-dom";
import { useUsuarios } from "../../context/UsuariosContext.jsx";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext.jsx";
import { useEffect, useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { uploadFile } from "../../firebase/config.js";
import { openError, openLoading } from "../../components/toast/OpenType.jsx";

const ActualizarUsuario = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { getUsuario, putUsuario, err } = useUsuarios();
  const { user } = useAuth();
  const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [file, setFile] = useState(null);
  const [imagenPerfil, setImagenPerfil] = useState(null);
  const [nombreUsuario, setNombreUsuario] = useState(null);
  const params = useParams();
  useEffect(() => {
    async function loadUsuario() {
      if (params.id) {
        //console.log(params.id);
        const usuario = await getUsuario(params.id);
        //console.log(usuario);
        setValue("primer_n", usuario.primer_n);
        setValue("segundo_n", usuario.segundo_n);
        setValue("apellido_p", usuario.apellido_p);
        setValue("apellido_m", usuario.apellido_m);
        setValue("correo", usuario.correo);
        setValue("imagen_perfil", usuario.imagen_perfil);
        setValue("rol", usuario.rol);
        setValue("activo", usuario.activo);
        setImagenPerfil(usuario.imagen_perfil);
        setNombreUsuario(usuario.nombre_usuario);
      }
    }
    loadUsuario();
  }, []);

  //console.log(locationId);

  const onKeyUpValidate = (e) => {
    let errorCorreo = document.getElementById("error__correo");
    if (e.target?.value && e.target.value.match(isValidEmail)) {
      errorCorreo.textContent = "";
    } else {
      errorCorreo.textContent = "Correo inválido";
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    let dataCorreo = document.getElementById("correo").value;
    let errorCorreo = document.getElementById("error__correo");
    try {
      if (file) {
        const url = await uploadFile(`usuarios/${data.nombre_usuario}/`, file);
        //console.log(url);
        data.imagen_perfil = url;
      } else {
        data.imagen_perfil = "";
      }
    } catch (error) {
      console.error(error);
    }

    if (dataCorreo && dataCorreo.length && dataCorreo.match(isValidEmail)) {
      if (data.imagen_perfil != "") {
        setImagenPerfil(data.imagen_perfil);
      }
      console.log(imagenPerfil);
      const usuarioData = {
        primer_n: data.primer_n,
        segundo_n: data.segundo_n,
        apellido_p: data.apellido_p,
        apellido_m: data.apellido_m,
        correo: dataCorreo,
        imagen_perfil: imagenPerfil,
        rol: data.rol,
        activo: data.activo,
      };
      //console.log(usuarioData, params.id);
      await putUsuario(params.id, usuarioData);
      // console.log("timer:", err);
      openLoading();
      return navigate("/modulo-usuarios/lista", {
        state: { toast: "success", usuario: nombreUsuario },
      });
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
            method="put"
            id="form-usuarios"
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
                  {...register("apellido_m")}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-3">
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
                    id="activo"
                    name="activo"
                    {...register("activo", { required: true })}
                  >
                    <option value="true">Activo</option>
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
                {errors.activo && (
                  <p className="text-red-500 text-xs">Se requiere un estado</p>
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
                    id="rol"
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


          </form>
        </div>
      </section>

    </>
  );
};
export default ActualizarUsuario;
