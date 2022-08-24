import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { ExpectedSalaryModal } from "./ExpectedSalaryModal";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  setSalaryOptions,
  setSalaryState,
  setEmploymentType,
  setSalaryDatas,
} from "../../../ReduxStateManagement/actions/Action";
export const ExpectedSalaryTable = () => {
  const [isDesc, setIsDesc] = useState(false);
  const profiledata = useSelector((state) => state.ProfileData);
  const SalaryOptions = useSelector(
    (state) => state.UpdateDatas.SalaryOptions
  );
  const [Lcount, setLcount] = useState(0);
  const salary = useSelector((state) => state.UpdateDatas.SalaryState);
  const SalaryData = useSelector((state) => state.UpdateDatas.SalaryData);
  const EmploymentType = useSelector((state) => state.UpdateDatas.EmploymentType);
  const dispatch = useDispatch();
  const newSal = {
    user_salary_id: "",
    salary_enum_id: "",
    salary_level_enum_id: "",
    status_enum_id: "",
  };
  const OptionDatas = async () => {
    const res = await axios(
      "https://develop.hipoz.com/api/salaryunit?enum_id=0&enum_type_name=Salary"
    ).catch((error) => {
      alert(error);
    });
    dispatch(setSalaryOptions(res.data.data));
  };
  useEffect(() => {
    OptionDatas();
  }, []);
  const ExpertiseOptionDatas = async () => {
    const res = await axios(
      "https://develop.hipoz.com/api/employmenttype?enum_id=0&enum_type_name=Type%20of%20employment"
    ).catch((error) => {
      alert(error);
    });
    dispatch(setEmploymentType(res.data.data));
  };
  useEffect(() => {
    ExpertiseOptionDatas();
  }, []);

  const profileSal = async () => {
    const res = await axios
      .get("https://develop.hipoz.com/api/usersalary?user_id=1097")
      .catch((error) => {
        alert(error);
      });
    dispatch(setSalaryDatas(res.data.data));
    const obj = res.data.data.map((res) => {
      const obj2 = {
        user_salary_id: res.user_salary_id,
        salary_enum_id: res.salary_enum_id,
        salary_level_enum_id: res.salary_level_enum_id,
        status_enum_id: res.status_enum_id,
      };
      return obj2;
    });
    if(obj.length>0){
      setLcount(1);
    }
    dispatch(setSalaryState(obj));
  };
  const deleteProfileSal = async () => {
    const res = await axios
      .get("https://develop.hipoz.com/api/usersalary?user_id=1097")
      .catch((error) => {
        alert(error);
      });
  }
  useEffect(() => {
    profileSal();
  }, []);
  const deletesalary = (index) => {
    console.log(Lcount);
    const deletedSal = salary.filter((Sal, i1) => {
      // log
      return (i1 !== index);
    });
    
    
    // const deletedSal=salary.splice(index,1);
    dispatch(setSalaryState(deletedSal));
    console.log(deletedSal);
    const postSal = {
      user_id: 1097,
      user_salary_json: deletedSal,
      actionby_id: 1097,
    };
  
    axios
      .post("https://develop.hipoz.com/api/updatestudentsalary", postSal)
      .then((res) => {
        if (res.data.statuscode === 200) 
        {
          // profileSal();
          deleteProfileSal();
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
              <div className="col-10 h2">Expected salary Per Month</div>
              <div className="col-2 d-flex justify-content-center align-items-center">
                <EditIcon
                  onClick={() => {
                    setIsDesc(true);
                    dispatch(setSalaryState([...salary, newSal]));
                    setLcount(1);
                  }}
                  style={{ float: "right" }}
                ></EditIcon>
                <ExpectedSalaryModal
                  open={isDesc}
                  onClose={() => {
                    setIsDesc(false);
                    // salary.pop();
                  }}
                  Lcount={Lcount}
                  setLcount={setLcount}
                />
              </div>
            </div>
          </th>
        </thead>
        <tbody className="mx-2">
          <tr>
            {salary.length === 0 ? (
              <>
                <td
                  className="d-flex justify-content-center align-items-center mx-5"
                  style={{ height: "50vh" }}
                >
                  Add Expected salary
                </td>
              </>
            ) : Lcount == 0 ? (
              <>
                <td className="p-4" style={{}}>
                  {SalaryData.map((l, i) => {
                    if (
                      l.salary_enum_id !== "" &&
                      l.salary_level_enum_id !== ""
                    ) {
                      return (
                        <>
                          {
                            <div
                              className="card my-3"
                              style={{ width: "28rem" }}
                            >
                              <div className="card-body row">
                                <div
                                  className="card pt-2 my-2 "
                                  style={{ "max-width": "88%" }}
                                >
                                  <div className="d-flex justify-content-between">
                                    <h6 className="card-title">
                                      {l.salary}
                                    </h6>
                                    <h2>{l.salary_level_name}</h2>
                                  </div>
                                </div>
                                <div
                                  className=" d-flex align-items-center"
                                  style={{ width: "50px" }}
                                >
                                  <DeleteIcon
                                    style={{
                                      cursor: "pointer",
                                    }}
                                    // style={(i===0)?{visibility: "hidden"}:{}}
                                    onClick={() => deletesalary(i)}
                                  />
                                </div>
                              </div>
                            </div>
                          }
                        </>
                      );
                    }
                  })}
                </td>
              </>
            ) : (
              <>
                <td className="p-4" style={{}}>
                  {salary.map((l, i) => {
                    if (
                      l.salary_enum_id !== "" ||
                      l.salary_level_enum_id !== ""
                    ) {
                      const Sname = SalaryOptions.filter((lod) => {
                        return l.salary_enum_id === lod.enum_id;
                      });
                      const SEmploymentType = EmploymentType.filter((EmploymentType) => {
                        return l.salary_level_enum_id === EmploymentType.enum_id;
                      });
                      // console.log(Sname);
                      // console.log(SEmploymentType);
                      return (
                        <>
                          {
                            <div
                              className="card my-3"
                              style={{ width: "28rem" }}
                            >
                              <div className="card-body row">
                                <div
                                  className="card pt-2 my-2 "
                                  style={{ "max-width": "88%" }}
                                >
                                  <div className="d-flex justify-content-between">
                                    <h6 className="card-title">
                                      {Sname.length===0?null:Sname[0].enum_key}
                                    </h6>
                                    <h2>{SEmploymentType.length===0?null:SEmploymentType[0].enum_key}</h2>
                                  </div>
                                </div>
                                <div
                                  className=" d-flex align-items-center"
                                  style={{ width: "50px" }}
                                >
                                  <DeleteIcon
                                    style={{
                                      cursor: "pointer",
                                    }}
                                    // style={(i===0)?{visibility: "hidden"}:{}}
                                    onClick={() => deletesalary(i)}
                                  />
                                </div>
                              </div>
                            </div>
                          }
                        </>
                      );
                    }
                  })}
                </td>
              </>
            )}
          </tr>
        </tbody>
      </table>
    </>
  );
};
