import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../../Axios";
import axios from "axios"
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { ExperienceModal } from "./ExperienceModal";
import {
  setExperienceData,
  setExperienceOptions,
  setExperienceState,
} from "../../../ReduxStateManagement/actions/Action";
export const ExperienceTable = () => {
  const [isDesc, setIsDesc] = useState(false);
  const [YesNoState, setYesNoState] = useState();
  const [displayExperienceData, setdisplayExperienceData] = useState([]);

  const profiledata = useSelector((state) => state.ProfileData);
  const Experience = useSelector((state) => state.UpdateDatas.ExperienceState);
  const ExperienceData = useSelector(
    (state) => state.UpdateDatas.ExperienceData
  );
  const SelectOptionData = useSelector(
    (state) => state.UpdateDatas.ExperienceOptions
  );
  const [ExpStateData, setExpStateData] = useState(0);
  const dispatch = useDispatch();
  const newExp = {
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
  const OptionDatas = async () => {
    const WorkExp = await Axios.get(
      "getcondition?enum_id=0&enum_type_name=Condition"
    );
    const JobType = await Axios.get(
      `employmenttype?enum_id=0&enum_type_name=Type%20of%20employment`
    );
    const nullData = [{}];
    const EMonth = await Axios.get(
      `getmonth?enum_id=0&enum_type_name=Month`
      
    );
    const EYear = await Axios.get(
      `getyear?enum_id=0&enum_type_name=Year`
    );
    axios
      .all([WorkExp, JobType, nullData, EMonth, EYear])
      .then(
        axios.spread((...allData) => {
          const WorkExpData = allData[0].data;
          const JobTypeData = allData[1].data;
          const nullDataData = allData[2].data;
          const EMonthData = allData[3].data;
          const EYearData = allData[4].data;
          const ExpData = {
            WorkExpData: WorkExpData,
            JobTypeData: JobTypeData,
            nullDataData: nullDataData,
            EMonthData: EMonthData,
            EYearData: EYearData,
          };
          //
          dispatch(setExperienceOptions(ExpData));
        })
      )
      .catch((error) => {
        alert(error);
      });
  };
  useEffect(() => {
    OptionDatas();
  }, []);

  // const profileExp = async () => {
  //   const res = await Axios
  //     .get("userworkexperince?user_id=1097")
  //     .catch((error) => {
  //       alert(error);
  //     });
  //   let obj4 = [];
  //   res.data.data.map((res) => {
  //     const newExpData = {
  //       user_work_experience_id: res.user_work_experience_id,
  //       currently_workinng: res.currently_workinng,
  //       job_type_enum_id: res.job_type_enum_id,
  //       company_name: res.company_name,
  //       work_on_month: res.start_work_on_month_id,
  //       work_on_year: res.start_work_on_year_id,
  //       status_enum_id: res.status_enum_id,
  //       last_work_month: res.last_work_month_id,
  //       last_work_year: res.last_work_year_id,
  //     };
  //     obj4 = [...obj4, newExpData];
  //   });
  //   dispatch(setExperienceState(obj4));
  //   dispatch(setExperienceData(res.data.data));
  //   let YesNo = [];
  //   for (var i = 0; i < obj4.length; i++) {
  //     YesNo = [...YesNo,(obj4[i].currently_workinng==="134")? false:true];
  //   }
  //   setYesNoState(YesNo);
  //   // console.log(Experience);
  // };
  // useEffect(() => {
  //   profileExp();
  // }, []);
  const deleteExperience = (index) => {
        const deletedExp = Experience.filter((edu, i) => {
            return i !== index;
        })
        dispatch(setExperienceState(deletedExp));
        const postExp = {
            "user_id": 1097,
            "user_work_experience_json": deletedExp,
            "actionby_id": 1097
        }
        if (Experience.length !== 0) {
            Axios.post("updatestudentworkexperience", postExp)
                .then((response) => {
                    if (response.data.statuscode === 200) {
                        console.log(1);
                        // profileExp();
                    }
                    else
                        console.log(2);
                })
                .catch((error) => {
                    alert(error);
                })
        }
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
              <div className="col-10 h2">Experience</div>
              <div className="col-2 d-flex justify-content-center align-items-center">
                <EditIcon
                  onClick={() => {
                    setIsDesc(true);
                    // if(Experience.length>=1)
                    // if(Experience[Experience.length-1].currently_workinng!=="")
                    dispatch(setExperienceState([...Experience, newExp]));
                  }}
                  style={{ float: "right" }}
                ></EditIcon>
                <ExperienceModal
                  open={isDesc}
                  onClose={() => {
                    setIsDesc(false);
                    Experience.pop();
                  }}
                  YesNoState={YesNoState}
                  setYesNoState={setYesNoState}
                  setExpStateData={setExpStateData}
                  setIsDesc={setIsDesc}
                />
              </div>
            </div>
          </th>
        </thead>
        <tbody className="mx-2">
          <tr>
            {Experience.length === 0 ? (
              <>
                <td
                  className="d-flex justify-content-center align-items-center mx-5"
                  style={{ height: "50vh" }}
                >
                  Add your Experience
                </td>
              </>
            ) : (
              <td className="p-4" style={{}}>
                {ExpStateData !== 0
                  ? Experience.map((ed, i) => {
                      if (ed.currently_workinng !== "" && ed.job_type_enum_id!=="" && ed.work_on_month!=="" && ed.work_on_year!=="") {
                        const JobTypedatas =
                          SelectOptionData.JobTypeData.data.filter((fd) => {
                            return fd.enum_id === ed.job_type_enum_id;
                          });
                        //   let LMonth=[],LYear=[];
                        // if(ed.currently_workinng==="135")
                        
                        const LMonth = SelectOptionData.EMonthData.data.filter(
                          (lm) => {
                            return ed.last_work_month === lm.enum_id;
                          }
                        );
                        const LYear = SelectOptionData.EYearData.data.filter(
                          (ly) => {
                            return ed.last_work_year === ly.enum_id;
                          }
                        )
                        const SMonth = SelectOptionData.EMonthData.data.filter(
                          (gmd) => {
                            return gmd.enum_id === ed.work_on_month;
                          }
                        );
                        const SYear = SelectOptionData.EYearData.data.filter(
                          (gdd) => {
                            return gdd.enum_id === ed.work_on_year;
                          }
                        );
                        console.log(i,SMonth);
                        console.log(i,SYear);
                        console.log(i,LMonth);
                        console.log(i,LYear);
                        return (
                          <>
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
                                  onClick={() => deleteExperience(i)}
                                />
                                <>
                                  <h6 className="card-title">
                                    {ed.company_name===null?"":ed.company_name}
                                  </h6>
                                  <h5 className="card-subtitle mb-2 text-muted">
                                    {JobTypedatas.length===0?"":JobTypedatas[0].enum_display}
                                  </h5>
                                  {(ed.currently_workinng === "135" && LMonth.length!==0 && LYear.length!==0)  ? (
                                    <p
                                      className="card-text"
                                      style={{ float: "right" }}
                                    >
                                      {console.log(SMonth[0].enum_display+" "+SYear[0].enum_display+"/"+LMonth[0].enum_display+" "+LYear[0].enum_display)}
                                      {SMonth[0].enum_display +
                                        "/" +
                                        SYear[0].enum_display +
                                        "-" 
                                        +
                                       LMonth[0].enum_display+
                                        "/" +
                                       LYear[0].enum_display}
                                    </p>
                                  ) : (
                                    <p
                                      className="card-text"
                                      style={{ float: "right" }}
                                    >
                                      {console.log(SMonth[0].enum_display+" "+SYear[0].enum_display)}
                                      {SMonth[0].enum_display +
                                        "/" +
                                        SYear[0].enum_display +
                                        "- Present"}
                                    </p>
                                  )}
                                </>
                              </div>
                            </div>
                          </>
                        );
                      }
                    })
                  : ExperienceData.map((u, i) => {
                      return (
                        <>
                          <div className="card my-3" style={{ width: "28rem" }}>
                            <div className="card-body">
                              <DeleteIcon
                                style={{
                                  position: "absolute",
                                  right: "5px",
                                  cursor: "pointer",
                                }}
                                onClick={() => deleteExperience(i)}
                              />

                              <>
                                <h6 className="card-title">{u.company_name}</h6>
                                <h5 className="card-subtitle mb-2 text-muted">
                                  {u.job_type_name}
                                </h5>
                                {u.currently_workinng !== "134" ? (
                                  <p
                                    className="card-text"
                                    style={{ float: "right" }}
                                  >
                                    {u.start_work_on_month_name +
                                      "/" +
                                      u.start_work_on_year +
                                      "-" +
                                      u.last_work_month_name +
                                      "/" +
                                      u.last_work_on_year}
                                  </p>
                                ) : (
                                  <p
                                    className="card-text"
                                    style={{ float: "right" }}
                                  >
                                    {u.start_work_on_month_name +
                                      "/" +
                                      u.start_work_on_year +
                                      "- Present"}
                                  </p>
                                )}
                              </>
                            </div>
                          </div>
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
