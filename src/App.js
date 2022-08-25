import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Add } from './Add';
import { Addanother} from './Addanother';
// import { Link } from 'react-router-dom';
// import { Route, useHistory,Redirect } from 'react-router-dom'
import './App.css';
import AutoComplete from './Components/Profile/AutoComplete';
import { DialogDescBox } from './Components/Profile/DialogDescBox';
// import { DashboardLogin } from './Components/Dashboard/DashboardLogin';
// import { Toster } from './Components/Toster';
import { NavbarComponent } from './Container/NavbarComponent';
import { setLoginResult } from './ReduxStateManagement/actions/Action';
import { SetCss } from './SetCss';
// import {BrowserRouter as Router} from 'react-router-dom'
// import { Protected } from './Components/Protected';
// import { RoutePages } from './Components/RoutePages';
function App() {
  // const Login_Result = useSelector(state => state.loginResult);
  const dispatch = useDispatch();
 useEffect(() => {
   dispatch(setLoginResult(1));
 }, [])
  return (
    <>
      <NavbarComponent />
    </>
  );
}

export default App;

