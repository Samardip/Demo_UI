import React from "react";
import "../PageDetails/AboutDetails/About.css";
import CloudDownloadRoundedIcon from "@mui/icons-material/CloudDownloadRounded";
import cinque from '../images/cinqueterre.jpg'
import newyork from '../images/newyork2.jpg'
import paris from '../images/paris.jpg'
import pisa from '../images/pisa.jpg'
import sanfran from '../images/sanfran.jpg'
import { HotelContactDetails } from "../Components/HotelContactDetails";
export const AboutComponent = () => {
    const ContactCSS={style1:{"display":"flex"},
        style2:{"display":"flex",
            "width": "33vw",
        "textAlign": "center",
        "justifyContent": "center"}
    }
  return (
    <>
      <div>
        <span className="display-6">Our</span> hotel is one of a kind. It is truely amazing. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum
        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam.
      </div>
      <div className="background1"></div>
           <HotelContactDetails styles={ContactCSS} />
      <div className="my-2 mx-2 bg-danger ratio">
        <div className="d-flex center">
          <div>
            <CloudDownloadRoundedIcon />
          </div>
          <div className="mx-2">
            On demand, we can offer playstation, babycall, children care, dog
            equipment, etc.
          </div>
        </div>
      </div>
      <div >
        <h1 className="m-3 display-2">Our Hotels</h1>
        <div className="m-3 display-6">Yo can find our hotels anywhere in the world:</div>
        <div className="d-flex m-1 row">
          <div className="col-6 ">
            <img src={cinque} alt="img" />
          </div>
          <div className="col-6">
              <div className="row">
              <div className="col-6"><img src={newyork} alt="img" /></div>
              <div className="col-6 mb-1"><img src={paris} alt="img" /></div>
              <div className="mt-3 col-6"><img src={pisa} alt="img" /></div>
              <div className="mt-3 col-6"> <img src={sanfran} alt="img" /></div>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};
