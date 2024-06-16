const ToastContent = ({ toast, modulo, text }) => {
  if (toast === "success") {
    return (
      <article className="px-4 py-2">
        <h5>Guardado con éxito</h5>
        <div className="flex gap-2">
          <span className="font-bold capitalize">{modulo}:</span>
          <span className="text-gray-400">{text}</span>
        </div>
      </article>
    );
  }
  if (toast === "error") {
    return (
      <article className="px-4 py-2">
        <h5>Error al guardar</h5>
        <div className="flex gap-2">
          <span className="font-bold capitalize">{modulo}:</span>
          <span className="text-gray-400">{text}</span>
        </div>
      </article>
    );
  }
};

export default ToastContent;
