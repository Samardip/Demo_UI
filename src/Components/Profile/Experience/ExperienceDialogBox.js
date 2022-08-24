import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { useDispatch, useSelector } from "react-redux";
import {
  setExperienceData,
  setExperienceState,
} from "../../../ReduxStateManagement/actions/Action";
import { Input } from "@mui/material";
import Axios from "../../Axios";
export const ExperienceDialogBox = ({
  onClose,
  YesNoState,
  setYesNoState,
  setExpStateData,
  setIsDesc,
}) => {
  const [WorkExperience, setWorkExperience] = useState("");
  const [JobType, setJobType] = useState("");
  const [CompanyName, setCompanyName] = useState("");
  const [StartWorkMonth, setStartWorkMonth] = useState("");
  const [StartWorkYear, setStartWorkYear] = useState("");
  const [LastWorkMonth, setLastWorkMonth] = useState("");
  const [LastWorkYear, setLastWorkYear] = useState("");
  const newExp2 = {
    user_work_experience_id: "",
    currently_workinng: "",
    job_type_enum_id: "",
    work_on_month: "",
    work_on_year: "",
    last_work_month: "",
    last_work_year: "",
    company_name: "",
    status_enum_id: "",
  };
  let obj4 = [];
  // console.log(JobType);
  const SelectOptionData = useSelector(
    (state) => state.UpdateDatas.ExperienceOptions
  );
  const Experience = useSelector((state) => state.UpdateDatas.ExperienceState);
  const dispatch = useDispatch();

  const profileExp = async () => {
    const res = await Axios.get("userworkexperince?user_id=1097").catch(
      (error) => {
        alert(error);
      }
    );
    let obj4 = [];
    res.data.data.map((res) => {
      const newExpData = {
        user_work_experience_id: res.user_work_experience_id,
        currently_workinng: res.currently_workinng,
        job_type_enum_id: res.job_type_enum_id,
        company_name: res.company_name,
        work_on_month: res.start_work_on_month_id,
        work_on_year: res.start_work_on_year_id,
        status_enum_id: res.status_enum_id,
        last_work_month: res.last_work_month_id,
        last_work_year: res.last_work_year_id,
      };
      obj4 = [...obj4, newExpData];
    });
    dispatch(setExperienceState(obj4));

    let YesNo = [];
    for (var i = 0; i < obj4.length; i++) {
      YesNo = [...YesNo, obj4[i].currently_workinng === "134" ? false : true];
    }
    setYesNoState(YesNo);
    // console.log(Experience);
  };
  const SaveUpdatedExp = () => {
    const NewExp = {
      user_work_experience_id: 0,
      currently_workinng: WorkExperience,
      job_type_enum_id: JobType,
      company_name: CompanyName,
      work_on_month: StartWorkMonth,
      work_on_year: StartWorkYear,
      last_work_month: WorkExperience === "135" ? LastWorkMonth : null,
      last_work_year: WorkExperience === "135" ? LastWorkYear : null,
      status_enum_id: 1,
    };
    const obj = Experience.map((edu, i) => {
      if (Experience.length - 1 === i) {
        return NewExp;
      } else return edu;
    });
    if (
      NewExp.currently_workinng === "" ||
      NewExp.company_name === "" ||
      NewExp.job_type_enum_id === "" ||
      NewExp.work_on_month === "" ||
      NewExp.work_on_year === ""
    ) {
      obj.pop();
    }
    dispatch(setExperienceState(obj));
    setExpStateData(1);

    const postExp = {
      user_id: 1097,
      user_work_experience_json: obj,
      actionby_id: 1097,
    };
    console.log(obj);
    Axios.post("updatestudentworkexperience", postExp)
      .then((response) => {
        if (response.data.statuscode === 200) {
          // console.log(1);
          profileExp();
        }
      })
      .catch((error) => {
        alert("Enter valid etails");
      });
    setIsDesc(false);
  };

  const AddAnotherExp = () => {
    Experience.pop();
    const NewExp = {
      user_work_experience_id: 0,
      currently_workinng: WorkExperience,
      job_type_enum_id: JobType,
      company_name: CompanyName,
      work_on_month: StartWorkMonth,
      work_on_year: StartWorkYear,
      last_work_month: WorkExperience === "135" ? LastWorkMonth : null,
      last_work_year: WorkExperience === "135" ? LastWorkYear : null,
      status_enum_id: 1,
    };
    const Expobj = [NewExp, newExp2];
    //dispatch(setExperienceState([...Experience, NewExp]));
    // const obj = Experience.map((e, i) => {
    //   if (Experience.length - 1 === i) {
    //     return NewExp;
    //   } else return e;
    // });
    dispatch(setExperienceState([...Experience, ...Expobj]));
    setYesNoState = [...YesNoState, false];
  };
  // console.log(YesNoState);
  // let Uobj = Experience;
  let YesNo = YesNoState;
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
            <button onClick={() => SaveUpdatedExp()}>
              <DoneIcon />
            </button>
            <button className="mx-2" onClick={onClose}>
              <CloseIcon />
            </button>
          </div>
          <div className="px-4" style={{ paddingTop: "5%" }}>
            <table style={{ width: "100%" }}>
              {Experience.map((ed, i) => {
                const JobTypedatas = SelectOptionData.JobTypeData.data.filter(
                  (fd) => {
                    return fd.enum_id === ed.job_type_enum_id;
                  }
                );

                const LMonth = SelectOptionData.EMonthData.data.filter((lm) => {
                  return ed.last_work_month === lm.enum_id;
                });
                const LYear = SelectOptionData.EYearData.data.filter((ly) => {
                  return ed.last_work_year === ly.enum_id;
                });

                const SMonth = SelectOptionData.EMonthData.data.filter(
                  (gmd) => {
                    return gmd.enum_id === ed.work_on_month;
                  }
                );
                const SYear = SelectOptionData.EYearData.data.filter((gdd) => {
                  return gdd.enum_id === ed.work_on_year;
                });
                return (
                  <tbody
                    style={{
                      border: "3px solid black",
                      borderStyle: "dashed dotted double dashed",
                    }}
                  >
                    <tr>
                      <td className="h2">Work Experience</td>
                    </tr>
                    <tr>
                      <td>
                        <select
                          onChange={(e) => {
                            setWorkExperience(e.target.value);
                            // console.log(e.target.value);
                            if (e.target.value === "135") {
                              YesNo[i] = true;
                              setYesNoState(YesNo);
                              console.log(YesNo.length);
                            } else {
                              YesNo[i] = false;
                              setYesNoState(YesNo);
                              console.log(YesNo);
                            }
                            const NewExp = {
                              user_work_experience_id: 0,
                              currently_workinng: e.target.value,
                              job_type_enum_id: Experience[i].job_type_enum_id,
                              company_name: Experience[i].company_name,
                              work_on_month: Experience[i].work_on_month,
                              work_on_year: Experience[i].work_on_year,
                              last_work_month: Experience[i].last_work_month,
                              last_work_year: Experience[i].last_work_year,
                              status_enum_id: 1,
                            };
                            if (e.target.value === "135") {
                              YesNoState[i] = true;
                            } else {
                              YesNoState[i] = false;
                            }
                            const obj = Experience.map((exp, i1) => {
                              if (i === i1) {
                                return NewExp;
                              } else return exp;
                            });
                            dispatch(setExperienceState(obj));
                            //setYesNoState = [...YesNoState, false];
                          }}
                          className="MuiSelect-root MuiSelect-select MuiInputBase-input MuiInput-input"
                          style={{
                            width: "100%",
                            borderRadius: "6px",
                            height: "5vh",
                          }}
                        >
                          {ed.currently_workinng === "" ? (
                            <>
                              <option value="">Add Work Details</option>
                              {SelectOptionData.WorkExpData.data.map((we) => {
                                return (
                                  <option value={we.enum_id}>
                                    {we.enum_display}
                                  </option>
                                );
                              })}
                            </>
                          ) : (
                            <>
                              <option value={ed.currently_workinng}>
                                {ed.currently_workinng === "134" ? "Yes" : "No"}
                              </option>
                              {SelectOptionData.WorkExpData.data.map((we) => {
                                if (ed.currently_workinng !== we.enum_id)
                                  return (
                                    <option value={we.enum_id}>
                                      {we.enum_display}
                                    </option>
                                  );
                              })}
                            </>
                          )}
                        </select>
                      </td>
                    </tr>

                    <tr>
                      <td className="h2">Job Type</td>
                    </tr>
                    <tr>
                      <td>
                        <select
                          onChange={(e) => {
                            setJobType(e.target.value);
                            const NewExp = {
                              user_work_experience_id: 0,
                              currently_workinng:
                                Experience[i].currently_workinng,
                              job_type_enum_id: e.target.value,
                              company_name: Experience[i].company_name,
                              work_on_month: Experience[i].work_on_month,
                              work_on_year: Experience[i].work_on_year,
                              last_work_month: Experience[i].last_work_month,
                              last_work_year: Experience[i].last_work_year,
                              status_enum_id: 1,
                            };

                            const obj = Experience.map((exp, i1) => {
                              if (i === i1) {
                                return NewExp;
                              } else return exp;
                            });
                            dispatch(setExperienceState(obj));
                          }}
                          className="MuiSelect-root MuiSelect-select MuiInputBase-input MuiInput-input"
                          style={{
                            width: "100%",
                            borderRadius: "6px",
                            height: "5vh",
                          }}
                        >
                          {ed.job_type_enum_id === "" ? (
                            <>
                              <option value="">Add Job Type</option>
                              {SelectOptionData.JobTypeData.data.map((we) => {
                                return (
                                  <option value={we.enum_id}>
                                    {we.enum_display}
                                  </option>
                                );
                              })}
                            </>
                          ) : (
                            <>
                              <option value={ed.job_type_enum_id}>
                                {JobTypedatas[0].enum_display}
                              </option>
                              {SelectOptionData.JobTypeData.data.map((we) => {
                                if (ed.job_type_enum_id !== we.enum_id)
                                  return (
                                    <option value={we.enum_id}>
                                      {we.enum_display}
                                    </option>
                                  );
                              })}
                            </>
                          )}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td className="h2">Company Name</td>
                    </tr>
                    <tr>
                      <td>
                        <Input
                          name="company name"
                          style={{
                            width: "100%",
                            borderRadius: "6px",
                            height: "5vh",
                            border: "2px solid white",
                            backgroundColor: "white",
                            color: "black",
                          }}
                          defaultValue={ed.company_name}
                          placeholder="Enter Company Name"
                          required
                          onChange={(e) => {
                            setCompanyName(e.target.value);
                            const NewExp = {
                              user_work_experience_id: 0,
                              currently_workinng:
                                Experience[i].currently_workinng,
                              job_type_enum_id: Experience[i].job_type_enum_id,
                              company_name: e.target.value,
                              work_on_month: Experience[i].work_on_month,
                              work_on_year: Experience[i].work_on_year,
                              last_work_month: Experience[i].last_work_month,
                              last_work_year: Experience[i].last_work_year,
                              status_enum_id: 1,
                            };

                            const obj = Experience.map((exp, i1) => {
                              if (i === i1) {
                                return NewExp;
                              } else return exp;
                            });
                            dispatch(setExperienceState(obj));
                          }}
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className="h2">I have work on</td>
                    </tr>
                    <tr>
                      <td>
                        <select
                          onChange={(e) => {
                            setStartWorkMonth(e.target.value);
                            const NewExp = {
                              user_work_experience_id: 0,
                              currently_workinng:
                                Experience[i].currently_workinng,
                              job_type_enum_id: Experience[i].job_type_enum_id,
                              company_name: Experience[i].company_name,
                              work_on_month: e.target.value,
                              work_on_year: Experience[i].work_on_year,
                              last_work_month: Experience[i].last_work_month,
                              last_work_year: Experience[i].last_work_year,
                              status_enum_id: 1,
                            };

                            const obj = Experience.map((exp, i1) => {
                              if (i === i1) {
                                return NewExp;
                              } else return exp;
                            });
                            dispatch(setExperienceState(obj));
                          }}
                          className="MuiSelect-root MuiSelect-select MuiInputBase-input MuiInput-input"
                          style={{
                            width: "100%",
                            borderRadius: "6px",
                            height: "5vh",
                          }}
                        >
                          {ed.work_on_month === "" ? (
                            <>
                              <option value="">Start work month</option>
                              {SelectOptionData.EMonthData.data.map((em) => {
                                return (
                                  <option value={em.enum_id}>
                                    {em.enum_display}
                                  </option>
                                );
                              })}
                            </>
                          ) : (
                            <>
                              <option value={ed.work_on_month}>
                                {SMonth[0].enum_display}
                              </option>
                              {SelectOptionData.EMonthData.data.map((em) => {
                                if (ed.work_on_month !== em.enum_id)
                                  return (
                                    <option value={em.enum_id}>
                                      {em.enum_display}
                                    </option>
                                  );
                              })}
                            </>
                          )}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <select
                          onChange={(e) => {
                            if (e.target.value >156) {
                              // alert("Enter valid details");
                              console.log(e.target.value);
                              setStartWorkYear("");
                            } else {setStartWorkYear(e.target.value);
                            const NewExp = {
                              user_work_experience_id: 0,
                              currently_workinng:
                                Experience[i].currently_workinng,
                              job_type_enum_id: Experience[i].job_type_enum_id,
                              company_name: Experience[i].company_name,
                              work_on_month: Experience[i].work_on_month,
                              work_on_year: e.target.value,
                              last_work_month: Experience[i].last_work_month,
                              last_work_year: Experience[i].last_work_year,
                              status_enum_id: 1,
                            };

                            const obj = Experience.map((exp, i1) => {
                              if (i === i1) {
                                return NewExp;
                              } else return exp;
                            });
                            dispatch(setExperienceState(obj));}
                          }}
                          className="MuiSelect-root MuiSelect-select MuiInputBase-input MuiInput-input"
                          style={{
                            width: "100%",
                            borderRadius: "6px",
                            height: "5vh",
                          }}
                        >
                          {ed.work_on_year === "" ? (
                            <>
                              <option value="">Start work Year</option>
                              {SelectOptionData.EYearData.data.map((em) => {
                                return (
                                  <option value={em.enum_id}>
                                    {em.enum_display}
                                  </option>
                                );
                              })}
                            </>
                          ) : (
                            <>
                              <option value={ed.work_on_year}>
                                {SYear[0].enum_display}
                              </option>
                              {SelectOptionData.EYearData.data.map((em) => {
                                if (ed.work_on_year !== em.enum_id)
                                  return (
                                    <option value={em.enum_id}>
                                      {em.enum_display}
                                    </option>
                                  );
                              })}
                            </>
                          )}
                        </select>
                      </td>
                    </tr>

                    {YesNoState[i] === true ? (
                      <>
                        {/* {console.log(YesNo[i])} */}
                        <tr>
                          <td className="h2">I have finished work on</td>
                        </tr>
                        <tr>
                          <td>
                            <select
                              onChange={(e) => {
                                setLastWorkMonth(e.target.value);
                                const NewExp = {
                                  user_work_experience_id: 0,
                                  currently_workinng:
                                    Experience[i].currently_workinng,
                                  job_type_enum_id:
                                    Experience[i].job_type_enum_id,
                                  company_name: Experience[i].company_name,
                                  work_on_month: Experience[i].work_on_month,
                                  work_on_year: Experience[i].work_on_year,
                                  last_work_month: e.target.value,
                                  last_work_year:
                                    Experience[i].last_work_year === ""
                                      ? null
                                      : Experience[i].last_work_year,
                                  status_enum_id: 1,
                                };

                                const obj = Experience.map((exp, i1) => {
                                  if (i === i1) {
                                    return NewExp;
                                  } else return exp;
                                });
                                dispatch(setExperienceState(obj));
                              }}
                              className="MuiSelect-root MuiSelect-select MuiInputBase-input MuiInput-input"
                              style={{
                                width: "100%",
                                borderRadius: "6px",
                                height: "5vh",
                              }}
                            >
                              {ed.last_work_month === null ||
                              ed.last_work_month === "" ? (
                                <>
                                  <option value="">Last work month</option>
                                  {SelectOptionData.EMonthData.data.map(
                                    (em) => {
                                      return (
                                        <option value={em.enum_id}>
                                          {em.enum_display}
                                        </option>
                                      );
                                    }
                                  )}
                                </>
                              ) : (
                                <>
                                  <option value={ed.last_work_month}>
                                    {LMonth[0].enum_display}
                                  </option>
                                  {SelectOptionData.EMonthData.data.map(
                                    (em) => {
                                      if (ed.last_work_month !== em.enum_id)
                                        return (
                                          <option value={em.enum_id}>
                                            {em.enum_display}
                                          </option>
                                        );
                                    }
                                  )}
                                </>
                              )}
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <select
                              onChange={(e) => {
                                if (e.target.value > 156) {
                                  // alert("Enter valid details");
                                  setLastWorkYear("");
                                } else {setLastWorkYear(e.target.value);
                                const NewExp = {
                                  user_work_experience_id: 0,
                                  currently_workinng:
                                    Experience[i].currently_workinng,
                                  job_type_enum_id:
                                    Experience[i].job_type_enum_id,
                                  company_name: Experience[i].company_name,
                                  work_on_month: Experience[i].work_on_month,
                                  work_on_year: Experience[i].work_on_year,
                                  last_work_month:
                                    Experience[i].last_work_month === ""
                                      ? null
                                      : Experience[i].last_work_month,
                                  last_work_year: e.target.value,
                                  status_enum_id: 1,
                                };

                                const obj = Experience.map((exp, i1) => {
                                  if (i === i1) {
                                    return NewExp;
                                  } else return exp;
                                });
                                dispatch(setExperienceState(obj));}
                              }}
                              className="MuiSelect-root MuiSelect-select MuiInputBase-input MuiInput-input"
                              style={{
                                width: "100%",
                                borderRadius: "6px",
                                height: "5vh",
                              }}
                            >
                              {ed.last_work_year === null ||
                              ed.last_work_year === "" ? (
                                <>
                                  <option value="">Last work Year</option>
                                  {SelectOptionData.EYearData.data.map((em) => {
                                    return (
                                      <option value={em.enum_id}>
                                        {em.enum_display}
                                      </option>
                                    );
                                  })}
                                </>
                              ) : (
                                <>
                                  <option value={ed.last_work_year}>
                                    {LYear[0].enum_display}
                                  </option>
                                  {SelectOptionData.EYearData.data.map((em) => {
                                    if (ed.last_work_year !== em.enum_id)
                                      return (
                                        <option value={em.enum_id}>
                                          {em.enum_display}
                                        </option>
                                      );
                                  })}
                                </>
                              )}
                            </select>
                          </td>
                        </tr>
                      </>
                    ) : null}
                  </tbody>
                );
              })}
            </table>

            <div className="d-flex flex-column">
              <button
                className="my-2 btn btn-primary rounded"
                onClick={() => AddAnotherExp()}
              >
                Add Another Experience
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
// console.log(Education[i].degree);
// if (Education.length - 1 !== i) {
//   const NewExp4 = {
//     user_education_id: (Education[i].user_education_id === "0") ? Education[i].user_education_id : "0",
//     Degree: e.target.value === ""
//       ? Education[i].Degree
//       : e.target.value,
//     FieldStudy: Education[i].FieldStudy,
//     University: Education[i].University,
//     GraduationMonth: Education[i].GraduationMonth,
//     GraduationDate: Education[i].GraduationDate,
//     status_enum_id: 1,
//   };
//   const obj3 = Uobj.map((edu, i1) => {
//     if (i1 === i)
//       return NewExp4;
//     else
//       return edu;

//   })
//   console.log(e.target.value);
//   console.log(obj3)
//   dispatch(UpdateEducation(obj3));
// }
