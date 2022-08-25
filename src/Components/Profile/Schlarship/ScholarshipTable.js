import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { ModalScholarship } from "./ModalScholarship";
import {
  ConditionData,
  ScholarshipData,
  ScholarshipOptions,
  UserScholarshipData,
} from "../../../ReduxStateManagement/actions/Action";
export const ScholarshipTable = () => {
  const [isDesc, setIsDesc] = useState(false);
  const dispatch = useDispatch();
  const Scholarship = useSelector((state) => state.UpdateDatas.scholarshipData);
  const userScholarship = useSelector(
    (state) => state.UpdateDatas.userScholarshipData
  );
  const [show, setShow] = useState([false]);
  const ScholarshipOptionValues = useSelector(
    (state) => state.UpdateDatas.ScholarshipOptions
  );
  const schoState = useSelector((state) => state.SchoState);
  const newScho = {
    user_schlorship_id: "",
    merit_schlorship_id: "",
    schlorship_type_id: "",
    schlorship_name: "",
    status_enum_id: "",
  };
  const ConditionYESNO=async ()=>{
    const res=await axios .get("https://develop.hipoz.com/api/getcondition?enum_id=0&enum_type_name=Condition")
    .catch((error)=>{
      alert(error)
    })
    dispatch(ConditionData(res.data.data));
  }
  // const fetchScholarshipData = async () => {
  //   const res = await axios
  //     .get("https://develop.hipoz.com/api/userschlorship?user_id=1097")
  //     .catch((error) => {
  //       alert(error);
  //     });
  //   dispatch(UserScholarshipData(res.data.data));
  //   let obj3 = [];
  //   res.data.data.map((res) => {
  //     const newScho1 = {
  //       user_schlorship_id: res.user_schlorship_id,
  //       merit_schlorship_id: res.merit_schlorship_id,
  //       schlorship_type_id: res.schlorship_type_id,
  //       schlorship_name: res.schlorship_name,
  //       status_enum_id: res.status_enum_id,
  //     };
  //     obj3 = [...obj3, newScho1];
  //   });
  //   let tfobj = [];
  //   for (var tf = 0; tf < res.data.data.length; tf++) {
  //     tfobj.push(false);
  //   }
  //   setShow(tfobj);
  //   dispatch(ScholarshipData(obj3));
  // };
  console.log(show);
  useEffect(() => {
    // fetchScholarshipData();
    ConditionYESNO();
  }, []);
  const ScholarshipOptionData = async () => {
    const res = await axios
      .get(
        "https://develop.hipoz.com/api/getSchloreship?schlorship_type_id=0&status_enum_id=1"
      )
      .catch((error) => {
        alert(error);
      });
    dispatch(ScholarshipOptions(res.data.data));
  };
  useEffect(() => {
    ScholarshipOptionData();
  }, []);
  // console.log(Scholarship)
  const deleteEducation = (index) => {
    const data = Scholarship.filter((s, i1) => {
      return i1 !== index;
    });
    dispatch(ScholarshipData(data));
    const postScho = {
      user_id: 1097,
      user_schlorship_json: data,
      actionby_id: 1097,
    };
    axios
      .post("https://develop.hipoz.com/api/updatestudentschlorship", postScho)
      .then((response) => {
        if (response.data.statuscode === 200) {
          // fetchScholarshipData();
        }
      })
      .catch((error) => {
        alert(error);
      });
  };
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
              <div className="col-10 h2">Scholarship</div>
              <div className="col-2 d-flex justify-content-center align-items-center">
                <EditIcon
                  onClick={() => {
                    setIsDesc(true);
                    dispatch(ScholarshipData([...Scholarship, newScho]));
                    setShow([...show, false]);
                  }}
                  style={{ float: "right" }}
                />
                <ModalScholarship
                  open={isDesc}
                  onClose={() => {
                    setIsDesc(false);
                    Scholarship.pop();
                  }}
                  show={show}
                  setShow={setShow}
                />
              </div>
            </div>
          </th>
        </thead>
        <tbody className="mx-2">
          <tr>
            {Scholarship.length === 0 ? (
              <>
                <td
                  className="d-flex justify-content-center align-items-center mx-5"
                  style={{ height: "50vh" }}
                >
                  Add Scholarship Details
                </td>
              </>
            ) : (
              <td className="p-4" style={{}}>
                {schoState === 0
                  ? userScholarship.map((s, i) => {
                      return (
                        <>
                          {s.schlorship_type_id !== "" &&
                          s.schlorship_name !== "" ? (
                            <div
                              className="card my-3"
                              style={{ width: "28rem" }}
                            >
                              <div className="card-body">
                                <DeleteIcon
                                  style={{
                                    position: "absolute",
                                    right: "5px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => deleteEducation(i)}
                                />

                                <>
                                  <h6 className="card-title">
                                    {s.schlorship_type_name}
                                  </h6>
                                  <h4>{s.schlorship_name}</h4>
                                </>
                              </div>
                            </div>
                          ) : null}
                        </>
                      );
                    })
                  : Scholarship.map((s, i) => {
                      const SchoName = ScholarshipOptionValues.filter(
                        (so, i1) => {
                          return s.schlorship_type_id === so.schlorship_type_id;
                        }
                      );
                      console.log(SchoName);
                      return (
                        <>
                          {s.schlorship_type_id !== "" &&
                          s.schlorship_name !== "" ? (
                            <div
                              className="card my-3"
                              style={{ width: "28rem" }}
                            >
                              <div className="card-body">
                                <DeleteIcon
                                  style={{
                                    position: "absolute",
                                    right: "5px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => deleteEducation(i)}
                                />

                                <>
                                  <h6 className="card-title">
                                    {SchoName.length === 0
                                      ? null
                                      : SchoName[0].schlorship_type_name}
                                  </h6>
                                  <h4>{s.schlorship_name}</h4>
                                </>
                              </div>
                            </div>
                          ) : null}
                        </>
                      );
                    })}
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </>
  );
};
