import { toast, Bounce } from "react-toastify";
import ToastContent from "./ToastContent";

export function openSuccess(modulo, text){
  toast.success(<ToastContent toast="success" modulo={modulo} text={text} />, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
}
export function openError(modulo, text){
  toast.error(<ToastContent toast="error" modulo={modulo} text={text} />, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
}
