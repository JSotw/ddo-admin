import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDm7lAOsNW1X2w9Joji5_yob6x5shp-9iI",
  authDomain: "shalom-propiedades.firebaseapp.com",
  projectId: "shalom-propiedades",
  storageBucket: "shalom-propiedades.appspot.com",
  messagingSenderId: "950021009775",
  appId: "1:950021009775:web:711d89ed929aa92039f89a"
};

// Iniciar Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
