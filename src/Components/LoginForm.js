import React from "react";
import { PasswordInput } from "./PasswordInput";
import { Input } from "@mui/material";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  setData,
  setEmail,
  setLoginResult,
} from "../ReduxStateManagement/actions/Action";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Home } from "../PageDetails/HomeDetail/Home";
export const LoginForm = () => {
  const email_id = useSelector((state) => state.EmailDetail);
  const password = useSelector((state) => state.PasswordDetail);
  const LoginData = useSelector(state => state.data)
  const dispatch = useDispatch();
  const validateDetails = (e) => {
    e.preventDefault();
    const postData = {
      email_id:email_id,
      password:password,
    };
    // console.log(postData);
    axios
      .post("https://develop.hipoz.com/api/commanloginuser", postData)
      .then((response) =>{
        dispatch(setData(response.data.data));
        // console.log(LoginData);
        if (
          response.data.message === "Successful Login" &&
          response.data.status === "SUCCESS"
        ) {
            
          dispatch(setLoginResult(1));
          localStorage.setItem("LoginData",JSON.stringify(LoginData[0]));
        } else {
          dispatch(setLoginResult(0));
          toast("Login Failed");
        }
      })
      .catch((error) => {
        toast("Internel Error"+error);
      });
  };
//   const Login_Result = useSelector(state => state.loginResult);
  return (
    <>
    
    <div className="d-flex justify-content-center align-items-center" >
      {/* style={{"height":"100vh"}}> */}
      <form onSubmit={validateDetails}>
          <div className="display-6 mb-4">
              Enter Credentials
          </div>
        <div className="form-group mb-4">
          <Input
            type="email"
            className="border border-dark form-control"
            placeholder="Enter Email ID"
            onChange={(e) => dispatch(setEmail(e.target.value))}
            name="Email"
            required
          />
        </div>
        <div className="form-group mb-4">
          <PasswordInput />
        </div>
        <div className="mb-4">
            <a href="/forgot-password">Forgot Password</a>
        </div>
        <div className="form-group mb-4">
          <button type="submit" className="btn btn-primary" >
            Submit
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
    
    </>
  );
};
