import { FaUserAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext.jsx";

const perfil = () => {
  const { user } = useAuth();
  return (
    <section>
      <div className="bg-white overflow-hidden shadow-md rounded-lg border">
        <div className="px-4 py-5 sm:px-6 flex flex-col gap-2 items-center justify-center">
          {user && user.imagen_perfil ? (
            <img
              src={user.imagen_perfil}
              className="text-lg leading-6 font-medium text-gray-900 w-36 h-36 rounded-3xl shadow-md"
            />
          ) : (
            <FaUserAlt size={40}/>
          )}
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {user ? user.rol : ""}
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Nombre completo
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user
                  ? `${user.primer_n} ${user.segundo_n} ${user.apellido_p} ${user.apellido_m}`
                  : ""}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Correo</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user ? user.correo : ""}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Nombre de usuario
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user ? user.nombre_usuario : ""}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">No sé qué más colocar</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {""}
                <span></span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
};

export default perfil;
