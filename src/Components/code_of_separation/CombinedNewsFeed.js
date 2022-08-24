import React from "react";
import { Faviorates } from "./Faviorates";
import { Banner } from "./ScrollNews/Banner";
import { ScrollNewsDisplay } from "./ScrollNews/ScrollNewsDisplay";
import { YouMayLike } from "./YouMayLike";

export const CombinedNewsFeed = () => {
  const style={
    "position": "fixed",
    "right": "0px",
    "width": "33%",
    "marginRight": "0p%"}
    const style1={
      "position": "fixed",
      left: "0px",
      width: "37%",
      marginLeft: "-7%"}
  return (
    <div className="row">
      <div className="col-4 row">
      <div className="" >
          <Faviorates />
      </div>
      </div>
      
      <div className="col-4">
        <div>
          <div className="my-4">
            <Banner />
          </div>
          <div className="my-4">
            <ScrollNewsDisplay />
          </div>
        </div>
      </div>
      <div className="col-4">
        <YouMayLike />
      </div>
    </div>
  );
};
