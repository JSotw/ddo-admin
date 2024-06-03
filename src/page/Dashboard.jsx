import DashboardStatGrid from "../components/body/DashboardStatGrid"
import Chart from "../components/body/Chart";

export default function Dashboard(){
  return(
    <div className="flex gap-4 justify-center flex-wrap ">

        <DashboardStatGrid />
        <Chart />

    </div>
  )
}
