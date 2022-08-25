import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import {
  setResumeName,
  UserProfileData,
} from "../../../ReduxStateManagement/actions/Action";
import axios from "axios";
import { ResumeModalBox } from "./ResumeModalBox";

export const ResumeTable = () => {
  const [isDesc, setIsDesc] = useState(false);
  const Resume = useSelector((state) => state.UpdateDatas.Resumedetail);
  const profiledata = useSelector((state) => state.ProfileData);
  const [resumeState, setresumeState] = useState(0);
  const [FilePath, setFilePath] = useState(null);
  const dispatch = useDispatch();
  // const profileJob = async () => {
  //   const res = await axios
  //     .get(
  //       "https://develop.hipoz.com/api/userprofile?user_id=1097&status_enum_id=1"
  //     )
  //     .catch((error) => {
  //       alert(error);
  //     });
  //   dispatch(UserProfileData(res.data.data));
  //   const obj = {
  //     resume_file_name: res.data.data[0].resume_file_name,
  //     resume_file_unique_name: res.data.data[0].resume_file_unique_name,
  //     resume_file_path: res.data.data[0].resume_file_path,
  //   };
  //   dispatch(setResumeName([obj]));
  // };
  // useEffect(() => {
  //   profileJob();
  // }, []);
  
  return (
    <>
      <table
        style={{
          width: "100%",
          backgroundColor: "#e3e1e147",
          height: "30vh",
          borderRadius: "8%",
        }}
      >
        <thead>
          <th>
            <div
              className="row"
              style={{
                border: "2px solid white",
                height: "179%",
                zIndex: "999",
              }}
            >
              <div className="col-10 h2">Resume</div>
              <div className="col-2 d-flex justify-content-center align-items-center">
                <EditIcon
                  onClick={() => {
                    setIsDesc(true);
                  }}
                  style={{ float: "right" }}
                />
                <ResumeModalBox
                  open={isDesc}
                  onClose={() => {
                    setIsDesc(false);
                    setFilePath(null);
                  }}
                  setresumeState={setresumeState}
                  FilePath={FilePath}
                  setFilePath={setFilePath}
                ></ResumeModalBox>
              </div>
            </div>
          </th>
        </thead>
        <tbody className="mx-2">
          <tr>
            {Resume.length === 0 ? (
              <>
                <td
                  className="d-flex justify-content-center align-items-center mx-5"
                  style={{ height: "50vh" }}
                >
                  Add Your Resume
                </td>
              </>
            ) : (
              <td className="p-4" style={{}}>
                {resumeState === 0 ? (
                  <>
                    <div
                      className="mb-2 row"
                      style={{
                        border: "2px solid #80808063",
                        borderRadius: "20px",
                      }}
                    >
                      <div className="col-10">
                        {profiledata[0].resume_file_name}
                      </div>
                      <div className="col-2">
                        <a href={profiledata[0].resume_file_path}>
                          <CloudDownloadIcon />
                        </a>
                      </div>
                    </div>
                    
                  </>
                ) : (
                  <>
                    <div
                      className="mb-2 row"
                      style={{
                        border: "2px solid #80808063",
                        borderRadius: "20px",
                      }}
                    >
                      <div className="col-10">{Resume[0].resume_file_name}</div>
                      <div className="col-2">
                        <a href={Resume[0].resume_file_path}>
                          <CloudDownloadIcon />
                        </a>
                      </div>
                    </div>
                    
                  </>
                )}
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </>
  );
};
