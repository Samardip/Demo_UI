import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import newsimg from "../../images/newsimg.jpg";
import { DisplayFavorites, FollowedNews, NewsLike } from "../../ReduxStateManagement/actions/Action";
import { CompanyDetails } from "./CompanyDetails";
export const YouMayLike = () => {
    const dispatch = useDispatch();
    const LikeNews = useSelector(state => state.ScrollDetails.LikeNewsData )
  //   const followdata=()=>{
  //   dispatch(DisplayFavorites(JSON.parse(localStorage.getItem("DisplayFavorites"))));
  //   // dispatch(FollowedNews(JSON.parse(localStorage.getItem("FollowNews"))));
  // }
  // // const followdata1=()=>{
  // //   // dispatch(DisplayFavorites(JSON.parse(localStorage.getItem("DisplayFavorites"))));
  // //   dispatch(FollowedNews(JSON.parse(localStorage.getItem("FollowNews"))));
  // // }
  // useEffect(() => {
  //   followdata();
  // })
    const Newslike=async()=>{
        const logindata=JSON.parse(localStorage.getItem("LoginData"));
        // console.log(logindata.admin_id);
        const res=await axios.get("https://develop.hipoz.com/api/getcompany?company_id=0&user_id=1001")
        //+logindata?.admin_id)
        // +logindata.admin_id)
        // +logindata.admin_id)
        .catch((error)=>{
            console.log(error);
        })
        dispatch(NewsLike(res.data.data));
    }

    useEffect(() => {
        Newslike();
    },[])
  //  dispatch(FollowedNews(LikeNews));
  return (
      
    <>
                <div className="row" >
        <div className="col-md-8 card my-4" style={{ borderRadius: "10px",height:"450px" }}>
          <div className="page-header h3">You May Like</div>
          <CompanyDetails />
      </div>
        <div className="col-md-4"></div>
      </div>
    </>
  );
};



// https://develop.hipoz.com/api/getcompany?company_id=0&user_id=1001