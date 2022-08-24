import React from "react";
import HotelIcon from "@mui/icons-material/Hotel";
import { CheckInANDout } from "./CheckInANDout";
import { AdultKidsnumber } from "./AdultKidsnumber";
import { Buttons } from "./UI/Buttons";
import SearchIcon from "@mui/icons-material/Search";
export const SearchForm = () => {
  const input1 = {
    style: "border border-dark",
    type: "text",
    placeholder: "DD/MM/YYYY",
    name: "checkInDate",
    require: "required",
  };
  const input2 = {
    style: "border border-dark",
    type: "text",
    placeholder: "DD/MM/YYYY",
    name: "checkOutDate",
    require: "required",
  };
  const input3 = {
    style: "border border-dark",
    type: "number",
    placeholder: "0",
    name: "noOfAdults",
    require: "required",
  };
  const input4 = {
    style: "border border-dark",
    type: "number",
    placeholder: "0",
    name: "noOfKids",
    require: "required",
  };
  const Cn1 = {
    name: "Check In",
    style: "d-flex p-2 col-example",
  };
  const Cn2 = {
    name: "Check Out",
    style: "d-flex p-2 col-example",
  };
  const Cn3 = {
    name: "Adults",
    style: "d-flex p-2 col-example ",
  };
  const Cn4 = {
    name: "Kids",
    style: "d-flex p-2 col-example",
  };
  const Bprops = {
    buttonStyle: "btn btn-primary",
    divStyle: "d-flex col-example",
    name: "search availability",
  };
  return (
    <>
      <div style={{ width: "20%vw", marginLeft: "10px" }}>
        <div className="d-flex p-2 col-example border border-dark bg-danger">
          <div>
            <h1 className="display-6">
              <HotelIcon />
            </h1>
          </div>
          <h1 className="mx-4 display-6">Hotel Transylvania</h1>
        </div>
        <div className="border border-dark my-1 bg-light">
          <div className="row mb-2">
            <div className="col-5 mx-4">
              <CheckInANDout inputNumber={input1}  stylesheet={""} ComponentNames={Cn1} />
            </div>
            <div className="col-5">
              <CheckInANDout inputNumber={input2}  stylesheet={""} ComponentNames={Cn2} />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-5 mx-4">
              <AdultKidsnumber inputNumber={input3} stylesheet={""} ComponentNames={Cn3} />
            </div>
            <div className="col-5">
              <AdultKidsnumber inputNumber={input4} stylesheet={""} ComponentNames={Cn4} />
            </div>
          </div>
          <div className="mb-4 mx-4">
            <Buttons button={Bprops} icon={SearchIcon} />
          </div>
        </div>
      </div>
    </>
  );
};
