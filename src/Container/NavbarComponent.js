import React from "react";
import { Navbar } from "../Components/NavigationPage/Navbar";
import { RoutePages } from "../Components/RoutePages";
import {BrowserRouter as Router} from 'react-router-dom'
export const NavbarComponent = () => {
  return (
    <>
      <Router>
        <Navbar />
        <RoutePages />
      </Router>
    </>
  );
};