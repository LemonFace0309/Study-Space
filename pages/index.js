import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Container from "../components/Container";

export default function Home() {
  return (
    <div class="flex">
      <div class="flex flex-col justify-between w-1/3 h-screen">
        <Sidebar />
      </div>
      <div class="flex flex-col justify-between w-2/3">
        <Container />
      </div>
    </div>
  );
}
