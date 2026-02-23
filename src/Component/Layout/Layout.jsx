import HeaderMain from "../HeaderMain/HeaderMain";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <>
      <HeaderMain />

      <main>
        <Outlet />
      </main>
    </>
  );
}