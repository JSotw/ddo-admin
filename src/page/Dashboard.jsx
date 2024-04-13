import AdminLayout from "./AdminLayout";

const Dashboard = () => {
  return (
    <section>
      <AdminLayout>
        <section className="flex gap-4 flex-wrap">
          <div className="shadow w-auto p-5">Dashboard</div>
          <div className="shadow w-auto p-5">Dashboard</div>
          <div className="shadow w-auto p-5">Dashboard</div>
        </section>
      </AdminLayout>
    </section>
  );
};

export default Dashboard;
