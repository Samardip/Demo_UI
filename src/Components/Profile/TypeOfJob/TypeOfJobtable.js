import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { JobType, UserProfileData } from "../../../ReduxStateManagement/actions/Action";
import axios from "axios";
import { TypeOfJobModal } from "./TypeOfJobModal";
export const TypeOfJobtable = () => {
  const [isDesc, setIsDesc] = useState(false);
  const profiledata = useSelector((state) => state.ProfileData);
  const jobtype = useSelector(state => state.UpdateDatas.Typeofjob)
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
  // const obj4=res.data.data[0].job_type_name.map((j)=>{
  //   return j.job_type_name;
  // })
  // dispatch(JobType(obj4));
  // }
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
              <div className="col-10 h2">Type Of Job</div>
              <div className="col-2 d-flex justify-content-center align-items-center">
                <EditIcon
                  onClick={() => {
                    setIsDesc(true);
                  }}
                  style={{ float: "right" }}
                />
                <TypeOfJobModal
                  open={isDesc}
                  onClose={() => {
                    setIsDesc(false);
                  }}
                ></TypeOfJobModal>
              </div>
            </div>
          </th>
        </thead>
        <tbody className="mx-2">
          <tr>
            {jobtype.length=== 0 ? (
              <>
                <td
                  className="d-flex justify-content-center align-items-center mx-5"
                  style={{ height: "50vh" }}
                >
                  Add your preffered type of job
                </td>
              </>
            ) : (
              <td className="p-4" style={{}}>
                {jobtype.map((j)=>{
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
