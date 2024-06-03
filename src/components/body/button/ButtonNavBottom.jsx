import { Link } from "react-router-dom";

const ButtonNavBottom = ({ icon, name }) => {
  return (
    <Link
      className="inline-flex flex-col h-auto -mt-8 items-center justify-center rounded-2xl px-2 p-2
      bg-amber-600 hover:text-amber-900 w-auto text-white "
      to={`/modulo-${name}/lista`}
    >
      {icon}
      <span className="sr-only">{name}</span>
    </Link>
  );
};

export default ButtonNavBottom;
