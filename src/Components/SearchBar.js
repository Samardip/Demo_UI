import React, { useEffect } from "react";
import { Buttons } from "./UI/Buttons";
import { InputNumbers } from "./UI/InputNumbers";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Input } from "@mui/material";
import {
  printSearchState,
  Search_name_data,
} from "../ReduxStateManagement/actions/Action";
import { useDispatch, useSelector } from "react-redux";
export const SearchBar = () => {
  const stylesheet = {
    "width": "300px",
    "height": "45px",
    "color": "cornflowerblue",
  };
  const dispatch = useDispatch();
  const SearchName = useSelector((state) => state.search_name);
  const StudentData = useSelector((state) => state.SDetails.datas);
  
  const displaySearchData = (e) => {
    //console.log(SearchName);
    dispatch(Search_name_data(e));
    if(SearchName!==""){
    const data=StudentData.filter((res)=>{
      //console.log(Object.values(res));
        return Object.values(res).join(" ").toLowerCase()
        .toLowerCase()
        .includes(SearchName.toLowerCase());
        
    });
    dispatch(printSearchState(data));
  }
  else
  {
    dispatch(printSearchState(StudentData));
  }
};
useEffect(() => { 
  displaySearchData("");
}, [])
  return (
    <>
      <div className="d-flex float-right my-3 border border-dark " style={{"borderRadius": "9px"}}>
        <div className="">
          <Input
            type="text"
            className=""
            style={stylesheet}
            placeholder="Enter Name to search data"
            required
            onChange={(e)=>displaySearchData(e.target.value)}
          />
        </div>
        <div classname="">
          <button className="bg-light d-flex justify-content-center align-item-center mx-2" >
            <SearchIcon style={{ "height": "43px",
    "color": "cornflowerblue",}}/>
          </button>
        </div>
      </div>
    </>
  );
};
