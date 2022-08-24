import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { Input } from "@mui/material";
import { EducationDatas, UpdateEducation, UserProfileData,OptionData, UserEducationData } from "../../../ReduxStateManagement/actions/Action";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export const UpdateEducationbox = ({ onClose,updateId,university,fieldStudy,degree,Month,Date }) => {
    const [Degree, setDegree] = useState("");
    const [FieldStudy, setFieldStudy] = useState("");
    const [University, setUniversity] = useState("");
    const [GraduationMonth, setGraduationMonth] = useState("");
    const [GraduationDate, setGraduationDate] = useState("");
    const SelectOptionData = useSelector(state => state.UpdateDatas.OptionDatas)
    const Education = useSelector(state => state.UpdateDatas.Education);
    const dispatch = useDispatch();
    const eduState=useSelector((state)=>state.EduState);
  const SaveUpdatedEdu1 = () => {
    
      const newEdu1={
        Id:updateId,
        Degree:(Degree==='')?Education[updateId].Degree:Degree,
        FieldStudy:(FieldStudy==='')?Education[updateId].FieldStudy:FieldStudy,
        University:University===''?Education[updateId].University:University,
        GraduationMonth:GraduationMonth===''?Education[updateId].GraduationMonth:GraduationMonth,
        GraduationDate:GraduationDate===''?Education[updateId].GraduationDate:GraduationDate,
      }
     const Udata= Education.map((ed,i)=>{
        if(i===updateId)
        {
            return newEdu1;
        }
        else
        {
            return ed;
        }
      })
      console.log(Udata);
      console.log(updateId);
      // dispatch(UpdateEducation(
      //   Udata
      // )
      // )
      // dispatch(UpdateEducation([...Education,Udata]));
    
    onClose();
    
  };
  return (
    <>
      <div
        className="rounded"
        style={{
          backgroundColor: "rgb(138 138 146 / 68%)",
          height: "75vh",
          margin: "15%",
          top: "-13%", //-11%
          left: "0",
          right: "0",
          bottom: "0",
          position: "fixed",
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
            <form>
              <table style={{ width: "100%" }}>
                <tbody>
                  <tr>
                    <td className="h2">Degree</td>
                  </tr>
                  <tr>
                    <td>
                      <select
                        onChange={(e) => {
                          setDegree(e.target.value);
                        }}
                        className="MuiSelect-root MuiSelect-select MuiInputBase-input MuiInput-input"
                        style={{
                          width: "100%",
                          borderRadius: "6px",
                          height: "5vh",
                        }}
                      >
                        <option value="" disabled="true">
                          Your Degree
                        </option>
                        <option value={Education[updateId].Degree} disabled="">
                          {degree}
                        </option>
                        {SelectOptionData.DegreeNameData.data.map((d)=>{
                             if(Education[updateId].Degree!==d.degree_id)
                            return <option value={d.degree_id}>{d.degree_name}</option>
                        })}
                        
                        
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
                          setFieldStudy(e.target.value);
                        }}
                        className="MuiSelect-root MuiSelect-select MuiInputBase-input MuiInput-input"
                        style={{
                          width: "100%",
                          borderRadius: "6px",
                          height: "5vh",
                        }}
                      >
                        <option value="" disabled="true">
                          Your Field of Study
                        </option>
                        <option value={Education[updateId].FieldStudy} disabled="">
                          {fieldStudy}
                        </option>
                        {SelectOptionData.FieldStudyData.data.map((d)=>{
                            if(Education[updateId].FieldStudy!==d.filed_of_study_id)
                            return <option value={d.filed_of_study_id}>{d.filed_of_study_name}</option>
                        })}
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
                          setUniversity(e.target.value);
                        }}
                        className="MuiSelect-root MuiSelect-select MuiInputBase-input MuiInput-input"
                        style={{
                          width: "100%",
                          borderRadius: "6px",
                          height: "5vh",
                        }}
                      >
                        <option value="" disabled="true">
                          Your University
                        </option>
                        <option value={Education[updateId].University} disabled="">
                          {university}
                        </option>
                        {SelectOptionData.UniversityNameData.data.map((d)=>{
                            if(Education[updateId].University!==d.university_id)
                            return <option value={d.university_id}>{d.university_name}</option>
                        })}
                       
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
                          setGraduationMonth(e.target.value);
                        }}
                        className="MuiSelect-root MuiSelect-select MuiInputBase-input MuiInput-input"
                        style={{
                          width: "100%",
                          borderRadius: "6px",
                          height: "5vh",
                        }}
                      >
                        <option value="" disabled="true">
                          Month
                        </option>
                        <option value={Education[updateId].GraduationMonth} disabled="">
                          {Month}
                        </option>
                        {SelectOptionData.GMonthData.data.map((d)=>{
                          if(Education[updateId].GraduationMonth!==d.enum_id)
                            return <option value={d.enum_id}>{d.enum_key}</option>
                        })}
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
                          setGraduationDate(e.target.value);
                        }}
                        className="MuiSelect-root MuiSelect-select MuiInputBase-input MuiInput-input"
                        style={{
                          width: "100%",
                          borderRadius: "6px",
                          height: "5vh",
                        }}
                      >
                        <option value="" disabled="true">
                          Year
                        </option>
                        <option value={Education[updateId].GraduationDate} disabled="">
                          {Date}
                        </option>
                        {SelectOptionData.GDateData.data.map((d)=>{
                          if(Education[updateId].GraduationDate!==d.enum_id)
                            return <option value={d.enum_id}>{d.enum_key}</option>
                        })}
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
