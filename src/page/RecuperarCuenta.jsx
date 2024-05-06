import Logo from "../assets/img/logos/01.jpeg";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RecuperarCuenta = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { datosUsuario, sendEmail, errors: datosErrors } = useAuth();

  useEffect(() => {
    if (sendEmail) {
      navigate("/", {
        state: {
          isSendEmail : true, 
        }
      })
    }
  }, [sendEmail]);

  const onSubmit = handleSubmit((data) => {
    datosUsuario(data);
  });
  return (
    <>
      <section className="bg-gray-50 ">
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
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    {datosErrors.map((error, index) => (
                      <p className="text-[12px] text-red-500" key={index}>
                        {error}
                      </p>
                    ))}
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-[#ed9e36] focus:ring-4
                  focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 
                  py-2.5 text-center transition-all hover:bg-[#f5b96b] "
                >
                  Enviar al correo asociado
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RecuperarCuenta;
