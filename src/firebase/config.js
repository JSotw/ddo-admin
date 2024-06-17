// Importe de las funciones de Firebase necesarias
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

//
import { v4 } from "uuid";
// Configuración de mi proyecto de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyChKfOrXW1LmxTTVcBgEwqQUg-iIr8uW-8",
  authDomain: "pasteleria-be0bd.firebaseapp.com",
  projectId: "pasteleria-be0bd",
  storageBucket: "pasteleria-be0bd.appspot.com",
  messagingSenderId: "214780761634",
  appId: "1:214780761634:web:3531c864a801eb5dae9c7b"
};

// Inicializamos la aplicación de Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFile(rute, file) {
  const storageRef = ref(storage, `${rute}/` + v4()); // Creamos una referencia a la carpeta de destino
  await uploadBytes(storageRef, file); // Subimos el archivo
  return await getDownloadURL(storageRef); // Obtenemos el URL de descarga
}