import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import HotelIcon from "@mui/icons-material/Hotel";
import { Buttons } from "../UI/Buttons";
import { setLoginResult, UpdateEducation, UserEducationData } from "../../ReduxStateManagement/actions/Action";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import newsimg from "../../images/newsimg.jpg";
import Dropdown from "react-dropdown";
import { DropdownButton } from "react-bootstrap";
import axios from "axios";
export const Navbar = () => {
  // useEffect(() => {
  //   toast("Login SuccessFull");
  // }, [])
  const dispatch = useDispatch();
  const Login_Result = useSelector((state) => state.loginResult);
  // console.log(Login_Result);
  const Toast = () => {
    toast("Logout Successfull");
    dispatch(setLoginResult(1));
    localStorage.removeItem("LoginData");
  };
  const Education = useSelector((state) => state.UpdateDatas.Education);
  const profileEdu = async () => {
    const res = await axios
      .get("https://develop.hipoz.com/api/usereducation?user_id=1097")
      .catch((error) => {
        alert(error);
      });
      let obj4=[];
      res.data.data.map((res)=>{
        const newEduData = {
          user_education_id: res.user_education_id,
          Degree: res.degree_id,
          FieldStudy: res.field_of_study_id,
          University: res.university_id,
          GraduationMonth: res.graduate_month_id,
          GraduationDate: res.graduate_year_id,
          status_enum_id: 1,
        }
        obj4=[...obj4,newEduData];
      })
      dispatch(UpdateEducation(obj4));
      dispatch(UserEducationData(res.data.data));
      console.log(Education);
  };

  useEffect(() => {
    profileEdu();
    
    // dispatch(EducationState(1));
  }, [])
  return (
    <>
      {Login_Result % 2 !== 0 ? (
        <nav className="navbar navbar-expand-sm bg-light justify-content-between sticky-top">
          <div>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/home">
                  <div style={{ width: "140%" }}>
                    <HotelIcon />
                    Home
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/rooms">Rooms</Link>
              </li>
              <li className="nav-item">
                <Link to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/studentdetails">Student_Details</Link>
              </li>
              <li>
                <Link to="/newsfeed">News_Feed</Link>
              </li>
            </ul>
          </div>
          <ul className="">
            <li className="nav-item mx-3">
              {Login_Result % 2 == 0 ? (
                <Link to="/" className="btn btn-danger">
                  LogIn
                </Link>
              ) : (
                <>
                  <div className="dropstart">
                    <img
                      src={newsimg}
                      alt="logo"
                      style={{ borderRadius: "50%", width: "3vw" }}
                      className=" dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="true"
                    />
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item">
                          <Link to="/profile" className="">
                            My Profile
                          </Link>
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item">
                          <Link to="/" className="" onClick={Toast}>
                            LogOut
                          </Link>
                        </a>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </li>
          </ul>
        </nav>
      ) : null}
    </>
  );
};
