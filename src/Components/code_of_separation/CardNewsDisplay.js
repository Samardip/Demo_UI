import React from "react";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import newsimg from "../../images/newsimg.jpg";
import { useSelector } from "react-redux";
export const CardNewsDisplay = () => {
  const SData = useSelector((state) => state.ScrollDetails.Scrolldata);
  console.log(SData);
  return (
    <>
      {SData.map((sd, i) => {
        return (
          <div
            key={i}
            className="my-5 card p-4"
            style={{ "border-radius": "13px" }}
          >
            <div className="row mb-3 d-flex">
              <div className="col-md-2">
                <img style={{ borderRadius: "50%" }} src={newsimg} alt="logo" />
              </div>
              <div className="col-md-7 d-flex flex-column">
                <div className="h5">{sd.news_title}</div>
                <div className="h6">{sd.creation_time}</div>
              </div>

              <div className="col-md-3 d-flex float-right">
                <div className="mx-2">
                  <TurnedInNotIcon />
                </div>
                <div className="mx-2">
                  <ShareIcon />
                </div>
                <div className="mx-2">
                  <MoreVertIcon />
                </div>
              </div>
            </div>
            <div>
              <div className="my-4">
                {sd.news_short_description.substring(0, 120)}
                <span>{" ..."}</span>
              </div>

              <div className="mb-3">
                <img
                  style={{ borderRadius: "25px", width: "100%" }}
                  src={sd.news_image_signed_url}
                  alt="img"
                />
              </div>

              <div
                className="floatRight mb-2"
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row-reverse",
                }}
              >
                <a
                  style={{ borderRadius: "12px" }}
                  className="btn-sm btn-primary"
                  href={sd.news_url}
                  target="_blank"
                >
                  Apply now
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
