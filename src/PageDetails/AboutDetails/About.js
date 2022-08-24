import React from "react";
import "./About.css";
import { AboutComponent } from '../../Components/AboutComponent'
import { Footer } from "../../Components/Footer";
export const About = () => {
   return(
     <>
       <AboutComponent />
       <div className="mt-4">
      <Footer />
      </div>
    </>
  );
};
