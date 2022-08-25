import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { JobType, setIndustryFieldOptions, setIndustryFieldState, setInterestOptions, setInterestState, UserProfileData } from "../../../ReduxStateManagement/actions/Action";
import axios from "axios";
import { IndustryModal } from "./IndustryModal";
export const IndustryTable = () => {
  const [isDesc, setIsDesc] = useState(false);
  const profiledata = useSelector((state) => state.ProfileData);
  const IndustryField = useSelector(state => state.UpdateDatas.IndustryState)
  const dispatch = useDispatch();
  // const profileJob=async () => {
  //   const res =await axios
  //   .get(
  //     "https://develop.hipoz.com/api/userprofile?user_id=1097&status_enum_id=1"
  //   )
  //   .catch((error) => {
  //     alert(error);
  //   });
  // dispatch(UserProfileData(res.data.data));
  // const obj4=res.data.data[0].industry_field===null?null:res.data.data[0].industry_field.map((j)=>{
  //   return j.industry_filed_name;
  // })
  // if(obj4!==null)
  //   dispatch(setIndustryFieldState(obj4));
  // }

  const options=async ()=>{
    const res=await axios.get("https://develop.hipoz.com/api/getindustryfield?industry_field_id=0&status_enum_id=1")
    .catch((error)=>{
      alert(error);
    })
    dispatch(setIndustryFieldOptions(res.data.data));
  }
  // useEffect(() => {
  //   profileJob();
  // }, []);
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
              <div className="col-10 h2">Industry Field</div>
              <div className="col-2 d-flex justify-content-center align-items-center">
                <EditIcon
                  onClick={() => {
                    setIsDesc(true);
                  }}
                  style={{ float: "right" }}
                />
                <IndustryModal
                  open={isDesc}
                  onClose={() => {
                    setIsDesc(false);
                  }}
                ></IndustryModal>
              </div>
            </div>
          </th>
        </thead>
        <tbody className="mx-2">
          <tr>
            {IndustryField.length===0 ? (
              <>
                <td
                  className="d-flex justify-content-center align-items-center mx-5"
                  style={{ height: "50vh" }}
                >
                  Add Industry Fields
                </td>
              </>
            ) : (
              <td className="p-4" style={{}}>
                {IndustryField.map((j)=>{
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