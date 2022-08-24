import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Modal } from "../Description/Modal";
import { useDispatch, useSelector } from "react-redux";
import { ModalEdu } from "../Education/ModalEdu";
import { ModalUpdateEdu } from "../Education/ModalUpdateEdu";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  EducationDatas,
  EducationState,
  LanguageData,
  LanguageOptionData,
  OptionData,
  setLevel,
  setSkillData,
  setSkillOption,
  setSkillState,
  UpdateEducation,
  UserEducationData,
} from "../../../ReduxStateManagement/actions/Action";
import { SkillModal } from "./SkillModal";
export const SkillTable = () => {
  const [isDesc, setIsDesc] = useState(false);
  const profiledata = useSelector((state) => state.ProfileData);
  const skillOptions = useSelector(
    (state) => state.UpdateDatas.SkillOption
  );
  const Skill = useSelector((state) => state.UpdateDatas.SkillState);
  const skillDatas = useSelector((state) => state.UpdateDatas.SkillData);
  const Level = useSelector((state) => state.UpdateDatas.Level);
  const dispatch = useDispatch();
  const newskill =  {
    user_skills_id: "",
    expertise_level_enum_id: "",
    skills_ids: "",
    status_enum_id: "",
  }

  // useEffect(() => {

  //   dispatch(UpdateEducation([...Education,newskill]))
  // }, [])
  // dispatch(UpdateEducation([...Education,newskill]))
  const OptionDatas = async () => {
    const res = await axios(
      "https://develop.hipoz.com/api/skills?skill_id=0&status_id=1"
    ).catch((error) => {
      alert(error);
    });
    dispatch(setSkillOption(res.data.data));
  };
  useEffect(() => {
    OptionDatas();
  }, []);
  const ExpertiseOptionDatas = async () => {
    const res = await axios(
      "https://develop.hipoz.com/api/expertiselevel?enum_id=0&enum_type_name=Expertise%20level"
    ).catch((error) => {
      alert(error);
    });
    dispatch(setLevel(res.data.data));
  };
  useEffect(() => {
    ExpertiseOptionDatas();
  }, []);

  const profileLang = async () => {
    const res = await axios
      .get("https://develop.hipoz.com/api/userskills?user_id=1097")
      .catch((error) => {
        alert(error);
      });
    if(res.data.data!==null)
      dispatch(setSkillData(res.data.data));
    const obj = res.data.data===null?[]:res.data.data.map((res) => {
      const obj2 = {
        user_skills_id: res.user_skills_id,
        expertise_level_enum_id: res.expertise_level_enum_id,
        skills_ids: res.skills_ids,
        status_enum_id: res.status_enum_id,
      };
      return obj2;
    });
    dispatch(setSkillState(obj));
  };
  useEffect(() => {
    profileLang();
  }, []);
  const deleteLanguage = (index) => {
     const deletedSlkill=Skill.filter((lang,i)=>{
        return i!==index;
     })
     dispatch(setSkillState(deletedSlkill));
     const postSkill = {
      user_id: 1097,
      skills_json: deletedSlkill,
      actionby_id: 1097,
    };
    axios
      .post("https://develop.hipoz.com/api/updatestudentskills", postSkill)
      .then((res) => {
        if (res.data.statuscode === 200) profileLang();
      })
      .catch((error) => {
        alert(error);
      });
  };
  const [Lcount, setLcount] = useState(0);
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
              <div className="col-10 h2">Skills</div>
              <div className="col-2 d-flex justify-content-center align-items-center">
                <AddIcon
                  onClick={() => {
                    setIsDesc(true);
                    dispatch(setSkillState([...Skill, newskill]));
                    setLcount(1);
                  }}
                  style={{ float: "right" }}
                ></AddIcon>
                <SkillModal
                  open={isDesc}
                  onClose={() => {
                    setIsDesc(false);
                    // Skill.pop();
                  }}
                  Lcount={Lcount}
                />
              </div>
            </div>
          </th>
        </thead>
        <tbody className="mx-2">
          <tr>
            {Skill.length === 0 ? (
              <>
                <td
                  className="d-flex justify-content-center align-items-center mx-5"
                  style={{ height: "50vh" }}
                >
                  Add Skill
                </td>
              </>
            ) : Lcount == 0 ? (
              <>
                <td className="p-4" style={{}}>
                  {skillDatas.map((l, i) => {
                    if (
                      l.skills_ids !== "" &&
                      l.expertise_level_enum_id !== ""
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
                                      {l.skills_name}
                                    </h6>
                                    <h2>{l.expertise_level_name}</h2>
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
                                    onClick={() => deleteLanguage(i)}
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
                  {Skill.map((l, i) => {
                    if (
                      l.skills_ids !== "" &&
                      l.expertise_level_enum_id !== ""
                    ) {
                      const Sname = skillOptions.filter((lod) => {
                        return l.skills_ids === lod.skills_id;
                      });
                      const Llevel = Level.filter((level) => {
                        return l.expertise_level_enum_id === level.enum_id;
                      });
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
                                      {Sname[0].skills_name}
                                    </h6>
                                    <h2>{Llevel[0].enum_display}</h2>
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
                                    onClick={() => deleteLanguage(i)}
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
