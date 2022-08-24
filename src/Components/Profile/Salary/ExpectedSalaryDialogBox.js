import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setSalaryState } from "../../../ReduxStateManagement/actions/Action";
export const ExpectedSalaryDialogBox = ({ onClose, Lcount,setLcount }) => {
  const newSal = {
    user_salary_id: "",
    salary_enum_id: "",
    salary_level_enum_id: "",
    status_enum_id: "",
  };
  const [salaryid, setsalaryid] = useState("");
  const [SEid, setSEid] = useState("");
  const salaryOptions = useSelector(
    (state) => state.UpdateDatas.SalaryOptions
  );
  const dispatch = useDispatch();
  const salary = useSelector((state) => state.UpdateDatas.SalaryState);
  const EmploymentType = useSelector((state) => state.UpdateDatas.EmploymentType);
  let copySal = salary;
  const profileSal = async () => {
    const res = await axios
      .get("https://develop.hipoz.com/api/usersalary?user_id=1097")
      .catch((error) => {
        alert(error);
      });
    //   dispatch(setSalaryDatas(res.data.data));
    // const obj = res.data.data.map((res) => {
    //   const obj2 = {
    //     user_salary_id0: res.user_salary_id,
    //     salary_enum_id: res.salary_enum_id,
    //     salary_level_enum_id: res.salary_level_enum_id,
    //     status_enum_id: res.status_enum_id,
    //   };
    //   return obj2;
    // });
    // dispatch(setSalaryState(obj));
  };
  const saveUpdatedSal = () => {
    setLcount(1);
    console.log(copySal);
    copySal.pop();
    const newSal = {
      user_salary_id: 0,
      salary_enum_id: salaryid,
      salary_level_enum_id: SEid,
      status_enum_id: "1",
    };
    if (salaryid !== "" && SEid !== "")
      copySal = [...copySal, newSal];
    console.log(copySal);
    const postSal = {
      user_id: 1097,
      user_salary_json: copySal,
      actionby_id: 1097,
    };
    axios
      .post("https://develop.hipoz.com/api/updatestudentsalary", postSal)
      .then((res) => {
        if (res.data.statuscode === 200) profileSal();
      })
      .catch((error) => {
        alert(error);
      });
    dispatch(setSalaryState(copySal));
    onClose();
  };
  const AddAnotherSal = () => {
    console.log(salaryid);
    console.log(SEid);
    copySal.pop();
    const newSal = [
      {
        user_salary_id: 0,
        salary_enum_id: salaryid,
        salary_level_enum_id: SEid,
        status_enum_id: "1",
      },
      {
        user_salary_id: "",
        salary_enum_id: "",
        salary_EmploymentType_enum_id: "",
        status_enum_id: "",
      },
    ];
    copySal = copySal.concat(newSal);
    dispatch(setSalaryState(copySal));
  };
  return (
    <>
      <div
        className="rounded"
        style={{
          backgroundColor: "rgb(138 138 146 / 39%)",
          height: "75vh",
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
            <button onClick={() => saveUpdatedSal()}>
              <DoneIcon />
            </button>
            <button
              className="mx-2"
              onClick={() => {
                onClose();
                salary.pop();
                // copySal=salary;
              }}
            >
              <CloseIcon />
            </button>
          </div>
          <div className="px-4" style={{ paddingTop: "5%" }}>
            <table style={{ width: "100%" }}>
              {salary.map((l, i) => {
                const Sname = salaryOptions.filter((lod) => {
                  return l.salary_enum_id === lod.enum_id;
                });
                const SEmploymentType = EmploymentType.filter((employmentType) => {
                  return l.salary_level_enum_id === employmentType.enum_id;
                });
                // console.log(SEmploymentType);
                return (
                  <tbody
                    style={{
                      border: "3px solid black",
                      borderStyle: "dashed dotted double dashed",
                    }}
                  >
                    <tr>
                      <td className="h2">Add salary</td>
                    </tr>
                    <tr>
                      <td>
                        <select
                          style={{
                            width: "100%",
                            borderRadius: "6px",
                            height: "5vh",
                          }}
                          onChange={(e) => {setsalaryid((i===salary.length-1)?e.target.value:"")
                            const newSal = {
                              user_salary_id: salary[i].user_salary_id,
                              salary_enum_id: e.target.value,
                              salary_level_enum_id: salary[i].salary_level_enum_id,
                              status_enum_id: salary[i].status_enum_id,
                            };  
                             const obj=copySal.map((c,i1)=>{
                              if(i1===i)
                                return newSal;
                              else
                                return c;
                            })
                            // copySal=obj;
                            dispatch(setSalaryState(obj));
                          }}
                        >
                          {salary[i].salary_enum_id === "" ||
                          salary[i].salary_level_enum_id === "" ? (
                            <>
                              <option value="">Select salary Range</option>
                              {salaryOptions.map((lo) => {
                                return (
                                  <option value={lo.enum_id}>
                                    {lo.enum_display}
                                  </option>
                                );
                              })}
                            </>
                          ) : (
                            <>
                              <option value={salary[i].salary_enum_id}>
                                {Sname.length===0?null:Sname[0].enum_display}
                              </option>
                              {salaryOptions.map((lo) => {
                                if (lo.salary_enum_id !== l.salary_enum_id)
                                  return (
                                    <option value={lo.enum_id}>
                                      {lo.enum_display}
                                    </option>
                                  );
                              })}
                            </>
                          )}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>EmploymentType</td>
                    </tr>
                    <tr>
                      <td>
                        <select
                          style={{
                            width: "100%",
                            borderRadius: "6px",
                            height: "5vh",
                          }}
                          onChange={(e) =>{setSEid((i===salary.length-1)?e.target.value:"")
                            const newSal = {
                              user_salary_id: salary[i].user_salary_id,
                              salary_enum_id: salary[i].salary_enum_id,
                              salary_level_enum_id:e.target.value,
                              status_enum_id: salary[i].status_enum_id,
                            }; 
                            const obj=copySal.map((c,i1)=>{
                              if(i1===i)
                                return newSal;
                              else
                                return c;
                            })
                            // copySal=obj;
                            dispatch(setSalaryState(obj));
                          }}
                        >
                          {salary[i].salary_enum_id === "" ||
                          salary[i].salary_level_enum_id === "" ? (
                            <>
                              <option value="">Select EmploymentType</option>
                              {EmploymentType.map((EmploymentType) => {
                                return (
                                  <option value={EmploymentType.enum_id}>
                                    {EmploymentType.enum_display}
                                  </option>
                                );
                              })}
                            </>
                          ) : (
                            <>
                              <option value={salary[i].salary_level_enum_id}>
                                {SEmploymentType.length===0?null:SEmploymentType[0].enum_display}
                              </option>
                              {EmploymentType.map((lo) => {
                                if (lo.enum_id !== l.salary_level_enum_id)
                                  return (
                                    <option value={lo.enum_id}>
                                    {lo.enum_display}
                                  </option>
                                  );
                              })}
                            </>
                          )}
                        </select>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>

            <div className="d-flex flex-column">
              <button
                className="my-2 btn btn-primary rounded"
                onClick={() => AddAnotherSal()}
              >
                Add Another Education
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
