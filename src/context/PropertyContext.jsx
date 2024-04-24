// import { createContext, useContext, useState, useEffect } from "react";
// import {
//   createPropertyBack,
//   getPropertiesBack,
//   getPropertiesFront,
//   getPropertyBack,
//   getPropertyFront,
//   getLastFourProperties,
// } from "../api/apiProperty.js";

// const PropertyContext = createContext();

// export const useProperty = () => {
//   const context = useContext(PropertyContext);

//   if (!context) {
//     throw new Error("useProperty debe usarse dentro de un PropertyProvider");
//   }

//   return context;
// };

// export function PropertyProvider({ children }) {
//   const [properties, setProperties] = useState([]);
//   const [propertiesF, setPropertiesF] = useState([]);
//   const [propertyF, setPropertyF] = useState([]);
//   const [imagesF, setImagesF] = useState([]);
//   const [lastFourP, setLastFourP] = useState([]);

//   const [errors, setErrors] = useState([]);

//   useEffect(() => {
//     if (errors.length > 0) {
//       const timer = setTimeout(() => {
//         setErrors([]);
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [errors]);

//   const getProperties = async () => {
//     try {
//       const res = await getPropertiesBack();
//       setProperties(res.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const createProperty = async (property) => {
//     const res = await createPropertyBack(property);
//     //console.log(res)
//   };


//   //Front
//   const getPropertyF = async (id) => {
//     try {
//       const res = await getPropertyFront(id);
//       //console.log("Context: ",res.data);
//       return res.data;
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   const getImagesF = async (id) => {
//     try {
//       const res = await getPropertyFront(id);
//       //console.log("Images: ",res.data.images)
//       setImagesF(res.data.images);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   const getPropertiesF = async () => {
//     try {
//       const res = await getPropertiesFront();
//       setPropertiesF(res.data);
//       //console.log(res);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const getLastFourP = async () => {
//     try {
//       const res = await getLastFourProperties();
//       setLastFourP(res.data)
//       console.log("Last Four: ",res.data)
      
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <PropertyContext.Provider
//       value={{
//         properties,
//         propertiesF,
//         propertyF,
//         imagesF,
//         createProperty,
//         getProperties,
//         getPropertiesF,
//         getPropertyF,
//         getImagesF,
//         getLastFourP,
//         lastFourP,
//         errors,
//       }}
//     >
//       {children}
//     </PropertyContext.Provider>
//   );
// }
