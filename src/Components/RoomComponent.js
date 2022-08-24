import React from "react";
import { CheckInANDout } from "./CheckInANDout";
import { Buttons } from "./UI/Buttons";
import SearchIcon from "@mui/icons-material/Search";
import { AdultKidsnumber } from "./AdultKidsnumber";
import { ChooseRoom } from "./RoomCard/ChooseRoom";
export const RoomComponent = () => {
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
        buttonStyle: "btn btn-primary w-75",
        divStyle: "d-flex col-example justify-content-center",
        name: "Search",
      };
  return (
    <>
      <div>
        <div className="mb-3 display-6">
          Make yourself at home is our slogan. We offer the best beds in the
          industry. Sleep well and rest well.
        </div>
        <div className="mb-3">
          <div className="row">
            <div className="mx-2 col-sm"><CheckInANDout inputNumber={input1} ComponentNames={Cn1} /></div>
            <div className="col-sm"><CheckInANDout inputNumber={input2} ComponentNames={Cn2} /></div>
            <div className="col-sm"><AdultKidsnumber inputNumber={input3} ComponentNames={Cn3} /></div>
            <div className="mx-2 col-sm"><AdultKidsnumber inputNumber={input4} ComponentNames={Cn4} /></div>
            <div className="col-sm">
              <div className="d-flex">
                 <div>
                    <SearchIcon />
                 </div>
                 <div>
                    Search
                 </div>
              </div>
              <div>
                <Buttons button={Bprops} icon={null} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChooseRoom />
      
    </>
  );
};
