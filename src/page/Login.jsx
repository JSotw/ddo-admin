import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext.jsx";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/img/logos/01.jpeg";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useState } from "react";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const { signin, isAuth, errors: signinErrors } = useAuth();

  const estado = location.state;

  useEffect(() => {
    console.log(estado);
    if (estado) {
      if (estado.isSendEmail) {
        toast.success("Datos enviados con éxito, revise su correo", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    }
    navigate(location.pathname, { replace: true });
    if (isAuth) navigate("/dashboard");
  }, [isAuth]);

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  return (
    <section className="bg-gray-50 ">
      <ToastContainer />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex flex-col justify-center items-center mb-6 text-2xl font-bold text-gray-900"
        >
          <img
            className="w-20 h-20 mr-2 mb-3 drop-shadow-sm rounded-xl"
            src={Logo}
            alt="logo"
          />
          DDO Admin
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form
              onSubmit={onSubmit}
              className="space-y-4 md:space-y-6"
              method="POST"
            >
              <div>
                <label
                  htmlFor="nombre_usuario"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Nombre usuario
                </label>
                <input
                  type="text"
                  {...register("nombre_usuario", { required: true })}
                  name="nombre_usuario"
                  id="nombre_usuario"
                  placeholder="Ingrese su usuario único"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                    focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required=""
                />
                <div className="flex items-start">
                  {errors.nombre_usuario && (
                    <p className="text-red-500 text-[12px]">
                      Nombre de usuario requerido
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="contrasenia"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  {...register("contrasenia", { required: true })}
                  name="contrasenia"
                  id="contrasenia"
                  placeholder="Ingrese su contraseña única"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                    focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required=""
                />
                <div className="flex items-start">
                  {errors.contrasenia && (
                    <p className="text-red-500 text-[12px]">
                      Contraseña requerida
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  {signinErrors.map((error, index) => (
                    <p className="text-[12px] text-red-500" key={index}>
                      {error}
                    </p>
                  ))}
                </div>
                <a
                  href="./recuperar-cuenta"
                  className="text-[12px] font-medium text-blue-500 hover:underline "
                >
                  ¿Olvidó su contraseña?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-[#ed9e36] focus:ring-4
                  focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 
                  py-2.5 text-center transition-all hover:bg-[#f5b96b] "
              >
                Iniciar sesión
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
