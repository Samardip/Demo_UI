import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { useDispatch, useSelector } from "react-redux";
import { TrueFalseState, UpdateDesc, UserProfileData } from "../../ReduxStateManagement/actions/Action";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
export const DialogRoleExceptionBox = ({ onClose }) => {
  const trueFalseStatechange=useSelector((state)=>state.DecideState)
  const Description = useSelector((state) => state.UpdateDatas.Description);
  const profiledata = useSelector((state) => state.ProfileData);
  const [updatedDesc, setUpdatedDesc] = useState((trueFalseStatechange!==0)?Description:profiledata[0].description);
  const dispatch = useDispatch();
  const profileDesc=async () => {
    const res =await axios
    .get(
      "https://develop.hipoz.com/api/userprofile?user_id=1097&status_enum_id=1"
    )
    .catch((error) => {
      alert(error);
    });
  dispatch(UserProfileData(res.data.data));
  }
  const UpdateDescription = (Desc) => {
    setUpdatedDesc(Desc);
    
  };
  const SaveUpdatedDesc = () => {
    dispatch(UpdateDesc(updatedDesc));
    
    const desc = {
      description: updatedDesc,
      actionby_id: 1097,
      user_id: 1097,
    };
    //console.log("hi");
    dispatch(TrueFalseState());
    axios
      .post("https://develop.hipoz.com/api/updatestudentdescription", desc)
      .then((response) => {
        if (response.statuscode === 200) {
          profileDesc();
          // setTrueDesc(true);
          
      }
      })
      .catch((error) => {
        alert(error);
      });

    onClose();
  };

  return (
    <>
      <div
        className="rounded"
        style={{
          backgroundColor: "#1f1f1f1a",
          height: "70vh",
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
              <table>
                <tbody>
                  <tr>
                    <td className="h1" style={{ color: "black" }}>
                      Enter Description
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <textarea
                        type="text"
                        className="rounded"
                        rows="14"
                        cols="135"
                        value={updatedDesc}
                        onChange={(e) => {
                          UpdateDescription(e.target.value);
                        }}
                      ></textarea>
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
