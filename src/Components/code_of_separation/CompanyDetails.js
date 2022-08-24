import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import newsimg from "../../images/newsimg.jpg";
import {
  DisplayFavorites,
  FollowedNews,
  NewsLike,
} from "../../ReduxStateManagement/actions/Action";
export const CompanyDetails = () => {
  const dispatch = useDispatch();
  const [likeState, setLikeState] = useState([{}]);
  const [deleteState, setDeleteState] = useState(1);

  const FollowNews = useSelector(
    (state) => state.ScrollDetails.FollowedNewsData
  );
  const LikeNews = useSelector((state) => state.ScrollDetails.LikeNewsData);
  //dispatch(FollowedNews(LikeNews));
  const logindata = JSON.parse(localStorage.getItem("LoginData"));
  const followdata=()=>{
    dispatch(DisplayFavorites(JSON.parse(localStorage.getItem("DisplayFavorites"))));
    // dispatch(FollowedNews(JSON.parse(localStorage.getItem("FollowNews"))));
  }
  // const followdata1=()=>{
  //   // dispatch(DisplayFavorites(JSON.parse(localStorage.getItem("DisplayFavorites"))));
  //   dispatch(FollowedNews(JSON.parse(localStorage.getItem("FollowNews"))));
  // }
  useEffect(() => {
    followdata();
    // followdata1();
  },[])
  const AddFavorites = (i, company_id) => {
    // console.log(i);

   
    const Fdata = {
      user_follow_id: 0,
      user_id: logindata.admin_id,
      following_id: company_id,
      follow_status_enum_id: logindata.status_enum_id,
      actionby_id: logindata.role_enum_id,
    };
    axios
      .post(
        "https://develop.hipoz.com/api/studentfollowandunfollowcompany",
        Fdata
      )
      .then((response) => {
        if (response.status !== "SUCCESS") {
          console.log("success");
          localStorage.setItem("DisplayFavorites",JSON.stringify(likeState));
  localStorage.setItem("FollowNews",JSON.stringify(FollowNews));
        }
       
      })
      .catch((error) => {
        alert(error);
      });

      const data = {
        company_logo_unique_path: (FollowNews.length === 0
          ? LikeNews
          : FollowNews)[i].company_logo_unique_path,
        company_name: (FollowNews.length === 0 ? LikeNews : FollowNews)[i]
          .company_name,
        country_name: (FollowNews.length === 0 ? LikeNews : FollowNews)[i]
          .country_name,
      };
      setLikeState([...likeState, data]);
      LikeNews.splice(i, 1);
      const state1 = (
        FollowNews.length === 0 ? LikeNews : FollowNews
      ).filter((l, i1) => {
        return i1 !== i;
      });
      dispatch(FollowedNews(state1));

      // dispatch(FollowedNews(LikeNews))
      // console.log(state1);
      if (state1.length === 0) {
        setDeleteState(deleteState + 1);
      }

  };
  // console.log(likeState);
  // if(deleteState===null){
  //     dispatch(NewsLike(LikeNews));
  // }
  // else
  // dispatch(NewsLike(deleteState));
  // console.log(LikeNews);
  dispatch(DisplayFavorites(likeState));
  
  return (
    <div style={{ "overflow-y": "scroll" }}>
      {deleteState === 2
        ? "You have followed all Companies"
        : (FollowNews.length === 0 ? LikeNews : FollowNews).map((ln, i) => {
            return (
              <>
                <div className="row my-2" key={i}>
                  <div className="col-md-3" style={{ width: "20%" }}>
                    <img
                      className="img-fluid"
                      style={{ borderRadius: "14px" }}
                      src={
                        ln.company_logo_unique_path === null
                          ? newsimg
                          : ln.company_logo_unique_path
                      }
                      alt="logo"
                    />
                  </div>

                  <div className="row col-md-9">
                    <div className="col-md-9">
                      <div className="d-flex flex-column mb-2">
                        <div>{ln.company_name}</div>
                        <div>{ln.country_name}</div>
                      </div>
                    </div>
                    <div className="col-md-3 " style={{}}>
                      <button
                        className="btn btn-sm btn-primary"
                        style={{ borderRadius: "14px", float: "right" }}
                        onClick={() => {
                          AddFavorites(i, ln.company_id);
                        }}
                      >
                        Follow
                      </button>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
    </div>
  );
};
