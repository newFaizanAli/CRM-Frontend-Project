import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar";

const index = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default index;
