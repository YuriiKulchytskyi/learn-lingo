import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Layout = () => {
  return (
    <>
      <ToastContainer position="bottom-right" autoClose={3000}/>
      <Header />
      <Outlet />
    </>
  );
};
