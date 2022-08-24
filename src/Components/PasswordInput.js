import React from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useSelector,useDispatch } from 'react-redux';
import { IconButton, Input, InputAdornment } from '@mui/material';
import { setPassword, toggle } from '../ReduxStateManagement/actions/Action';
export const PasswordInput = () => {
    const ToggleState=useSelector((state)=>state.togglePassword);
    const dispatch=useDispatch();
    // console.log(ToggleState);
    return (
        <div>
            <Input type={(ToggleState%2!==0)?"text":"password"} 
            name="password" 
            className="border border-dark form-control"
            placeholder="Enter Password"
            onChange={(e)=>dispatch(setPassword(e.target.value))}
            required
            endAdornment={
                <InputAdornment position="end">
                    <IconButton onClick={()=>dispatch(toggle())}>
                    {(ToggleState%2!==0)?<VisibilityIcon/>:<VisibilityOffIcon />}
                    </IconButton>
                </InputAdornment>
            }/>
        </div>
    )
}
