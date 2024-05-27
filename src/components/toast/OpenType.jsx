import { toast, Bounce } from "react-toastify";
import ToastContent from "./ToastContent";

export function openAdd(text){
  toast.success(<ToastContent toast="add" text={text} />, {
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
