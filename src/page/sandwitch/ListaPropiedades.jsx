import { Link } from "react-router-dom";
import AdminLayout from "../AdminLayout.jsx";
import DashTable from "../../component/body/DashTable.jsx";
const ListaPropiedad = () => {
  return (
    <>
      <AdminLayout>
        <section className="flex">
          <DashTable />
        </section>
      </AdminLayout>
    </>
  );
};

export default ListaPropiedad;
