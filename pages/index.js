import Sidebar from "../components/Sidebar";
import Container from "../components/Container";

export default function Home() {
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
