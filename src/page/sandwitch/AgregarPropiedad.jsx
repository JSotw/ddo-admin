import AdminLayout from "../AdminLayout.jsx";
import { MdLibraryAdd } from "react-icons/md";

import { useForm } from "react-hook-form";
import { useProperty } from "../../context/PropertyContext.jsx";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase/config.js";
import { v4 } from "uuid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AgregarPropiedad = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { createProperty } = useProperty();
  const [images, setImages] = useState([]);
  var urls = [];
  const propertyId = v4();

  // console.log(propertyId);

  const handleChange = (e) => {
    if (setImages) {
      setImages([]);
    }

    const fileList = e.target.files;
    //let reader = new FileReader;
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      file["id"] = v4();
      setImages((prevImage) => [...prevImage, file]);
    } 
  };
  //console.log(images)
  const uploadImg = async (storageRef, image) => {
    await uploadBytes(storageRef, image);
    const resDownload = await getDownloadURL(storageRef);
    return resDownload;
  };

  const saveUrls = async (propertyId) => {
    for (let i = 0; i < images.length; i++) {
      const storageRef = ref(
        storage,
        `propiedades/${propertyId}/${images[i].id}`
      );
      const res = await uploadImg(storageRef, images[i]);
      urls.push(res);
      console.log("URL:", res);
    }
  };

  const uploadToDB = (data) => {
    try {
      createProperty(data);
      console.log("Subiendo imágenes...");
      toastNotify();
      navigate("/admin/lista-propiedades");
    } catch (error) {
      console.error(error);
    }
  };

  const toastNotify = () => {
    toast.success("Subiré las imágenes, dame unos minutos...", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const onSubmit = handleSubmit(async (data) => {
    toastNotify();
    await saveUrls(propertyId);
    const propertyData = {
      id: propertyId,
      title: data.title,
      size: data.size,
      size_type: data.size_type,
      cant_bedroom: data.cant_bedroom,
      cant_bathroom: data.cant_bathroom,
      description: data.description,
      category: data.category,
      type: data.type,
      location_street: data.location_street,
      location_city: data.location_city,
      location_region: data.location_region,
      price: data.price,
      price_type: data.price_type,
      images: urls,
    };
    uploadToDB(propertyData);
  });








  return (
    <AdminLayout>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <section className="flex gap-4 flex-wrap">
        <div className="shadow w-auto p-5 rounded">
          <form
            className="w-full max-w-lg text-sm"
            onSubmit={onSubmit}
            method="post"
          >
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="title"
                >
                  Titulo (*)
                </label>
                <input
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border
                   rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white
                  `}
                  id="title"
                  {...register("title", { required: true })}
                  type="text"
                  placeholder="Casa en Viña del Mar"
                />
                {errors.title && (
                  <p className="text-red-500 mt-0 text-xs flex">
                    Se requiere un titulo
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="size"
                >
                  Tamaño general/total (*)
                </label>
                <div className="block sm:flex">
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border 
                    border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white
                     focus:border-gray-500"
                    id="size"
                    {...register("size", { required: true })}
                    type="number"
                    placeholder="10000"
                  />
                  <div className="relative">
                    <select
                      className="block appearance-none w-full sm:w-auto bg-gray-200 border border-gray-200 text-gray-700 
                    py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="size_type"
                      {...register("size_type", { required: true })}
                    >
                      <option value="m²">Metros²</option>
                      <option value="ha">Hectáreas</option>
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
                </div>
                {errors.title && (
                  <p className="text-red-500 text-xs">Se requiere un tamaño</p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="property_bedroom"
                >
                  Cantidad de dormitorios
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 
                  px-4 leading-tight focus:outline-none focus:bg-white"
                  id="cant_bedroom"
                  type="number"
                  placeholder="5"
                  {...register("cant_bedroom")}
                />
                <p className="text-xs">(Dejar vacío si no aplica)</p>
              </div>
              <div className="w-full md:w-1/2 px-3 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="property__bathroom"
                >
                  Cantidad de baños
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border 
                    border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white
                    focus:border-gray-500"
                  id="cant_bathroom"
                  type="number"
                  {...register("cant_bathroom")}
                  placeholder="3"
                />
                <p className="text-xs">(Dejar vacío si no aplica)</p>
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="description"
                >
                  Descripción breve (*)
                </label>
                <textarea
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border 
                  border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white 
                  focus:border-gray-500"
                  id="description"
                  {...register("description", { required: true })}
                  placeholder="La casa cuenta con luz subterránea y además..."
                />
                {errors.description && (
                  <p className="text-red-500 text-xs">
                    Se requiere una descripción breve
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-state"
                >
                  Categoría (*)
                </label>
                <div className="relative cursor-pointer">
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 
                    py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="category"
                    {...register("category", { required: true })}
                  >
                    <option defaultValue="Venta">Venta</option>
                    <option value="Arriendo">Arriendo</option>
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
                {errors.category && (
                  <p className="text-red-500 text-xs">
                    Se requiere una categoría
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-state"
                >
                  Tipo de propiedad (*)
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 
                    py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="type"
                    {...register("type", { required: true })}
                  >
                    <option defaultValue="Departamento">Departamento</option>
                    <option value="Casa">Casa</option>
                    <option value="Terreno">Terreno</option>
                    <option value="Parcela">Parcela</option>
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
                {errors.type && (
                  <p className="text-red-500 text-xs">Se requiere el tipo</p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2 pt-5">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-city"
                >
                  Calle <span className="font-normal">(Opcional)</span>
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border
                   border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white
                    focus:border-gray-500"
                  id="location_street"
                  type="text"
                  {...register("location_street")}
                  placeholder="Adlsd 23"
                />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-city"
                >
                  Ciudad (*)
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border
                   border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white
                    focus:border-gray-500"
                  id="location_city"
                  type="text"
                  {...register("location_city", { required: true })}
                  placeholder="Concepción"
                />
                {errors.location_city && (
                  <p className="text-red-500 text-xs">Se requiere la ciudad</p>
                )}
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-zip"
                >
                  Región (*)
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="location_region"
                  type="text"
                  {...register("location_region", { required: true })}
                  placeholder="Bío Bío"
                />
                {errors.location_region && (
                  <p className="text-red-500 text-xs">Se requiere la región</p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6 pt-5">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-zip"
                >
                  Precio (*)
                </label>
                <div className="sm:flex">
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200
                     rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="price"
                    type="number"
                    {...register("price", { required: true })}
                    placeholder="90210"
                  />
                  <div className="relative">
                    <select
                      className="block appearance-none w-full sm:w-auto bg-gray-200 border border-gray-200 text-gray-700 
                    py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="price_type"
                      {...register("price_type", { required: true })}
                    >
                      <option value="CLP">CLP</option>
                      <option value="UF">UF</option>
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
                </div>
                {errors.price && (
                  <p className="text-red-500 text-xs">Se requiere el precio</p>
                )}
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="images"
                >
                  Imágenes (Máx 10) (*)
                </label>
                <input
                  className="appearance-none cursor-pointer block w-full bg-gray-200 text-gray-700 border rounded
                  leading-tight focus:outline-none focus:bg-white file:mr-4
                  text-sm file:cursor-pointer file:py-3 file:px-4 file:rounded
                  file:border-0 file:text-sm file:font-normal file:bg-purple-50 file:text-purple-700
                hover:file:bg-purple-200"
                  id="images"
                  type="file"
                  multiple
                  accept=".jpg, .jpeg, .png, .webp"
                  {...register("images", { required: true })}
                  onChange={handleChange}
                />
                {errors.images && (
                  <p className="text-red-500 text-xs">Se requieren imágenes</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className=" bg-purple-300 hover:bg-purple-400 text-gray-800 font-semibold text-sm py-2 
              px-4 rounded inline-flex items-center justify-center gap-2 transition-all w-full"
            >
              <MdLibraryAdd />
              <span>Agregar</span>
            </button>
          </form>
        </div>
      </section>
    </AdminLayout>
  );
};

export default AgregarPropiedad;
