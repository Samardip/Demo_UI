import React from "react";
import { useSelector } from "react-redux";
import newsimg from "../../images/newsimg.jpg";
export const Faviorates = () => {
  const likeState = useSelector(
    (state) => state.ScrollDetails.DisplayFavorites
  );
  return (
    <>
      <div className="row" >
        <div className="col-md-6"></div>
        <div className="col-md-6 card my-4" style={{ borderRadius: "10px" ,height:"500px","overflowY":"scroll"}}>
          <div className="page-header h3">Your Favorites</div>
         { (likeState.length===1)?"No Follows yet":
          likeState.map((ls,i) => {
            return (
              <>{i!==0?
                <div className="d-flex my-2" key={i}>
                  <div className="" style={{ width: "20%" }}>
                    <img
                      style={{ borderRadius: "14px" }}
                      src={(ls.company_logo_unique_path===null)?newsimg:ls.company_logo_unique_path}
                      alt="logo"
                    />
                  </div>
                  <div className="d-flex flex-column mx-2 mb-2">
                    <div>{ls.company_name}</div>
                    <div>{ls.country_name}</div>
                  </div>
                </div>:null
          }
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};
