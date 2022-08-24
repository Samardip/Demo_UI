import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Modal } from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { UserProfileData } from "../../../ReduxStateManagement/actions/Action";
import axios from "axios";
export const DescriptionTable = () => {
  const [isDesc, setIsDesc] = useState(false);
  const trueFalseStatechange=useSelector((state)=>state.DecideState)
  let Description = useSelector((state) => state.UpdateDatas.Description);
  const profiledata = useSelector((state) => state.ProfileData);
  const DescriptionData=(profiledata.length===0)?"":profiledata[0].description;
  const dispatch = useDispatch();
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
              <div className="col-10 h2">Description</div>
              <div className="col-2 d-flex justify-content-center align-items-center">
                <EditIcon
                  onClick={() => {
                    setIsDesc(true);
                  }}
                  style={{ float: "right" }}
                />
                <Modal
                  open={isDesc}
                  onClose={() => {
                    setIsDesc(false);
                  }}
                ></Modal>
              </div>
            </div>
          </th>
        </thead>
        <tbody className="mx-2">
          <tr>
            {((trueFalseStatechange!==0)?Description:DescriptionData) === "" ? (
              <>
                <td
                  className="d-flex justify-content-center align-items-center mx-5"
                  style={{ height: "50vh" }}
                >
                  Add a small Description about yourself
                </td>
              </>
            ) : (
              <td className="p-4" style={{}}>
                
              {
                (trueFalseStatechange!==0)?Description.substring(0, 400):DescriptionData.substring(0, 400)
              }
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </>
  );
};
