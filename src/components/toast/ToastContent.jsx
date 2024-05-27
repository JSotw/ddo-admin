const ToastContent = ({toast, id=false, text }) => {
  if (toast === "add"){
    return (
      <div className="px-4 py-2">
        <p>Usuario agregado:</p>
        <p className="text-green-700">{text}</p>
      </div>
    )
  }
}

export default ToastContent