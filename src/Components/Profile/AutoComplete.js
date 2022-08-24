import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { JobType } from "../../ReduxStateManagement/actions/Action";
let obj6=[];
export default function AutoComplete({ data, setdata }) {
  
  const jobtype = useSelector((state) => state.UpdateDatas.Typeofjob);
  obj6=jobtype;
  let obj5 = [];
  var c = 0;

  for (var i = 0; i < joboptions.length; i++) {
    for (var j = 0; j < jobtype.length; j++) {
      if (jobtype[j] === joboptions[i].title) {
        c++;
        break;
      }
    }
    if (c === 0) {
      obj5 = [...obj5, joboptions[i]];
    }
    c = 0;
  }
  console.log(data);
  const obj4 =
    obj6 === undefined
      ? null
      : obj6.map((d) => {
          return { title: d };
        });
  console.log(obj4);
  // joboptions=obj4;
  return (
    <Autocomplete
      renderInput={(params) => (
        <TextField
          {...params}
          label=""
          placeholder=""
          onMouseOut={() => {
            setdata(params.InputProps.startAdornment);
          }}
        />
      )}
      style={{ backgroundColor: "white" }}
      multiple
      //limitTags={2}
      id="multiple-limit-tags"
      options={joboptions}
      getOptionLabel={(option) => option.title}
      defaultValue={obj4.map((d)=>{
        if(d.title==="Intern"){
          return joboptions[0];
        }
        else if(d.title==="Part Time")
         return joboptions[2];
        else
          return joboptions[1];
      })}
      // value={obj4}
      placeholder="Enter preference"
    />
  );
}
let joboptions = [
  { title: "Intern" },
  { title: "Full Time" },
  { title: "Part Time" },
];