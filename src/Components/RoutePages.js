import React from 'react'
import {Switch,Route} from 'react-router-dom'
import {About} from '../PageDetails/AboutDetails/About';
import {Home} from '../PageDetails/HomeDetail/Home';
import {Contact} from '../PageDetails/ContactDetails/Contact';
// import {BookNow} from '../PageDetails/BookNowDetails/BookNow';
import {Rooms} from '../PageDetails/RoomDetails/Rooms';
import { DashboardLogin } from './Dashboard/DashboardLogin';
import { Protected } from './Protected';
import { ForgotPassword } from './ForgotPassword';
import { ProtectedPassword } from './ProtectedPassword';
import { StudentDetails } from './StudentDetails';
import { NewsFeed } from './code_of_separation/NewsFeed';
import { ProfileLogin } from './Profile/ProfileLogin';

export const RoutePages = () => {
    return (
        <>
               <Switch>
               
                   <Protected path="/home" component={Home} />
                   <Protected path="/about" component={About} />
                   <Protected path="/contact" component={Contact}/>
                   {/* <Protected path="/booknow" component={BookNow}/> */}
                   <Protected path="/rooms" component={Rooms}/>
                   <Route path="/Demo_UI" component={DashboardLogin} exact></Route>
                   <Protected path="/studentdetails" component={StudentDetails}/>
                   <ProtectedPassword path="/forgot-password" component={ForgotPassword}/>
                   <Protected path="/newsfeed" component={NewsFeed}/>
                   <Protected path="/profile" component={ProfileLogin}/>
               </Switch> 
        </>
    )
}
