import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import {
  LanguageState,
} from "../../ReduxStateManagement/actions/Action";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
export const LanguageDialogBox = ({ onClose, Lcount }) => {
  const newEdu = {
    user_language_id: "",
    language_enum_id: "",
    language_level_enum_id: "",
    status_enum_id: "",
  };
  const [Languagename, setLanguagename] = useState("");
  const [LangLevel, setLangLevel] = useState("");
  const LanguageOptions = useSelector(
    (state) => state.UpdateDatas.LanguageOption
  );
  const dispatch = useDispatch();
  const Language = useSelector((state) => state.UpdateDatas.Language);
  const Level = useSelector((state) => state.UpdateDatas.Level);
  let copyLang = Language;
  const profileLang = async () => {
    const res = await axios
      .get("https://develop.hipoz.com/api/userlanguage?user_id=1097")
      .catch((error) => {
        alert(error);
      });
  };
  const saveUpdatedLang = () => {
    
    console.log(copyLang);
    copyLang.pop();
    const newLang = {
      user_language_id: 0,
      language_enum_id: Languagename,
      language_level_enum_id: LangLevel,
      status_enum_id: 1,
    };
    if (Languagename !== "" && LangLevel !== "")
      copyLang = [...copyLang, newLang];
    console.log(copyLang);
    const postLang = {
      user_id: 1097,
      user_language_json: copyLang,
      actionby_id: 1097,
    };
    axios
      .post("https://develop.hipoz.com/api/updatestudentlanguage", postLang)
      .then((res) => {
        if (res.data.statuscode === 200) profileLang();
      })
      .catch((error) => {
        alert(error);
      });
    dispatch(LanguageState(copyLang));
    onClose();
  };
  const AddAnotherLang = () => {
    copyLang.pop();
    const newLang = [
      {
        user_language_id: 0,
        language_enum_id: Languagename,
        language_level_enum_id: LangLevel,
        status_enum_id: 1,
      },
      {
        user_language_id: "",
        language_enum_id: "",
        language_level_enum_id: "",
        status_enum_id: "",
      },
    ];
    copyLang = copyLang.concat(newLang);
    dispatch(LanguageState(copyLang));
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
                Language.pop();
                // copyLang=Language;
              }}
            >
              <CloseIcon />
            </button>
          </div>
          <div className="px-4" style={{ paddingTop: "5%" }}>
            <table style={{ width: "100%" }}>
              {Language.map((l, i) => {
                const Lname = LanguageOptions.filter((lod) => {
                  return l.language_enum_id === lod.language_id;
                });
                const Llevel = Level.filter((level) => {
                  return l.language_level_enum_id === level.enum_id;
                });
                return (
                  <tbody
                    style={{
                      border: "3px solid black",
                      borderStyle: "dashed dotted double dashed",
                    }}
                  >
                    <tr>
                      <td className="h2">Add Language</td>
                    </tr>
                    <tr>
                      <td>
                        <select
                          style={{
                            width: "100%",
                            borderRadius: "6px",
                            height: "5vh",
                          }}
                          onChange={(e) => {setLanguagename((i===Language.length-1)?e.target.value:"")
                            const newLang = {
                              user_language_id: Language[i].user_language_id,
                              language_enum_id: e.target.value,
                              language_level_enum_id: Language[i].language_level_enum_id,
                              status_enum_id: Language[i].status_enum_id,
                            };  
                             const obj=copyLang.map((c,i1)=>{
                              if(i1===i)
                                return newLang;
                              else
                                return c;
                            })
                            // copyLang=obj;
                            dispatch(LanguageState(obj));
                          }}
                        >
                          {Language[i].language_enum_id === "" ||
                          Language[i].language_level_enum_id === "" ? (
                            <>
                              <option value="">Select Language</option>
                              {LanguageOptions.map((lo) => {
                                return (
                                  <option value={lo.language_id}>
                                    {lo.language_name}
                                  </option>
                                );
                              })}
                            </>
                          ) : (
                            <>
                              <option value={Language[i].language_enum_id}>
                                {Lname[0].language_name}
                              </option>
                              {LanguageOptions.map((lo) => {
                                if (lo.language_enum_id !== l.language_enum_id)
                                  return (
                                    <option value={lo.language_id}>
                                      {lo.language_name}
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
                          onChange={(e) =>{setLangLevel((i===Language.length-1)?e.target.value:"")
                            const newLang = {
                              user_language_id: Language[i].user_language_id,
                              language_enum_id: Language[i].language_enum_id,
                              language_level_enum_id:e.target.value,
                              status_enum_id: Language[i].status_enum_id,
                            }; 
                            const obj=copyLang.map((c,i1)=>{
                              if(i1===i)
                                return newLang;
                              else
                                return c;
                            })
                            // copyLang=obj;
                            dispatch(LanguageState(obj));
                          }}
                        >
                          {Language[i].language_enum_id === "" ||
                          Language[i].language_level_enum_id === "" ? (
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
                              <option value={Language[i].language_level_enum_id}>
                                {Llevel[0].enum_display}
                              </option>
                              {Level.map((lo) => {
                                if (lo.language_level_enum_id !== l.language_level_enum_id)
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
