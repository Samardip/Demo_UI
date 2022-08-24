import React from "react";
import "./DashboardLogin.css";
import loginImg from "../../images/loginImg.jpg";
import { LoginForm } from "../LoginForm";
import { Home } from "../../PageDetails/HomeDetail/Home";
import { useSelector } from "react-redux";
export const DashboardLogin = () => {
  const Login_Result = useSelector(state => state.loginResult);
  return (
    <>
    {(Login_Result%2!==0)?(<Home />):(
      <div className="container" >
        <div className="my-4 display-5 d-flex justify-content-center">
        Login to access other Pages
        </div>
        <div >
          <LoginForm />
        </div>
      </div>
    )}
    </>
  );
};
