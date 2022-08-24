import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BannerData } from "../../../ReduxStateManagement/actions/Action";

export const Banner = () => {
  const dispatch = useDispatch();
  const bannerData = async () => {
    const bannerDisplay = await axios
      .get(
        "https://develop.hipoz.com/api/getbanners?banner_id=0&role_enum_id=149&status_enum_id=1"
      )
      .catch((error) => {
        alert(error);
      });
    dispatch(BannerData(bannerDisplay.data.data));
    //console.log(bannerDisplay.data.data);
  };
  useEffect(() => {
    bannerData();
  },[]);
  const bannerdetails = useSelector((state) => state.BDetails.Bannerdata);
  // console.log(bannerdetails);
  // const url=bannerdetails[0].banner_url;
  return (
    <>
      <div className="d-flex justify-content-center">
        {" "}
        {bannerdetails.map((bannerdetails,i) => {
          // console.log(bannerdetails.banner_url);
          return (
            <img key={i}
              className="card-img-top"
              style={{ borderRadius: "25px" }}
              src={bannerdetails.banner_unique_singedurl_name}
              alt="logo"
            />
          );
        })}
      </div>
    </>
  );
};
