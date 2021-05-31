import Head from "next/head";
import { ThemeProvider } from "@material-ui/styles";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Container from "../components/Container";

import theme from "../styles/Theme";

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <div class="flex">
        {/*flex flex-col justify-between w-1/3 h-screen*/}
        <div class="justify-between h-screen">
          <Sidebar />
        </div>
        <div class="flex flex-col justify-between w-2/3">
          <Container />
        </div>
      </div>
    </ThemeProvider>
  );
}
