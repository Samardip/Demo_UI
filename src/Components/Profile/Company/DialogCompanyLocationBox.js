import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCompanyLocation, UserProfileData } from "../../../ReduxStateManagement/actions/Action";
export const DialogCompanyLocationBox = ({ onClose }) => {
  const [data, setdata] =useState({});
  let obj8=[];
  const Company = useSelector(state => state.UpdateDatas.CompanyLocation)
  const LocationOptions=useSelector((state)=>state.UpdateDatas.LocationOptions);
  const dispatch = useDispatch();
  const profileJob=async () => {
    const res =await axios
    .get(
      "https://develop.hipoz.com/api/userprofile?user_id=1097&status_enum_id=1"
    )
    .catch((error) => {
      alert(error);
    });
  dispatch(UserProfileData(res.data.data));
  }
  let obj6=[];
  obj6=LocationOptions;
  const obj4 =
    obj6 === undefined
      ? []
      : obj6.map((d) => {
          return { title: d.country_name,
                   id:d.country_id, };
        });
  console.log(obj4);
  optionsdetails=obj4;
  const handlechange=(val)=>{
    // setdata(val);
    obj8=val;
  }
  const defalutobj=Company.map((is,i)=>{
    const equalobj=optionsdetails.filter((j,i1)=>{
      return(is===j.title);
    })
    // console.log(equalobj);
    const obj={title:equalobj[0].title,id:equalobj[0].id};
    return(obj)
  })

console.log(defalutobj);
  const SaveUpdatedDesc = () => {
    if(Company.length!==0 && obj8.length===0)
      obj8=defalutobj;
    console.log(obj8);
    const obj3=obj8===undefined?[]:obj8.map((d)=>{
      return d.id;
    })
    const obj31=obj8===undefined?[]:obj8.map((d)=>{
      return d.title;
    })
    console.log(obj31);
    dispatch(setCompanyLocation(obj31));
    const interestedpost = {
      pref_country_location_id: obj3,
      actionby_id: 1097,
      user_id: 1097,
    };
    axios
      .post("https://develop.hipoz.com/api/updatestudentprefcountrylocation", interestedpost)
      .then((response) => {
        if (response.data.statuscode === 200) {
          profileJob();          
      }
      })
      .catch((error) => {
        alert(error);
      });

    onClose();
  };  
 
let arrayObj=[];
 for(var i=0;i<Company.length;i++)
 {
   for(var j=0;j<optionsdetails.length;j++)
   {
     if(Company[i]===optionsdetails[j].title)
     {
        arrayObj=[...arrayObj,j];
     }
   }
 }
 console.log(arrayObj);
  return (
    <>
      <div
        className="rounded"
        style={{
          backgroundColor: "#1f1f1f1a",
          height: "45vh",
          margin: "15%",
          top: "-11%", //-11%
          left: "0",
          right: "0",
          bottom: "0",
          position: "fixed",
        }}
      >
        <div className="">
          <div className="float-right">
            <button onClick={() => SaveUpdatedDesc()}>
              <DoneIcon />
            </button>
            <button className="mx-2" onClick={onClose}>
              <CloseIcon />
            </button>
          </div>
          <div className="px-4" style={{ paddingTop: "5%" }}>
            <form>
              <table style={{width:"100%"}}>
                <tbody>
                  <tr>
                    <td className="h1" style={{ color: "black" }}>
                      Enter Job Type
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {
                        <>
                        {
                         
                          (
                            <Autocomplete
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label=""
                                  placeholder=""
                                  // onMouseOut={()=>setdata(obj8)}
                                />
                              )}
                              style={{ backgroundColor: "white" }}
                              multiple
                              //limitTags={2}
                              id="multiple-limit-tags"
                              options={optionsdetails}
                              defaultValue={arrayObj.map((a)=>{
                                    return optionsdetails[a];
                              })}
                                // console.log(obj);
                               
                              getOptionLabel={(option) => option.title}
                              onChange={(e,value) => {
                                // setdata(value)
                                //obj8=value
                                handlechange(value);
                                // setdata(obj8);
                                // console.log(obj8);
                                  // params.InputProps.startAdornment);
                                
                              }}
                              
                              // defaultValue={data.map((d)=>{
                              //   return d;
                              // })}
                              
                              placeholder="Enter preference"
                            />
                          )
                        }
                        </>
                      }
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
let optionsdetails = [{title:"",id:""}];