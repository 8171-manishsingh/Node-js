import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import AppLayout from "../utils/AppLayout";
import Update from "../pages/Update";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="Home" element={<Home />}></Route>
        <Route path="signup" element={<Signup />}></Route>
        <Route index element={<Login />}></Route>
        <Route path="update/:id" element={<Update />}></Route>
      </Route>
    </Routes>
  );
}
