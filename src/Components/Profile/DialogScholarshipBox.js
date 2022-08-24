import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { useDispatch, useSelector } from "react-redux";
import {
  ScholarshipData,
  ScholarshipState,
  TrueFalseState,
  UpdateDesc,
  UserProfileData,
  UserScholarshipData,
} from "../../ReduxStateManagement/actions/Action";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { hi } from "date-fns/locale";
import { Input } from "@mui/material";
export const DialogScholarshipBox = ({ onClose, show, setShow }) => {
  const [ScholarshipName, setScholarshipName] = useState("");
  const [ScholarshipTypeId, setScholarshipTypeId] = useState("");
  const schoState = useSelector((state) => state.SchoState);
  const [SchoTrue, setSchoTrue] = useState(false);
  const ScholarshipOptionValues = useSelector(
    (state) => state.UpdateDatas.ScholarshipOptions
  );
  const condition = useSelector(state => state.UpdateDatas.Condition)
  const Scholarship = useSelector((state) => state.UpdateDatas.scholarshipData);
  // const OptionDatas = useSelector(
  //   (state) => state.UpdateDatas.ScholarshipOptions
  // );
  const dispatch = useDispatch();
  let addObj = Scholarship;
  const Schodata = {
    user_schlorship_id: "",
    merit_schlorship_id: "",
    schlorship_type_id: "",
    schlorship_name: "",
    status_enum_id: "",
  };
  const fetchScholarshipData = async () => {
    const res = await axios
      .get("https://develop.hipoz.com/api/userschlorship?user_id=1097")
      .catch((error) => {
        alert(error);
      });
    dispatch(UserScholarshipData(res.data.data));
  };

  const SaveUpdatedScholarshipc = () => {
    const newScho = {
      user_schlorship_id: 0,
      merit_schlorship_id: 135,
      schlorship_type_id: ScholarshipTypeId,
      schlorship_name: ScholarshipName,
      status_enum_id: 1,
    };
    addObj.pop();
    // if(newScho.schlorship_type_id!=="" && newScho.schlorship_name!=="")

    setScholarshipTypeId("");
    setScholarshipName("");
    addObj = [...addObj, newScho];
    if (
      addObj[addObj.length - 1].schlorship_type_id === "" ||
      addObj[addObj.length - 1].schlorship_name === ""
    ) {
      addObj.pop();
    }
    const postScho = {
      user_id: 1097,
      user_schlorship_json: addObj,
      actionby_id: 1097,
    };
    axios
      .post("https://develop.hipoz.com/api/updatestudentschlorship", postScho)
      .then((response) => {
        if (response.data.statuscode === 200) {
          fetchScholarshipData();
        }
      })
      .catch((error) => {
        alert(error);
      });
    dispatch(ScholarshipData(addObj));
    dispatch(ScholarshipState(1));
    onClose();
  };

  const AddAnotherScholarship = () => {
    const newScho = {
      user_schlorship_id: 0,
      merit_schlorship_id: 135,
      schlorship_type_id: ScholarshipTypeId,
      schlorship_name: ScholarshipName,
      status_enum_id: 1,
    };
    // console.log(newScho);
    // dispatch(ScholarshipData([...Scholarship,newScho]));
    addObj.pop();
    // if(newScho.schlorship_type_id!=="" && newScho.schlorship_name!=="")
    addObj = [...addObj, newScho];
    addObj = [...addObj, Schodata];

    dispatch(ScholarshipData(addObj));
    setScholarshipTypeId("");
    setScholarshipName("");
    setShow([...show, false]);
  };
  const displayScholarship = (data, i1) => {
    console.log(i1);
    console.log(data);
    if (data === "134") {
      const obj = show.map((s, i) => {
        // console.log(s);
        if (i1 === i) {
          return true;
        } else return s;
      });

      setShow(obj);
      console.log(obj);
    } else {
      const obj = show.map((s, i) => {
        // console.log(s);
        if (i1 === i) {
          setScholarshipTypeId("");
          setScholarshipName("");

          return false;
        } else return s;
      });

      setShow(obj);
    }
  };

  return (
    <>
      <div
        className="rounded"
        style={{
          backgroundColor: "rgb(138 138 146 / 39%)",
          height: "70vh",
          margin: "15%",
          top: "-18%", //-20%
          left: "0",
          right: "0",
          bottom: "0",
          position: "fixed",
          overflowY: "scroll",
        }}
      >
        <div className="">
          <div className="float-right">
            <button onClick={() => SaveUpdatedScholarshipc()}>
              <DoneIcon />
            </button>
            <button className="mx-2" onClick={onClose}>
              <CloseIcon />
            </button>
          </div>
          <div className="px-4" style={{ paddingTop: "5%" }}>
            <form>
              <table style={{ width: "100%" }}>
                {Scholarship?.map((s, i) => {
                  const SchoTypeName = ScholarshipOptionValues.filter((so) => {
                    return (
                      Scholarship[i].schlorship_type_id ===
                      so.schlorship_type_id
                    );
                  });
                  return (
                    <>
                      <tbody>
                        <tr>
                          <td className="h1" style={{ color: "black" }}>
                            Enter Scholarship
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <select
                              className="MuiSelect-root MuiSelect-select MuiInputBase-input MuiInput-input"
                              style={{
                                width: "100%",
                                borderRadius: "6px",
                                height: "32px",
                              }}
                              onChange={(e) =>
                                displayScholarship(e.target.value, i)
                              }
                            >
                              {(schoState!==0)?(
                                <>{show[i]!==true?(
                                  <option disabled="" value="">
                                    In course of studies, I recieved a merit
                                    scholarship
                                  </option>):(null
                                    // <option value="134">Yes</option>
                                  )
                                  }  
                                  
                                  {
                                  condition.map((c)=>{
                                    //if(c.enum_id!=="134")
                                    return <option value={c.enum_id}>{c.enum_display}</option>
                                  })
                                  
                                  }
                                </>)
                                :(
                                  <>
                                  {
                                  condition.map((c)=>{
                                    return <option value={c.enum_id}>{c.enum_display}</option>
                                  })
                                  
                                  }
                                  <option disabled="" value="">
                                    In course of studies, I recieved a merit
                                    scholarship
                                  </option>
                                  
                                  
                                </>
                                )
                              }
                            </select>
                            {show[i] === true ? (
                              <>
                                <select
                                  className="my-3"
                                  style={{
                                    width: "100%",
                                    borderRadius: "6px",
                                    height: "32px",
                                  }}
                                  onChange={(e) => {
                                    setScholarshipTypeId(e.target.value);
                                    const newScho = {
                                      user_schlorship_id:
                                        Scholarship[i].user_schlorship_id,
                                      merit_schlorship_id:
                                        Scholarship[i].merit_schlorship_id,
                                      schlorship_type_id:
                                        e.target.value === ""
                                          ? Scholarship[i].schlorship_type_id
                                          : e.target.value,
                                      schlorship_name:
                                        Scholarship[i].schlorship_name,
                                      status_enum_id:
                                        Scholarship[i].status_enum_id,
                                    };
                                    // console.log(newScho)

                                    const obj3 = Scholarship.map((s, index) => {
                                      if (index === i) return newScho;
                                      else return s;
                                    });
                                    dispatch(ScholarshipData(obj3));
                                  }}
                                >
                                  {Scholarship[i].schlorship_type_id !== "" ? (
                                    <>
                                      <option
                                        value={
                                          Scholarship[i].schlorship_type_id
                                        }
                                      >
                                        {SchoTypeName[0].schlorship_type_name}
                                      </option>
                                      {ScholarshipOptionValues.map(
                                        (data, i1) => {
                                          if (
                                            data.schlorship_type_id !==
                                            Scholarship[i].schlorship_type_id
                                          )
                                            return (
                                              <>
                                                <option
                                                  value={
                                                    data.schlorship_type_id
                                                  }
                                                >
                                                  {data.schlorship_type_name}
                                                </option>
                                              </>
                                            );
                                        }
                                      )}
                                    </>
                                  ) : (
                                    ScholarshipOptionValues.map((data) => {
                                      return (
                                        <option value={data.schlorship_type_id}>
                                          {data.schlorship_type_name}
                                        </option>
                                      );
                                    })
                                  )}
                                </select>
                                <input
                                  type="text"
                                  className=""
                                  placeholder="Enter scholarship Name"
                                  style={{
                                    height: "32px",
                                    width: "100%",
                                    borderRadius: "6px",
                                  }}
                                  defaultValue={s.schlorship_name}
                                  onChange={(e) => {
                                    setScholarshipName(e.target.value);
                                    const newScho = {
                                      user_schlorship_id:
                                        Scholarship[i].user_schlorship_id,
                                      merit_schlorship_id:
                                        Scholarship[i].merit_schlorship_id,
                                      schlorship_type_id:
                                        Scholarship[i].schlorship_type_id,
                                      schlorship_name:
                                        e.target.value === ""
                                          ? Scholarship[i].schlorship_name
                                          : e.target.value,
                                      status_enum_id:
                                        Scholarship[i].status_enum_id,
                                    };
                                    // console.log(newScho)

                                    const obj3 = Scholarship.map((s, index) => {
                                      if (index === i) return newScho;
                                      else return s;
                                    });
                                    dispatch(ScholarshipData(obj3));
                                  }}
                                  required
                                />
                              </>
                            ) : null}
                          </td>
                        </tr>
                      </tbody>
                    </>
                  );
                })}
              </table>
            </form>
            <button
              className="btn btn-primary w-100 my-3"
              onClick={() => AddAnotherScholarship()}
            >
              Add another Scholarship
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
