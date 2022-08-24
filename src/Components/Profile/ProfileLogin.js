import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserProfileData } from "../../ReduxStateManagement/actions/Action";
import newsimg from "../../images/newsimg.jpg";
import EditIcon from "@mui/icons-material/Edit";
import { DescriptionTable } from "./Description/DescriptionTable";
import { EducationTable } from "./Education/EducationTable";
import { RoleExceptionTable } from "./RoleException/RoleExceptionTable";
import { ScholarshipTable } from "./Schlarship/ScholarshipTable";
import { TypeOfJobtable } from "./TypeOfJob/TypeOfJobtable";
import { LanguageTable } from "./Language/LanguageTable";
import { InterestedTable } from "./Interested/InterestedTable";
import { SkillTable } from "./Skills/SkillTable";
import { IndustryTable } from "./IndustryField/IndustryTable";
import {CompanyLocationTable} from "./Company/CompanyLocationTable"
import { ResumeTable } from "./Resume/ResumeTable";
import { ExpectedSalaryTable } from "./Salary/ExpectedSalaryTable";
import { ExperienceTable } from "./Experience/ExperienceTable";
export const ProfileLogin = () => {
  const dispatch = useDispatch();
  const LoginData = JSON.parse(localStorage.getItem("LoginData"));
  const ProfileData = async () => {
    const res = await axios
      .get(
        "https://develop.hipoz.com/api/userprofile?user_id=1097&status_enum_id=1"
      )
      .catch((error) => {
        alert(error);
      });
    dispatch(UserProfileData(res.data.data));
  };
  useEffect(() => {
    ProfileData();
  },[]);
  const style = {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "26vh",
    maxHeight: "26vh",
    borderRadius: "15%",
    backgroundColor: "#e3e1e147",
    border: "2px solid white",
  };
  
  return (
    <>
      <div style={{ zIndex: "1" }}>
        <img
          src="https://develop.hipoz.com/static/media/JOBpost.ad7fcdff.jpg"
          alt="logo"
        />
      </div>
      <div className="row">
        <div className="col-4 row">
          <div className="col-md-6"></div>
          <div className="col-md-6">
            <div className=" card" style={style}>
              <img
                style={{
                  borderRadius: "50%",
                  width: "40%",
                  position: "absolute",
                  top: "-20%",
                  borderRadius: "50%",
                  width: "40%",
                }}
                src={newsimg}
                alt="logo"
              />
              <div className="w-75">
                <EditIcon style={{ float: "right" }} />
              </div>
              <div>
                <div>
                  {/* {profiledata[0].user_name} */}
                  Samardip XYZ
                </div>
              </div>
              <div>Talentpool Member</div>
            </div>
            <div className="my-4" style={style}>
              <div>About</div>
              <div>Jobs</div>
              <div>Jobs you have applied for....</div>
            </div>
          </div>
        </div>
        <div className="col-4">
          <DescriptionTable />
          <div className="mt-3">
            <EducationTable />
          </div>
          {/* <div className="mt-3">
            <RoleExceptionTable />
          </div> */}
          <div className="mt-3">
            <ScholarshipTable />
          </div>
          <div className="mt-3">
            <TypeOfJobtable />
          </div>
          <div className="mt-3">
            <LanguageTable />
          </div>
          <div className="mt-3">
            <InterestedTable />
          </div>
          <div className="mt-3">
            <SkillTable />
          </div>
          <div className="mt-3">
            <IndustryTable />
          </div>
          <div className="mt-3">
            <CompanyLocationTable />
          </div>
          <div className="mt-3">
            <ExperienceTable />
          </div>
          <div className="mt-3">
            <ExpectedSalaryTable />
          </div>
          <div className="mt-3">
            <ResumeTable />
          </div>
        </div>
        <div className="col-4">
          <div className="my-4 row">
            <div className="col-md-6">
              <div
                className="h5"
                style={{
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                  height: "26vh",
                  maxHeight: "26vh",
                  borderRadius: "15%",
                  backgroundColor: "#e3e1e147",
                  border: "2px solid white",
                }}
              >
                You may like {'-->'}
              </div>
            </div>
            <div className="col-md-6"></div>
          </div>
        </div>
      </div>
    </>
  );
};
