import React, { useEffect, useState } from 'react'
import EditIcon from "@mui/icons-material/Edit";
import { Modal } from "../Description/Modal";
import { useSelector } from "react-redux";
import {ModalEdu} from '../Education/ModalEdu'
import axios from 'axios';
import { ModalRE } from './ModalRE';
export const RoleExceptionTable = () => {
  const [isDesc, setIsDesc] = useState(false);
  const profiledata = useSelector((state) => state.ProfileData);
  const Education = useSelector(state => state.UpdateDatas.Education);
  const [EducationData,setEducationData]=useState([]);
  console.log( Education.Degree)
  const fetchEducationData=()=>{
    const degreeName=axios.get(`https://develop.hipoz.com/api/getdegree?degree_id=${Education.Degree}&status_enum_id=1`);
    const FieldStudyName=axios.get(`https://develop.hipoz.com/api/getfieldofStudy?filed_of_study_id=${Education.FieldStudy}&status_enum_id=1`);
    const UniversityName=axios.get(`https://develop.hipoz.com/api/getuniversity?university_id=${Education.University}&status_enum_id=1`);
    const GMonth=axios.get(`https://develop.hipoz.com/api/getmonth?enum_id=${Education.GraduationMonth}&enum_type_name=Month`);
    const GDate=axios.get(`https://develop.hipoz.com/api/getyear?enum_id=${Education.GraduationDate}&enum_type_name=Year`);
    axios.all([degreeName,FieldStudyName,UniversityName,GMonth,GDate]).then(
        axios.spread((...allData)=>{
          const DegreeNameData=allData[0].data;
          const FieldStudyData=allData[1].data;
          const UniversityNameData=allData[2].data;
          const GMonthData=allData[3].data;
          const GDateData=allData[4].data;
          const EduData={
            DegreeNameData:DegreeNameData,
            FieldStudyData:FieldStudyData,
            UniversityNameData:UniversityNameData,
            GMonthData:GMonthData,
            GDateData:GDateData,
          }
          setEducationData([...EducationData,EduData]);
        })
    ).catch((error)=>{
      alert(error);
    })
  }
  useEffect(() => {
    fetchEducationData();
  }, [])
  console.log(EducationData);
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
              <div className="col-10 h2">Role Exception</div>
              <div className="col-2 d-flex justify-content-center align-items-center">
                <EditIcon
                  onClick={() => {
                    setIsDesc(true);
                  }}
                  style={{ float: "right" }}
                />
                <ModalRE
                  open={isDesc}
                  onClose={() => {
                    setIsDesc(false);
                  }}
                />
              </div>
            </div>
          </th>
        </thead>
        <tbody className="mx-2">
          <tr>
            {EducationData === null ? (
              <>
                <td
                  className="d-flex justify-content-center align-items-center mx-5"
                  style={{ height: "50vh" }}
                >
                  Add Role Exception Details
                </td>
              </>
            ) : (
              <td className="p-4" style={{}}>
                {
                  
                  //   <div className="card" style={{"width": "18rem"}}>
                  //   <div className="card-body">
                  //     <h5 className="card-title">{ed.}</h5>
                  //     <h6 className="card-subtitle mb-2 text-muted">{ed.+" "+ed.}</h6>
                  //     <p className="card-text">{ed.GMonthData+"/"+ed.}</p>
                  //   </div>
                  // </div>
                  
                }
                
              </td>
            )}
          </tr>
        </tbody>
      </table> 
        </>
    )
}
