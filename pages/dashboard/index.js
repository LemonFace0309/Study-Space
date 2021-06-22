import Sidebar from "../../components/Dashboard/Sidebar";
import Container from "../../components/Dashboard/Container";

export default function Dashboard() {
  return (
    <div class="flex">
      <div class="justify-between h-screen">
        <Sidebar />
      </div>
      <div class="flex flex-col justify-between w-2/3">
        <Container />
      </div>
    </div>
  );
}
