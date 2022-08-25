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
  LanguageState,
  OptionData,
  setLevel,
  UpdateEducation,
  UserEducationData,
} from "../../../ReduxStateManagement/actions/Action";
import { LanguageModal } from "./LanguageModal";
export const LanguageTable = () => {
  const [isDesc, setIsDesc] = useState(false);
  const profiledata = useSelector((state) => state.ProfileData);
  const LanguageOptions = useSelector(
    (state) => state.UpdateDatas.LanguageOption
  );
  const Language = useSelector((state) => state.UpdateDatas.Language);
  const LanguageDatas = useSelector((state) => state.UpdateDatas.LanguageData);
  const Level = useSelector((state) => state.UpdateDatas.Level);
  const dispatch = useDispatch();
  const newEdu = {
    user_language_id: "",
    language_enum_id: "",
    language_level_enum_id: "",
    status_enum_id: "",
  };

  // useEffect(() => {

  //   dispatch(UpdateEducation([...Education,newEdu]))
  // }, [])
  // dispatch(UpdateEducation([...Education,newEdu]))
  const OptionDatas = async () => {
    const res = await axios(
      "https://develop.hipoz.com/api/getlanguage?language_id=0&status_enum_id=1"
    ).catch((error) => {
      alert(error);
    });
    dispatch(LanguageOptionData(res.data.data));
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

  // const profileLang = async () => {
  //   const res = await axios
  //     .get("https://develop.hipoz.com/api/userlanguage?user_id=1097")
  //     .catch((error) => {
  //       alert(error);
  //     });
  //   dispatch(LanguageData(res.data.data));
  //   const obj = res.data.data.map((res) => {
  //     const obj2 = {
  //       user_language_id: res.user_language_id,
  //       language_enum_id: res.language_enum_id,
  //       language_level_enum_id: res.language_level_enum_id,
  //       status_enum_id: res.status_enum_id,
  //     };
  //     return obj2;
  //   });
  //   dispatch(LanguageState(obj));
  // };
  useEffect(() => {
    // profileLang();
  }, []);
  const deleteLanguage = (index) => {
     const deletedLang=Language.filter((lang,i)=>{
        return i!==index;
     })
     dispatch(LanguageState(deletedLang));
     const postLang = {
      user_id: 1097,
      user_language_json: deletedLang,
      actionby_id: 1097,
    };
    axios
      .post("https://develop.hipoz.com/api/updatestudentlanguage", postLang)
      .then((res) => {
        if (res.data.statuscode === 200) {}
            // profileLang();
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
              <div className="col-10 h2">Language</div>
              <div className="col-2 d-flex justify-content-center align-items-center">
                <AddIcon
                  onClick={() => {
                    setIsDesc(true);
                    dispatch(LanguageState([...Language, newEdu]));
                    setLcount(1);
                  }}
                  style={{ float: "right" }}
                ></AddIcon>
                <LanguageModal
                  open={isDesc}
                  onClose={() => {
                    setIsDesc(false);
                    // Language.pop();
                  }}
                  Lcount={Lcount}
                />
              </div>
            </div>
          </th>
        </thead>
        <tbody className="mx-2">
          <tr>
            {Language.length === 0 ? (
              <>
                <td
                  className="d-flex justify-content-center align-items-center mx-5"
                  style={{ height: "50vh" }}
                >
                  Add Language
                </td>
              </>
            ) : Lcount == 0 ? (
              <>
                <td className="p-4" style={{}}>
                  {LanguageDatas.map((l, i) => {
                    if (
                      l.language_enum_id !== "" &&
                      l.language_level_enum_id !== ""
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
                                      {l.language_name}
                                    </h6>
                                    <h2>{l.level_name}</h2>
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
                  {Language.map((l, i) => {
                    if (
                      l.language_enum_id !== "" &&
                      l.language_level_enum_id !== ""
                    ) {
                      const Lname = LanguageOptions.filter((lod) => {
                        return l.language_enum_id === lod.language_id;
                      });
                      const Llevel = Level.filter((level) => {
                        return l.language_level_enum_id === level.enum_id;
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
                                      {Lname[0].language_name}
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
