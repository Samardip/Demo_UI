import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import {setCompanyLocation, setLocationOptions, UserProfileData} from "../../../ReduxStateManagement/actions/Action";
import axios from "axios";
import { CompanyLocationModal } from "./CompanyLocationModal";
export const CompanyLocationTable = () => {
  const [isDesc, setIsDesc] = useState(false);
  const profiledata = useSelector((state) => state.ProfileData);
  const Company = useSelector(state => state.UpdateDatas.CompanyLocation)
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
  const obj4=res.data.data[0].pref_country_name===null?null:res.data.data[0].pref_country_name.map((j)=>{
    return j.country_name;
  })
  if(obj4!==null)
    dispatch(setCompanyLocation(obj4));
  }

  const options=async ()=>{
    const res=await axios.get("https://develop.hipoz.com/api/countrylist?country_id=0")
    .catch((error)=>{
      alert(error);
    })
    dispatch(setLocationOptions(res.data.data));
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
              <div className="col-10 h2">Company Location</div>
              <div className="col-2 d-flex justify-content-center align-items-center">
                <EditIcon
                  onClick={() => {
                    setIsDesc(true);
                  }}
                  style={{ float: "right" }}
                />
                <CompanyLocationModal
                  open={isDesc}
                  onClose={() => {
                    setIsDesc(false);
                  }}
                ></CompanyLocationModal>
              </div>
            </div>
          </th>
        </thead>
        <tbody className="mx-2">
          <tr>
            {Company.length===0 ? (
              <>
                <td
                  className="d-flex justify-content-center align-items-center mx-5"
                  style={{ height: "50vh" }}
                >
                  Add Company Location
                </td>
              </>
            ) : (
              <td className="p-4" style={{}}>
                {Company.map((j)=>{
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