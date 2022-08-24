import React from "react";
import { ContactComponent } from "../../Components/ContactComponent";
import { Footer } from "../../Components/Footer";


export const Contact = () => {
  return(
    <>
      <ContactComponent />
      <div className="mt-4">
      <Footer />
      </div>
    </>
  );
};
