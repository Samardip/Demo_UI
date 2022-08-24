import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { JobType, setInterestOptions, setInterestState, UserProfileData } from "../../../ReduxStateManagement/actions/Action";
import axios from "axios";
import { ModalInterested } from "./ModalInterested";
export const InterestedTable = () => {
  const [isDesc, setIsDesc] = useState(false);
  const profiledata = useSelector((state) => state.ProfileData);
  const Istate = useSelector(state => state.UpdateDatas.IState)
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
  const obj4=res.data.data[0].interested_work===null?null:res.data.data[0].interested_work.map((j)=>{
    return j.interested_Work_name;
  })
  if(obj4!==null)
    dispatch(setInterestState(obj4));
  }

  const options=async ()=>{
    const res=await axios.get("https://develop.hipoz.com/api/getintresetedworkin?interested_work_in_id=0&status_enum_id=1")
    .catch((error)=>{
      alert(error);
    })
    dispatch(setInterestOptions(res.data.data));
  }
  useEffect(() => {
    profileJob();
  }, []);
  useEffect(() => {
    options();
  }, []);
  
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
              <div className="col-10 h2">Interest</div>
              <div className="col-2 d-flex justify-content-center align-items-center">
                <EditIcon
                  onClick={() => {
                    setIsDesc(true);
                  }}
                  style={{ float: "right" }}
                />
                <ModalInterested
                  open={isDesc}
                  onClose={() => {
                    setIsDesc(false);
                  }}
                ></ModalInterested>
              </div>
            </div>
          </th>
        </thead>
        <tbody className="mx-2">
          <tr>
            {Istate.length===0 ? (
              <>
                <td
                  className="d-flex justify-content-center align-items-center mx-5"
                  style={{ height: "50vh" }}
                >
                  Add your Interests
                </td>
              </>
            ) : (
              <td className="p-4" style={{}}>
                {Istate.map((j)=>{
                  return <div className="mb-2" style={{border: "2px solid #80808063",borderRadius: "20px"}}>{j}</div>;
                })}
             
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </>
  );
};