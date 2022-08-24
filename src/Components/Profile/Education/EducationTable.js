import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Modal } from "../Description/Modal";
import { useDispatch, useSelector } from "react-redux";
import { ModalEdu } from "../Education/ModalEdu";
import { ModalUpdateEdu } from "../Education/ModalUpdateEdu";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from '@mui/icons-material/Delete';
import {
  EducationDatas,
  EducationState,
  OptionData,
  UpdateEducation,
  UserEducationData,
} from "../../../ReduxStateManagement/actions/Action";
export const EducationTable = () => {
  const [isDesc, setIsDesc] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [displayEducationData, setdisplayEducationData] = useState([]);

  const profiledata = useSelector((state) => state.ProfileData);
  const Education = useSelector((state) => state.UpdateDatas.Education);
  const userEducationData = useSelector((state) => state.UpdateDatas.UserEducationData);
  const SelectOptionData = useSelector(
    (state) => state.UpdateDatas.OptionDatas
  );
  const eduState = useSelector((state) => state.EduState);
  const dispatch = useDispatch();
  const newEdu = {
    user_education_id: 0,
    Degree: "",
    FieldStudy: "",
    University: "",
    GraduationMonth: "",
    GraduationDate: "",
    status_enum_id: 1,
  }
  
  // useEffect(() => {

  //   dispatch(UpdateEducation([...Education,newEdu]))
  // }, [])
  // dispatch(UpdateEducation([...Education,newEdu]))
  const OptionDatas = async () => {
    const degreeName = await axios.get(
      `https://develop.hipoz.com/api/getdegree?degree_id=0&status_enum_id=1`
    );
    const FieldStudyName = await axios.get(
      `https://develop.hipoz.com/api/getfieldofStudy?filed_of_study_id=0&status_enum_id=1`
    );
    const UniversityName = await axios.get(
      `https://develop.hipoz.com/api/getuniversity?university_id=0&status_enum_id=1`
    );
    const GMonth = await axios.get(
      `https://develop.hipoz.com/api/getmonth?enum_id=0&enum_type_name=Month`
    );
    const GDate = await axios.get(
      `https://develop.hipoz.com/api/getyear?enum_id=0&enum_type_name=Year`
    );
    axios
      .all([degreeName, FieldStudyName, UniversityName, GMonth, GDate])
      .then(
        axios.spread((...allData) => {
          const DegreeNameData = allData[0].data;
          const FieldStudyData = allData[1].data;
          const UniversityNameData = allData[2].data;
          const GMonthData = allData[3].data;
          const GDateData = allData[4].data;
          const EduData = {
            DegreeNameData: DegreeNameData,
            FieldStudyData: FieldStudyData,
            UniversityNameData: UniversityNameData,
            GMonthData: GMonthData,
            GDateData: GDateData,
          };
          //
          dispatch(OptionData(EduData));
        })
      )
      .catch((error) => {
        alert(error);
      });
  };
  useEffect(() => {
    OptionDatas();
  }, []);
  
  const profileEdu = async () => {
    const res = await axios
      .get("https://develop.hipoz.com/api/usereducation?user_id=1097")
      .catch((error) => {
        alert(error);
      });
      let obj4=[];
      res.data.data.map((res)=>{
        const newEduData = {
          user_education_id: res.user_education_id,
          Degree: res.degree_id,
          FieldStudy: res.field_of_study_id,
          University: res.university_id,
          GraduationMonth: res.graduate_month_id,
          GraduationDate: res.graduate_year_id,
          status_enum_id: 1,
        }
        obj4=[...obj4,newEduData];
      })
      dispatch(UpdateEducation(obj4));
      dispatch(UserEducationData(res.data.data));
      // console.log(Education);
  };

  // useEffect(() => {
  //   profileEdu();
    
  //   // dispatch(EducationState(1));
  // }, [])

  // const deleteEducation=(i)=>{
  //     const object=Education.filter((ed,i1)=>{
  //         return i!==i1;
  //     })
  //     dispatch(UpdateEducation(object));
  // }
  // console.log(obj4)
  const deleteEducation = (index) => {
     const deletedEdu=Education.filter((edu,i)=>{
        return i!==index;
     })
     dispatch(UpdateEducation(deletedEdu));
     let obj2=[];
     deletedEdu.map((ed, i) => {
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
  }
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
              <div className="col-10 h2">Education</div>
              <div className="col-2 d-flex justify-content-center align-items-center">
                <EditIcon
                  onClick={() => {
                    setIsDesc(true);
                    // if(Education.length>=1)
                    // if(Education[Education.length-1].Degree!=="")
                    dispatch(UpdateEducation([...Education, newEdu]))
                  }}
                  style={{ float: "right" }}
                ></EditIcon>
                <ModalEdu
                  open={isDesc}
                  onClose={() => {
                    setIsDesc(false);
                    Education.pop();
                  }}
                />
              </div>
            </div>
          </th>
        </thead>
        <tbody className="mx-2">
          <tr>
            {(Education.length === 0) ? (
              <>
                <td
                  className="d-flex justify-content-center align-items-center mx-5"
                  style={{ height: "50vh" }}
                >
                  Add your Education
                </td>
              </>
            ) : (
              <td className="p-4" style={{}}>

                {
                  
                  (eduState!==0?(
                      (Education).map((ed, i) => {
                      if (ed.Degree !== "") {
                        const University_details =
                          SelectOptionData.UniversityNameData.data.filter((ud) => {
                            return ud.university_id === ed.University;
                          });
                        const Field_of_study_details =
                          SelectOptionData.FieldStudyData.data.filter((fd) => {
                            return fd.filed_of_study_id === ed.FieldStudy;
                          });
                        const degree_details =
                          SelectOptionData.DegreeNameData.data.filter((dd) => {
                            return dd.degree_id === ed.Degree;
                          });
                        const monthDetails = SelectOptionData.GMonthData.data.filter(
                          (gmd) => {
                            return gmd.enum_id === ed.GraduationMonth;
                          }
                        );
                        const dateDetails = SelectOptionData.GDateData.data.filter(
                          (gdd) => {
                            return gdd.enum_id === ed.GraduationDate;
                          }
                        );

                        return (
                          <>

                            <div className="card my-3" style={{ width: "28rem" }}>
                              <div className="card-body">
                                <DeleteIcon style={{
                                  position: "absolute",
                                  right: "5px",
                                  cursor:"pointer"}}
                                  onClick={()=>deleteEducation(i)}/>
                                  

                                <>
                                  <h6 className="card-title">
                                    {University_details[0].university_name}
                                  </h6>
                                  <h5 className="card-subtitle mb-2 text-muted">
                                    {Field_of_study_details[0].filed_of_study_name}
                                  </h5>
                                  <h4 className="card-subtitle mb-2 text-muted">
                                    {degree_details[0].degree_name}
                                  </h4>
                                  <p className="card-text" style={{ float: "right" }}>
                                    {monthDetails[0].enum_display +
                                      "/" +
                                      dateDetails[0].enum_display}
                                  </p>
                                </>

                              </div>
                            </div>



                          </>
                        );
                      }
                    })
                  ):(
                    userEducationData.map((u,i)=>{
                      return (
                        <>

                          <div className="card my-3" style={{ width: "28rem" }}>
                            <div className="card-body">
                              <DeleteIcon style={{
                                position: "absolute",
                                right: "5px",
                                cursor:"pointer"}}
                                onClick={()=>deleteEducation(i)}
                                />


                              <>
                                <h6 className="card-title">
                                  {u.university_name}
                                </h6>
                                <h5 className="card-subtitle mb-2 text-muted">
                                  {u.field_of_study_name}
                                </h5>
                                <h4 className="card-subtitle mb-2 text-muted">
                                  {u.degree_name}
                                </h4>
                                <p className="card-text" style={{ float: "right" }}>
                                  {u.graduate_month_name +
                                    "/" +
                                    u.graduate_year}
                                </p>
                              </>

                            </div>
                          </div>



                        </>
                      );
                    })
                  )
                  
                  )
                }
                  
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </>
  );
};
