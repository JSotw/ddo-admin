import React from "react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

const HomePage = () => {
  const products = [
    {
      id: 1,
      name: "Churrasca",
      price: 500,
      image:
        "https://img-global.cpcdn.com/recipes/ee0bd9722324b719/1200x630cq70/photo.jpg",
      description: "Deliciosa pan cocinado al carbón",
      condiments: ["No desea","Queso", "Ave Mayo"],
      sauce: ["No desea", "Ketchup", "Mayonesa"],
    },
    {
      id: 2,
      name: "Sopaipillas",
      price: 500,
      image:
        "https://www.tipicochileno.cl/wp-content/uploads/2011/05/3formas-de-preparar-sopaipillas-B.png",
      description: "Crujientes sopaipillas recién hechas.",
      condiments: ["No desea","Queso", "Ave Mayo"],
      sauce: ["No desea", "Ketchup", "Mayonesa"],
    },
  ];

  return (
    <div>
      
      <nav className="bg-[#dfcaae] z-10  text-[#402211] py-4 shadow-md fixed w-full">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <img
              src="/src/assets/img/logos/01.jpeg"
              alt="Logo"
              className="h-10"
            />
          </div>
          <div>
            <a href="#" className="mx-4">
              Contacto
            </a>
            <a href="#" className="mx-4">
              Sobre Nosotros
            </a>
          </div>
        </div>
      </nav>

      
      <div className="container my-auto py-28 px-12">
        <div className="flex flex-wrap gap-8 w-auto justify-start">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-[white] w-72 text-md shadow-md hover:scale-105 transition duration-300 cursor-pointer rounded-lg overflow-hidden"
            >
              <a href="#" className="">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-44 object-cover"
                />
                <div className="p-10">
                  <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                  <p className="text-green-700 mb-2 font-semibold rounded-lg text-xl p-3 w-full">$ {product.price}</p>
                  <select className="form-select mb-2 shadow-md p-3 rounded-lg bg-[#FBEFDF] w-full">
                    <option disabled selected>
                      Selecciona un condimento
                    </option>
                    {product.condiments.map((condiment) => (
                      <option key={condiment}>{condiment}</option>
                    ))}
                  </select>
                  <select className="form-select mb-4 shadow-md p-3 rounded-lg bg-[#FBEFDF] w-full">
                    <option disabled selected>
                      Selecciona una salsa
                    </option>
                    {product.sauce.map((sauce) => (
                      <option key={sauce}>{sauce}</option>
                    ))}
                  </select>
                  <div className="h-1 rounded-lg bg-[#402211]"></div>
                  <p className="text-gray-700 rounded-lg p-3 ">{product.description}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      
      <footer className="bg-[#fff] text-[#402211] py-1 shadow-[2px_0px_10px_0px_#d1d1d1] bottom-0 relative w-full">
        <div className="container mx-auto flex justify-between items-center">
          <div>&copy; Donde deme otra | Todos los derechos reservados </div>
          <div>
            <a href="#" className="mx-4">
              <FaWhatsapp size={24} />
            </a>
            <a href="#" className="mx-4">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
