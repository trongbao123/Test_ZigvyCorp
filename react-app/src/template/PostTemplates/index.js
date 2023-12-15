import { Fragment, useEffect } from "react";
import { Outlet } from "react-router-dom";
import React, { useState } from "react";
import Header from "../header/header";
import Footer from "../Footer/footer";

const PostTemplates = (props) => {
  return (
    <Fragment>
      <Header />
      <Outlet />
      <Footer/>
    </Fragment>
  );
};
export default PostTemplates;
