
import Header from "../components/Header";
import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
