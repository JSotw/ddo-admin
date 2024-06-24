import React from "react";
import { Link } from "react-router-dom";

const CardPedidos = ({ icon, text, href, color }) => {
  return (
    <div className="w-full md:w-48 ">
      <Link
        style={{ backgroundColor: color }}
        className={`md:p-2 shadow-md p-6 text-gray-700 shadow-gray-200 rounded-xl justify-center items-center
          flex gap-2 text-sm font-semibold hover:scale-105 transition-all duration-300 ease-in-out`}
        to={href}
      >
        {icon}
        {text}
      </Link>
    </div>
  );
};

export default CardPedidos;
