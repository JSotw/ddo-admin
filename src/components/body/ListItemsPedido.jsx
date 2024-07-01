import PedidoItem from "../../components/body/PedidoItem.jsx";
const ListItemsPedido = ({countDetalles, detalles, savePedido}) => {
  const handleSave = () => {
    savePedido();
  };
  return (
    <div>
      {
        [...Array(countDetalles)].map((item, i) => (
          <div id={`cont_detalles_${i}`}>
            <PedidoItem key={`detalles_${i}`} detalle={detalles[i]} index={i} updateDetalle={handleSave}/>
          </div>
        ))
      }
    </div>
  )
}

export default ListItemsPedido;