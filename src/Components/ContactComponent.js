import React from "react";
import { HotelContactDetails } from "./HotelContactDetails";
import { Buttons } from "./UI/Buttons";
import { InputNumbers } from "./UI/InputNumbers";

export const ContactComponent = () => {
  const ContactCSS = {
    style1: { display: "" },
    style2: { width: "", "textAlign": "" },
  };
  const input1 = {
    style: "border border-dark",
    type: "text",
    placeholder: "Name",
    name: "Name",
    require: "required",
  };
  const input2 = {
    style: "border border-dark",
    type: "email",
    placeholder: "Email",
    name: "Email",
    require: "required",
  };
  const input3 = {
    style: "border border-dark",
    type: "text",
    placeholder: "Message",
    name: "Message",
    require: "required",
  };
  const style={
    "width": "100%",
    "padding": "12px",
    "borderRadius": "6px",
  }
  const Bprops = {
    buttonStyle: "btn btn-dark",
    divStyle: "d-flex col-example",
    name: "SEND MESSAGE",
  };
  return (
    <>
    <div>
      <h1 className="display-4 mb-3 p-2">Contact</h1>
      <div className="display-6 mb-3 p-2">
        If you have any questions, do not hesitate to ask them.
      </div>
      <div className="mb-3 p-2">
        <HotelContactDetails styles={ContactCSS} />
      </div>
      <div className="mb-3 pl-3 mr-3"><InputNumbers inputNumber={input1} stylesheet={style}/></div>
      <div className="mb-3 pl-3 mr-3"><InputNumbers inputNumber={input2} stylesheet={style}/></div>
      <div className="mb-3 pl-3 mr-3"><InputNumbers inputNumber={input3} stylesheet={style}/></div>  
      <div className="mb-3 pl-3 mr-3"><Buttons button={Bprops} icon={null}/></div>
    </div>
    </>
  );
};
