import ButtonNavBottom from "./button/ButtonNavBottom";
import { FaHamburger, FaUser, FaChartPie  } from "react-icons/fa";

const items = [
  // {
  //   icon: <LuBarChart3 size={20} />,
  //   name: "productos",
  // },
  // {
  //   icon: <LuDollarSign size={20} />,
  //   name: "ventas",
  // },
  {
    icon: <FaChartPie  size={27} />,
    name: "control",
  },
  {
    icon: <FaHamburger size={27} />,
    name: "productos",
  },
  {
    icon: <FaUser size={27} />,
    name: "usuarios",
  },
];
const NavBottom = () => {
  return (
    <div
      className="fixed z-50 w-full h-12 p-4 max-w-lg -translate-x-1/2 border bg-amber-100
      border-gray-200 rounded-t-xl bottom-0 left-1/2 shadow-md"
    >
      <div className="flex gap-1 h-full max-w-lg flex-cols-5 mx-auto justify-center">
        {items?.map(link => (
          <ButtonNavBottom 
            key={link.name}
            icon={link.icon}
            name={link.name}
          />
        ))}
      </div>
    </div>
  );
};

export default NavBottom;
