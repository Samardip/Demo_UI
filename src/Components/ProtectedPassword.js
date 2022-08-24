import React from 'react'
import { useSelector } from 'react-redux';
import { Route,Redirect } from 'react-router-dom'

export const ProtectedPassword = ({component:Component, ...rest}) => {
    const Login_Result = useSelector(state => state.loginResult);
    return (
        <Route  {...rest}
         render={
            (props)=>{
                if(Login_Result%2===1){
                    return <Redirect to={{
                        path: "/",
                        state :{
                            from:props.location
                        }
                    }
                }/>
            }
                else{
                    return <Component {...props} /> 
            }
        }
    }
    
    />
    )
}
