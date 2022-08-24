import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { Input } from "@mui/material";
import {
  EducationDatas,
  UpdateEducation,
  UserProfileData,
  OptionData,
  UserEducationData,
  EducationState,
} from "../../ReduxStateManagement/actions/Action";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export const DialogEducationBox = ({ onClose }) => {
  const [Degree, setDegree] = useState("");
  const [FieldStudy, setFieldStudy] = useState("");
  const [University, setUniversity] = useState("");
  const [GraduationMonth, setGraduationMonth] = useState("");
  const [GraduationDate, setGraduationDate] = useState("");
  const [getEducation, setGetEducation] = useState([{}]);
  const newEdu2 = {
    user_education_id: 0,
    Degree: "",
    FieldStudy: "",
    University: "",
    GraduationMonth: "",
    GraduationDate: "",
    status_enum_id: 1,
  };

  let obj4 = [];
  // console.log(FieldStudy);
  const SelectOptionData = useSelector(
    (state) => state.UpdateDatas.OptionDatas
  );
  const Education = useSelector((state) => state.UpdateDatas.Education);
  const userEducationData = useSelector(
    (state) => state.UpdateDatas.UserEducationData
  );
  const eduState = useSelector((state) => state.EduState);
  const dispatch = useDispatch();

  const profileEdu = async () => {
    const res = await axios
      .get(
        "https://develop.hipoz.com/api/usereducation?user_id=1097"
      )
      .catch((error) => {
        alert(error);
      });

    res.data.data.map((res) => {
      const newEduData = {
        user_education_id: res.user_education_id,
        Degree: res.degree_id,
        FieldStudy: res.field_of_study_id,
        University: res.university_id,
        GraduationMonth: res.graduate_month_id,
        GraduationDate: res.graduate_year_id,
        status_enum_id: 1,
      }
      obj4 = [...obj4, newEduData];
    })
    dispatch(UpdateEducation(obj4));
    dispatch(UserEducationData(res.data.data));
  }

  const SaveUpdatedEdu1 = () => {
    const newEdu = {
      user_education_id: 0,
      Degree: Degree,
      FieldStudy: FieldStudy,
      University: University,
      GraduationMonth: GraduationMonth,
      GraduationDate: GraduationDate,
      status_enum_id: 1,
    };
    const obj = Education.map((edu, i) => {
      if (Education.length - 1 === i) {
        return newEdu;
      }
      else
        return edu;
    })
    if((newEdu.Degree === "" || newEdu.University === "" || newEdu.FieldStudy === "" || newEdu.GraduationMonth === "" || newEdu.GraduationDate === ""))
    {
      obj.pop();
    }
    // setGetEducation([...getEducation,newEdu]);
    console.log(obj);
    dispatch(UpdateEducation(obj));
    dispatch(EducationState(1));
    let obj2 = [];
    obj.map((ed, i) => {
      // if(i!==Education.length-1)
      {
        const postObj =
        {
          user_education_id: ed.user_education_id,
          degree_id: ed.Degree,
          field_of_study_id: ed.FieldStudy,
          university_id: ed.University,
          graduate_month_id: ed.GraduationMonth,
          graduate_year_id: ed.GraduationDate,
          status_enum_id: ed.status_enum_id,
        }
        obj2 = [...obj2, postObj]
      }
      // setGetEducationjson([...getEducationjson,obj1]);

    })
    // console.log(obj2);
    const postEdu = {
      "user_id": 1097,
      "user_education_json": obj2,
      "actionby_id": 1097
    }
    if (Education.length !== 0) {
      axios.post("https://develop.hipoz.com/api/userestudenteducation", postEdu)
        .then((response) => {
          if (response.data.statuscode === 200) {
            console.log(1);
            profileEdu();
          }
          else
            console.log(2);
        })
        .catch((error) => {
          alert(error);
        })
    }
    onClose();
  };

  const SaveUpdatedEdu = () => {
    const newEdu = {
      user_education_id: 0,
      Degree: Degree,
      FieldStudy: FieldStudy,
      University: University,
      GraduationMonth: GraduationMonth,
      GraduationDate: GraduationDate,
      status_enum_id: 1,
    };

    //dispatch(UpdateEducation([...Education, newEdu]));
    const obj = Education.map((e, i) => {
      if (Education.length - 1 === i) {
        return newEdu;
      }
      else
        return e;
    })
    dispatch(UpdateEducation([...obj, newEdu2]));
  };
  let Uobj = Education;


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
            <button onClick={() => SaveUpdatedEdu1()}>
              <DoneIcon />
            </button>
            <button className="mx-2" onClick={onClose}>
              <CloseIcon />
            </button>
          </div>
          <div className="px-4" style={{ paddingTop: "5%" }}>
            <table style={{ width: "100%" }}>

              {Education.map((edu, i) => {
                {
                  const Uvalue =
                    SelectOptionData.UniversityNameData.data.filter((ud) => {
                      return ud.university_id === edu.University;
                    });
                  const FSvalue =
                    SelectOptionData.FieldStudyData.data.filter((fd) => {
                      return fd.filed_of_study_id === edu.FieldStudy;
                    });
                  const Dgvalue =
                    SelectOptionData.DegreeNameData.data.filter((dd) => {
                      return dd.degree_id === edu.Degree;
                    });
                  const Mvalue = SelectOptionData.GMonthData.data.filter(
                    (gmd) => {
                      return gmd.enum_id === edu.GraduationMonth;
                    }
                  );
                  const Dvalue = SelectOptionData.GDateData.data.filter(
                    (gdd) => {
                      return gdd.enum_id === edu.GraduationDate;
                    }
                  );
                  // console.log(FSvalue);
                  const OptionObj = {
                    Dgvalue: Dgvalue.length !== 0 ? Dgvalue[0].degree_name : "Select Degree",
                    FSvalue: FSvalue.length !== 0 ? FSvalue[0].filed_of_study_name : "Select Field of Study",
                    Uvalue: Uvalue.length !== 0 ? Uvalue[0].university_name : "Select University Name",
                    Mvalue: Mvalue.length !== 0 ? Mvalue[0].enum_display : "Select Month",
                    Dvalue: Dvalue.length !== 0 ? Dvalue[0].enum_display : "Select Year",
                  };
                  // console.log(OptionObj);
                  return (
                    <tbody style={{border: "3px solid black",borderStyle: "dashed dotted double dashed"}}>
                      <tr>
                        <td className="h2">Degree</td>
                      </tr>
                      <tr>
                        <td>
                          <select
                            onChange={(e) => {
                              setDegree(
                                e.target.value === ""
                                  ? Education[i].Degree
                                  : e.target.value
                              );
                              // console.log(Education[i].degree);
                              if (Education.length - 1 !== i) {
                                const newEdu4 = {
                                  user_education_id: (Education[i].user_education_id === "0") ? Education[i].user_education_id : "0",
                                  Degree: e.target.value === ""
                                    ? Education[i].Degree
                                    : e.target.value,
                                  FieldStudy: Education[i].FieldStudy,
                                  University: Education[i].University,
                                  GraduationMonth: Education[i].GraduationMonth,
                                  GraduationDate: Education[i].GraduationDate,
                                  status_enum_id: 1,
                                };
                                const obj3 = Uobj.map((edu, i1) => {
                                  if (i1 === i)
                                    return newEdu4;
                                  else
                                    return edu;

                                })
                                console.log(e.target.value);
                                console.log(obj3)
                                dispatch(UpdateEducation(obj3));
                              }
                            }}
                            className="MuiSelect-root MuiSelect-select MuiInputBase-input MuiInput-input"
                            style={{
                              width: "100%",
                              borderRadius: "6px",
                              height: "5vh",
                            }}
                          >
                            {/* <option value="" disabled="">
                                Your Degree
                              </option> */}

                            {edu.Degree !== "" ? (
                              <>
                                <option value={edu.Degree} disabled="">
                                  {OptionObj.Dgvalue}
                                </option>
                                {SelectOptionData.DegreeNameData.data.map(
                                  (d) => {
                                    if (edu.Degree !== d.degree_id)
                                      return (
                                        <option value={d.degree_id}>
                                          {d.degree_name}
                                        </option>
                                      );
                                  }
                                )}
                              </>
                            ) : (
                              <>
                                <option value={edu.Degree} disabled="">
                                  {OptionObj.Dgvalue}
                                </option>
                                {SelectOptionData.DegreeNameData.data.map(
                                  (d) => {
                                    return (
                                      <option value={d.degree_id}>
                                        {d.degree_name}
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
                        <td className="h2">Field Of Study</td>
                      </tr>
                      <tr>
                        <td>
                          <select
                            onChange={(e) => {
                              setFieldStudy(
                                e.target.value === ""
                                  ? Education[i].FieldStudy
                                  : e.target.value
                              );
                              if (Education.length - 1 !== i) {
                                const newEdu4 = {
                                  user_education_id: (Education[i].user_education_id === "0") ? Education[i].user_education_id : "0",
                                  Degree: Education[i].Degree,
                                  FieldStudy: e.target.value === ""
                                    ? Education[i].FieldStudy
                                    : e.target.value,
                                  University: Education[i].University,
                                  GraduationMonth: Education[i].GraduationMonth,
                                  GraduationDate: Education[i].GraduationDate,
                                  status_enum_id: 1,
                                };
                                const obj3 = Uobj.map((edu, i1) => {
                                  if (i1 === i)
                                    return newEdu4;
                                  else
                                    return edu;

                                })
                                console.log(e.target.value);
                                console.log(obj3)
                                dispatch(UpdateEducation(obj3));
                              }
                            }}
                            className="MuiSelect-root MuiSelect-select MuiInputBase-input MuiInput-input"
                            style={{
                              width: "100%",
                              borderRadius: "6px",
                              height: "5vh",
                            }}
                          >
                            {/* <option value="" disabled="">
                                Your Field of Study
                              </option> */}
                            {edu.FieldStudy !== "" ? (
                              <>
                                <option value={edu.FieldStudy} disabled="">
                                  {OptionObj.FSvalue}
                                </option>

                                {SelectOptionData.FieldStudyData.data.map(
                                  (d) => {
                                    if (
                                      edu.FieldStudy !== d.filed_of_study_id
                                    )
                                      return (
                                        <option value={d.filed_of_study_id}>
                                          {d.filed_of_study_name}
                                        </option>
                                      );
                                  }
                                )}
                              </>
                            ) : (
                              <>
                                <option value={edu.FieldStudy} disabled="">
                                  {OptionObj !== null ? OptionObj.FSvalue : ""}
                                </option>
                                {SelectOptionData.FieldStudyData.data.map(
                                  (d) => {
                                    return (
                                      <option value={d.filed_of_study_id}>
                                        {d.filed_of_study_name}
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
                        <td className="h2">University</td>
                      </tr>
                      <tr>
                        <td>
                          <select
                            onChange={(e) => {
                              setUniversity(e.target.value === ""
                                ? Education[i].University
                                : e.target.value);
                              if (Education.length - 1 !== i) {
                                const newEdu4 = {
                                  user_education_id: (Education[i].user_education_id === "0") ? Education[i].user_education_id : "0",
                                  Degree: Education[i].Degree,
                                  FieldStudy: Education[i].FieldStudy,
                                  University: e.target.value === ""
                                    ? Education[i].University
                                    : e.target.value,
                                  GraduationMonth: Education[i].GraduationMonth,
                                  GraduationDate: Education[i].GraduationDate,
                                  status_enum_id: 1,
                                };
                                const obj3 = Uobj.map((edu, i1) => {
                                  if (i1 === i)
                                    return newEdu4;
                                  else
                                    return edu;

                                })
                                console.log(e.target.value);
                                console.log(obj3)
                                dispatch(UpdateEducation(obj3));
                              }
                            }}
                            className="MuiSelect-root MuiSelect-select MuiInputBase-input MuiInput-input"
                            style={{
                              width: "100%",
                              borderRadius: "6px",
                              height: "5vh",
                            }}
                          >
                            {/* <option value="" disabled="">
                                Your University
                              </option> */}
                            {edu.University !== "" ? (<>
                              <option value={edu.University} disabled="">
                                {OptionObj.Uvalue}
                              </option>
                              {SelectOptionData.UniversityNameData.data.map(
                                (d) => {
                                  if (edu.University !== d.university_id)
                                    return (
                                      <option value={d.university_id}>
                                        {d.university_name}
                                      </option>
                                    );
                                }
                              )}
                            </>) : (
                              <>
                                <option value={edu.University} disabled="">
                                  {OptionObj.Uvalue}
                                </option>
                                {SelectOptionData.UniversityNameData.data.map(
                                  (d) => {

                                    return (
                                      <option value={d.university_id}>
                                        {d.university_name}
                                      </option>
                                    );
                                  }
                                )}
                              </>
                            )
                            }
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td className="h2">Graduation month</td>
                      </tr>
                      <tr>
                        <td>
                          <select
                            onChange={(e) => {
                              setGraduationMonth(e.target.value === ""
                                ? Education[i].GraduationMonth
                                : e.target.value);
                              if (Education.length - 1 !== i) {
                                const newEdu4 = {
                                  user_education_id: (Education[i].user_education_id === "0") ? Education[i].user_education_id : "0",
                                  Degree: Education[i].Degree,
                                  FieldStudy: Education[i].FieldStudy,
                                  University: Education[i].University,
                                  GraduationMonth: e.target.value === ""
                                    ? Education[i].GraduationMonth
                                    : e.target.value,
                                  GraduationDate: Education[i].GraduationDate,
                                  status_enum_id: 1,
                                };
                                const obj3 = Uobj.map((edu, i1) => {
                                  if (i1 === i)
                                    return newEdu4;
                                  else
                                    return edu;

                                })
                                console.log(e.target.value);
                                console.log(obj3)
                                dispatch(UpdateEducation(obj3));
                              }
                            }}
                            className="MuiSelect-root MuiSelect-select MuiInputBase-input MuiInput-input"
                            style={{
                              width: "100%",
                              borderRadius: "6px",
                              height: "5vh",
                            }}
                          >
                            {/* <option value="" disabled="">
                                Month
                              </option> */}
                            {edu.GraduationMonth !== "" ? (<>
                              <option value={edu.GraduationMonth} disabled="">
                                {OptionObj.Mvalue}
                              </option>
                              {SelectOptionData.GMonthData.data.map((d) => {
                                if (edu.GraduationMonth !== d.enum_id)
                                  return (
                                    <option value={d.enum_id}>
                                      {d.enum_key}
                                    </option>
                                  );
                              })}
                            </>) : (
                              <>
                                <option value={edu.GraduationMonth} disabled="">
                                  {OptionObj.Mvalue}
                                </option>
                                {SelectOptionData.GMonthData.data.map((d) => {

                                  return (
                                    <option value={d.enum_id}>
                                      {d.enum_key}
                                    </option>
                                  );
                                })}
                              </>
                            )

                            }
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td className="h2">Graduation date</td>
                      </tr>
                      <tr>
                        <td>
                          <select
                            onChange={(e) => {
                              setGraduationDate(e.target.value === ""
                                ? Education[i].GraduationDate
                                : e.target.value);
                              if (Education.length - 1 !== i) {
                                const newEdu4 = {
                                  user_education_id: (Education[i].user_education_id === "0") ? Education[i].user_education_id : "0",
                                  Degree: Education[i].Degree,
                                  FieldStudy: Education[i].FieldStudy,
                                  University: Education[i].University,
                                  GraduationMonth: Education[i].GraduationMonth,
                                  GraduationDate: e.target.value === ""
                                    ? Education[i].GraduationDate
                                    : e.target.value,
                                  status_enum_id: 1,
                                };
                                const obj3 = Uobj.map((edu, i1) => {
                                  if (i1 === i)
                                    return newEdu4;
                                  else
                                    return edu;

                                })
                                console.log(e.target.value);
                                console.log(obj3)
                                dispatch(UpdateEducation(obj3));
                              }
                            }}
                            className="MuiSelect-root MuiSelect-select MuiInputBase-input MuiInput-input"
                            style={{
                              width: "100%",
                              borderRadius: "6px",
                              height: "5vh",
                            }}
                          >
                            {/* <option value="" disabled="">
                                Year
                              </option> */}
                            {edu.GraduationDate !== "" ? (<>
                              <option value={edu.GraduationDate} disabled="">
                                {OptionObj.Dvalue}
                              </option>
                              {SelectOptionData.GDateData.data.map((d) => {
                                if (edu.GraduationDate !== d.enum_id)
                                  return (
                                    <option value={d.enum_id}>
                                      {d.enum_key}
                                    </option>
                                  );
                              })}
                            </>) : (
                              <>
                                <option value={edu.GraduationDate} disabled="">
                                  {OptionObj.Dvalue}
                                </option>
                                {SelectOptionData.GDateData.data.map((d) => {

                                  return (
                                    <option value={d.enum_id}>
                                      {d.enum_key}
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
                }
              })
              }
            </table>

            <div className="d-flex flex-column">

              <button
                className="my-2 btn btn-primary rounded"
                onClick={() => SaveUpdatedEdu()}
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
