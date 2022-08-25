import React, { useEffect } from "react";
import { Navbar } from "../Components/NavigationPage/Navbar";
import { RoutePages } from "../Components/RoutePages";
import {BrowserRouter as Router} from 'react-router-dom'
import { useDispatch } from "react-redux";
import { setStudentDetails } from "../ReduxStateManagement/actions/Action";
import axios from "axios";
export const NavbarComponent = () => {
  const dispatch = useDispatch();

  const getData = async () => {
    
    const res = await axios
      .get(
        "https://develop.hipoz.com/api/userprofile?type=Admin&user_id=0&status_enum_id=0&job_search_status_enum_id=0"
      )
      .catch((error) => {
        alert("Error");
      });
    dispatch(setStudentDetails(res.data.data));
    //console.log(res.data.data);
    //  res.data.data.map((res)=>{

    //
    // })
  };
  useEffect(() => {
    getData();
  });
  return (
    <>
      <Router>
        <Navbar />
        <RoutePages />
      </Router>
    </>
  );
};