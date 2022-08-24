import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import axios from "axios";
import {
  setResumeName,
  UserProfileData,
} from "../../../ReduxStateManagement/actions/Action";
import { useDispatch } from "react-redux";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Worker } from "@react-pdf-viewer/core";
export const ResumeDialogBox = ({ onClose, setresumeState,FilePath,setFilePath}) => {
  const [filename, setFilename] = useState("");
  const [uniqueFilePath, setUniqueFilePath] = useState("");
  const [copy, setcopy] = useState([]);
  const dispatch = useDispatch();
  console.log(filename);
  let obj = [];
  const profileJob = async () => {
    const res = await axios
      .get(
        "https://develop.hipoz.com/api/userprofile?user_id=1097&status_enum_id=1"
      )
      .catch((error) => {
        alert(error);
      });
    dispatch(UserProfileData(res.data.data));
    const obj = {
      resume_file_name: res.data.data[0].resume_file_name,
      resume_file_unique_name: res.data.data[0].resume_file_unique_name,
      resume_file_path: res.data.data[0].resume_file_path,
    };
    dispatch(setResumeName([obj]));
  };
  const getfile = (file) => {
    console.log(file);
    let reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (e) => {
    // console.log(e.target.result);
    setFilePath(e.target.result)
    const formData = new FormData();
    formData.append("file", file[0]);
    fileUploading(formData)
      .then((res) => {
        setFilename(res.data.data[0].file_name);
        setUniqueFilePath(res.data.data[0].unique_file_name);
        obj = {
          resume_file_name: res.data.data[0].file_name,
          resume_file_unique_name: res.data.data[0].unique_file_name,
          resume_file_path: "",
        };
        setcopy([obj]);
      })
      .catch((error) => {
        console.log(error);
      });
    };
  };
  const fileUploading = (param) => {
    return new Promise((resolve, reject) => {
      axios
        .post("https://develop.hipoz.com/api/fileupload", param, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log("Res from resume uploading", res);
          // dispatch({
          //   type: FILE_UPLOADING,
          //   payload: res
          // });
          resolve(res);
        })
        .catch((err) => {
          console.log("Error from file uploading", err);
          reject(err);
        });
    });
  }; //end of fileUploading
  console.log(copy);
  const saveResume = () => {
    setresumeState(1);
    setFilePath(null);
    dispatch(setResumeName(copy));
    const postResumeObj = {
      upload_resume_file_path: uniqueFilePath,
      resume_file_name: filename,
      actionby_id: 1097,
      user_id: 1097,
    };
    axios
      .post("https://develop.hipoz.com/api/updateresume", postResumeObj)
      .then((response) => {
        if (response.data.statuscode === 200) {
          profileJob();
        }
      })
      .catch((error) => {
        console.log(error);
      });
    onClose();
  };
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <>
      <div
        className="rounded"
        style={{
          backgroundColor: "#1f1f1f1a",
          height: (FilePath===null)?"30vh":"70vh",
          margin: "15%",
          top: "-11%",
          left: "0",
          right: "0",
          bottom: "0",
          position: "fixed",
          overflowY:"scroll",
        }}
      >
        <div className="">
          <div className="float-right">
            <button onClick={(e) => saveResume()}>
              <DoneIcon />
            </button>
            <button className="mx-2" onClick={onClose}>
              <CloseIcon />
            </button>
          </div>
          <div className="px-4" style={{ paddingTop: "5%" }}>
            <form>
              <table style={{ width: "100%" }}>
                <tbody>
                  <tr>
                    <td
                      style={{
                        backgroundColor: "white",
                        height: "56px",
                        paddingLeft: "23px",
                      }}
                    >
                      <input
                        type="file"
                        name="file"
                        style={{ width: "48%", backgroundColor: "white" }}
                        accept="application/pdf,application/vnd.ms-excel"
                        onChange={(e) => {getfile(e.target.files)
                          
                        }}
                      />
                      
                    </td>
                  </tr>
                  <tr>
                    <td>
                    <div className="pdf-container my-3">
                      {FilePath && (
                        <>
                          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                            <Viewer
                              fileUrl={FilePath}
                              plugins={[defaultLayoutPluginInstance]}
                            />
                          </Worker>
                        </>
                      )}
                    </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
