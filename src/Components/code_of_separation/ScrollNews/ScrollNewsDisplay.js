import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollNewsData } from '../../../ReduxStateManagement/actions/Action';
import { CardNewsDisplay } from '../CardNewsDisplay';

export const ScrollNewsDisplay = () => {
    const dispatch=useDispatch();
    const ScrollData=async () =>{
        const res=await axios.get("https://develop.hipoz.com/api/getnewsfeed?status_enum_id=0&news_user_type_id=0")
        .catch((error)=>{
            alert(error);
        })
        // console.log(res);
        dispatch(ScrollNewsData(res.data.data));
    }
    useEffect(() => {
        ScrollData();
    },[])
    
    return (
        <div>
            <CardNewsDisplay/>
        </div>
    )
}
// https://develop.hipoz.com/api/getnewsfeed?status_enum_id=0&news_user_type_id=0