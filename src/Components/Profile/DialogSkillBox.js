import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setSkill, setSkillState, setSkillStateState } from "../../ReduxStateManagement/actions/Action";
export const DialogSkillBox = ({ onClose, Lcount }) => {
  const newskill =  {
    user_skills_id: "",
    expertise_level_enum_id: "",
    skills_ids: "",
    status_enum_id: "",
  }
  const [skillid, setSkillId] = useState("");
  const [LangLevel, setLangLevel] = useState("");
  const skillOptions = useSelector(
    (state) => state.UpdateDatas.SkillOption
  );
  const dispatch = useDispatch();
  const Skill = useSelector((state) => state.UpdateDatas.SkillState);
  const skillDatas = useSelector((state) => state.UpdateDatas.SkillData);
  const Level = useSelector((state) => state.UpdateDatas.Level);
  let copySkill = Skill;
  const profileLang = async () => {
    const res = await axios
    .get("https://develop.hipoz.com/api/userskills?user_id=1097")
    .catch((error) => {
      alert(error);
    });
  // dispatch(setSkillData(res.data.data));
  };
  const saveUpdatedLang = () => {
    
    // console.log(copySkill);
    copySkill.pop();
    const newskill = {
      user_skills_id: 0,
      skills_ids: skillid,
      expertise_level_enum_id: LangLevel,
      status_enum_id: 1,
    };
    // if (skillid !== "" && LangLevel !== "")
      copySkill = [...copySkill, newskill];
    // consolelog(copySkill);
    const copyskill2=copySkill.filter((c)=>{
      if(c.skills_ids!=="" && c.expertise_level_enum_id!=="")
      {
        return c;
      }
    })
    console.log(copyskill2);
    copySkill=copyskill2;
    const postSkill = {
      user_id: 1097,
      skills_json: copyskill2,
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
    dispatch(setSkillState(copySkill));
    onClose();
  };



  const AddAnotherLang = () => {
    copySkill.pop();
    const newskill = [
      {
        user_skills_id: 0,
        skills_ids: skillid,
        expertise_level_enum_id: LangLevel,
        status_enum_id: 1,
      },
      {
        user_skills_id: "",
        skills_ids: "",
        expertise_level_enum_id: "",
        status_enum_id: "",
      },
    ];
    copySkill = copySkill.concat(newskill);
    dispatch(setSkillState(copySkill));
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
            <button onClick={() => saveUpdatedLang()}>
              <DoneIcon />
            </button>
            <button
              className="mx-2"
              onClick={() => {
                onClose();
                Skill.pop();
                // copySkill=Skill;
              }}
            >
              <CloseIcon />
            </button>
          </div>
          <div className="px-4" style={{ paddingTop: "5%" }}>
            <table style={{ width: "100%" }}>
              {Skill.map((l, i) => {
                
                 const Sname = skillOptions.filter((lod) => {
                  return l.skills_ids === lod.skills_id;
                });
                console.log(Sname);
                const Llevel = Level.filter((level) => {
                  return l.expertise_level_enum_id === level.enum_id;
                });


                return (
                  <tbody
                    style={{
                      border: "3px solid black",
                      borderStyle: "dashed dotted double dashed",
                    }}
                  >
                    <tr>
                      <td className="h2">Add Skill</td>
                    </tr>
                    <tr>
                      <td>
                        <select
                          style={{
                            width: "100%",
                            borderRadius: "6px",
                            height: "5vh",
                          }}
                          onChange={(e) => {setSkillId((i===Skill.length-1)?e.target.value:"")
                            const newskill = {
                              user_skills_id: Skill[i].user_skills_id,
                              skills_ids: e.target.value,
                              expertise_level_enum_id: Skill[i].expertise_level_enum_id,
                              status_enum_id: Skill[i].status_enum_id,
                            };  
                             const obj=copySkill.map((c,i1)=>{
                              if(i1===i)
                                return newskill;
                              else
                                return c;
                            })
                            // copySkill=obj;
                            dispatch(setSkillState(obj));
                          }}
                        >
                          {Skill[i].skills_ids === "" ||
                          Skill[i].expertise_level_enum_id === "" ? (
                            <>
                              <option value="">Select Skill</option>
                              {skillOptions.map((lo) => {
                                return (
                                  <option value={lo.skills_id}>
                                    {lo.skills_name}
                                  </option>
                                );
                              })}
                            </>
                          ) : (
                            <>
                              <option value={Skill[i].skills_ids}>
                                {Sname===undefined?null:Sname[0].skills_name}
                              </option>
                              {skillOptions.map((lo) => {
                                if (lo.skills_ids !== l.skills_ids)
                                  return (
                                    <option value={lo.skills_id}>
                                      {lo.skills_name}
                                    </option>
                                  );
                              })}
                            </>
                          )}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>Level</td>
                    </tr>
                    <tr>
                      <td>
                        <select
                          style={{
                            width: "100%",
                            borderRadius: "6px",
                            height: "5vh",
                          }}
                          onChange={(e) =>{setLangLevel((i===Skill.length-1)?e.target.value:"")
                            const newskill = {
                              user_skills_id: Skill[i].user_skills_id,
                              skills_ids: Skill[i].skills_ids,
                              expertise_level_enum_id:e.target.value,
                              status_enum_id: Skill[i].status_enum_id,
                            }; 
                            const obj=copySkill.map((c,i1)=>{
                              if(i1===i)
                                return newskill;
                              else
                                return c;
                            })
                            // copySkill=obj;
                            dispatch(setSkillState(obj));
                          }}
                        >
                          {Skill[i].skills_ids === "" ||
                          Skill[i].expertise_level_enum_id === "" ? (
                            <>
                              <option value="">Select Mastery Level</option>
                              {Level.map((level) => {
                                return (
                                  <option value={level.enum_id}>
                                    {level.enum_display}
                                  </option>
                                );
                              })}
                            </>
                          ) : (
                            <>
                              <option value={Skill[i].expertise_level_enum_id}>
                                {Llevel[0].enum_display}
                              </option>
                              {Level.map((lo) => {
                                if (lo.enum_id !== l.expertise_level_enum_id)
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
                onClick={() => AddAnotherLang()}
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
