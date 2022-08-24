import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { useDispatch, useSelector } from "react-redux";
import { JobType, TrueFalseState, UpdateDesc, UserProfileData } from "../../ReduxStateManagement/actions/Action";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import AutoComplete from "./AutoComplete";
export const DialogTypeOfJobBox = ({ onClose }) => {
  const [data, setdata] =useState([]);
  const dispatch = useDispatch();
  const profileJob=async () => {
    const res =await axios
    .get(
      "https://develop.hipoz.com/api/userprofile?user_id=1097&status_enum_id=1"
    )
    .catch((error) => {
      alert(error);
    });
  dispatch(UserProfileData(res.data.data));
  }
 
  const SaveUpdatedDesc = () => {
    const obj3=data===undefined?[]:data.map((d)=>{
      return d.props.label;
    })
    dispatch(JobType(obj3));

    const postjobtype=data===undefined?[]:data.map((d)=>{
      if(d.props.label==="Intern"){
        return 31;
      }
      else if(d.props.label==="Part Time")
       return 33;
      else
        return 32
    })
    //console.log(postjobtype)
    const jobpost = {
      job_type_id: postjobtype,
      actionby_id: 1097,
      user_id: 1097,
    };
    //console.log("hi");
    // dispatch(TrueFalseState());
    axios
      .post("https://develop.hipoz.com/api/updatestudentjobtype", jobpost)
      .then((response) => {
        if (response.data.statuscode === 200) {
          profileJob();
          // setTrueDesc(true);
          
      }
      })
      .catch((error) => {
        alert(error);
      });

    onClose();
  };
  console.log(data);
  return (
    <>
      <div
        className="rounded"
        style={{
          backgroundColor: "#1f1f1f1a",
          height: "45vh",
          margin: "15%",
          top: "-11%", //-11%
          left: "0",
          right: "0",
          bottom: "0",
          position: "fixed",
        }}
      >
        <div className="">
          <div className="float-right">
            <button onClick={() => SaveUpdatedDesc()}>
              <DoneIcon />
            </button>
            <button className="mx-2" onClick={onClose}>
              <CloseIcon />
            </button>
          </div>
          <div className="px-4" style={{ paddingTop: "5%" }}>
            <form>
              <table style={{width:"100%"}}>
                <tbody>
                  <tr>
                    <td className="h1" style={{ color: "black" }}>
                      Enter Job Type
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <AutoComplete data={data} setdata={setdata}/>
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
