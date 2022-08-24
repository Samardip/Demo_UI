import { AddCommentSharp } from "@material-ui/icons";
import { Input } from "@mui/material";
import React, { useState } from "react";
import { NewAdd } from "./NewAdd";

export const Addanother = () => {
    const[name,setName]=useState("");
  const [Count, setCount] = useState([{name:""}]);
  console.log(Count);
  const AddComp = () => {
    const obj1 = {
        name: name,
      };
    setCount([...Count, obj1]);
  };
  return (
    <div className="d-flex flex-column">
      {/* <Input type="text" onChange={(e)=>{setName(e.target.value)}}/> */}
      {Count.map((c, i) => {
         return <Input type="text"  onChange={(e)=>{setName(e.target.value)}}/>;
      })}
      <button>remove</button>
      <button
        onClick={() => {
          AddComp();
        }}
      >
        Add another
      </button>
    </div>
  );
};
 // const updatedEdu = {
                  //   user_id: 1097,
                  //   user_education_json: [
                  //     {
                  //       user_education_id: 0,
                  //       degree_id: ed.Degree,
                  //       field_of_study_id: ed.FieldStudy,
                  //       university_id: ed.University,
                  //       graduate_month_id: ed.GraduationMonth,
                  //       graduate_year_id: ed.GraduationDate,
                  //       status_enum_id: 1,
                  //     },
                  //   ],
                  //   actionby_id: 1097,
                  // };
                  // axios
                  //   .post(
                  //     "https://develop.hipoz.com/api/userestudenteducation",
                  //     updatedEdu
                  //   )
                  //   .then((response) => {
                  //     if (response.statuscode === 200) {
                  //       profileEdu();
                  //       // updateDetails();
                  //     }
                  //   })
                  //   .catch((error) => {
                  //     alert(error);
                  //   });
                  // const data={
                  //   University_details:University_details,
                  //   Field_of_study_details:Field_of_study_details,
                  //   degree_details:degree_details,
                  //   monthDetails:monthDetails,
                  //   dateDetails:dateDetails,
                  // }
                  // let updateId=i;
                  // console.log(updateId);




                  // userEducationData.map((ue,i)=>{
                //   const updateId=i;
                //     return (
                //       <>
                //         <div className="card my-3" style={{ width: "28rem" }}>
                //         <div className="card-body">
                //           <div className="d-flex" style={{ float: "right"}}>
                //             <div>
                //             <EditIcon
                //               onClick={() => {
                //                 setIsEdit(true);
                //               }}
                //             ></EditIcon>
                //             <ModalUpdateEdu
                //               open={isEdit}
                //               onClose={() => {
                //                 setIsEdit(false);
                //               }}
                //               updateId={updateId}
                //             />
                //           </div>
                //           <div>
                //             <DeleteIcon onClick={()=>{deleteEducation(updateId)}}/>
                //           </div>
                //           </div>

                    
                //           <h6 className="card-title">
                //             {ue.university_name}
                //           </h6>
                //           <h5 className="card-subtitle mb-2 text-muted">
                //             {ue.filed_of_study_name}
                //           </h5>
                //           <h4 className="card-subtitle mb-2 text-muted">
                //             {ue.degree_name}
                //           </h4>
                //           <p className="card-text" style={{ float: "right" }}>
                //             {ue.graduate_month_name +
                //               "/" +
                //               ue.graduate_year}
                //           </p>
                           
                          
                //         </div>
                //       </div>
                //       </>
                      
                //     )
                //     // const newEdudata={
                //     //   Degree:ue.degree_id,
                //     //   FieldStudy:ue.field_of_study_id,
                //     //   University:ue.university_id,
                //     //   GraduationMonth:ue.graduate_month_id,
                //     //   GraduationDate:ue.graduate_year_id,
                //     // }
                //     // dispatch(UpdateEducation([...Education,newEdudata]));
                // })



                // const updateDetails=async ()=>{
      //     const degreeName=await axios.get(`https://develop.hipoz.com/api/getdegree?degree_id=${Education.Degree}&status_enum_id=1`);
      //     const FieldStudyName=await axios.get(`https://develop.hipoz.com/api/getfieldofStudy?filed_of_study_id=${Education.FieldStudy}&status_enum_id=1`);
      //     const UniversityName=await axios.get(`https://develop.hipoz.com/api/getuniversity?university_id=${Education.University}&status_enum_id=1`);
      //     const GMonth=await axios.get(`https://develop.hipoz.com/api/getmonth?enum_id=${Education.GraduationMonth}&enum_type_name=Month`);
      //     const GDate=await axios.get(`https://develop.hipoz.com/api/getyear?enum_id=${Education.GraduationDate}&enum_type_name=Year`);
      //     axios.all([degreeName,FieldStudyName,UniversityName,GMonth,GDate]).then(
      //         axios.spread((...allData)=>{
      //           const DegreeNameData=allData[0].data;
      //           const FieldStudyData=allData[1].data;
      //           const UniversityNameData=allData[2].data;
      //           const GMonthData=allData[3].data;
      //           const GDateData=allData[4].data;
      //           const EduData={
      //             DegreeNameData:DegreeNameData,
      //             FieldStudyData:FieldStudyData,
      //             UniversityNameData:UniversityNameData,
      //             GMonthData:GMonthData,
      //             GDateData:GDateData,
      //           }
      //           // 
      //           dispatch(EducationDatas(EduData));
      //         })
      //     ).catch((error)=>{
      //       alert(error);
      //     })
      // }
      // useEffect(() => {
      //   updateDetails();
      // }, [])