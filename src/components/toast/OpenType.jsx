import { toast, Bounce } from "react-toastify";
import ToastContent from "./ToastContent";
import { FaUpload } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export function openSuccess(modulo, text) {
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
export function openError(modulo, text) {
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

export function openLoading() {
  toast(
    <div className="flex items-center gap-2 text-sm">
      <AiOutlineLoading3Quarters className="animate-spin text-blue-500" />
      Guardando datos...
    </div>,
    {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    }
  );
}
