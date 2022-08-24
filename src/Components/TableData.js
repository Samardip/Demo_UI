import React from 'react'
import { useSelector } from 'react-redux';

export const TableData = () => {
    const printdata = useSelector(state => state.data1);
    const StudentData = useSelector((state) => state.SDetails.datas);
    const print=(printdata!==null)?(printdata):(StudentData);
    //console.log(print);
    return (
        <>
        
        {(print.length===0)?"No Record Found":(
           print.map((sd,i)=>{
      return(
        <tr>
        <th scope="row">{sd.user_id}</th>
        <td>{sd.user_name}</td>
        <td>{sd.date_of_birth}</td>
        <td>{sd.email_id}</td>
        <td>{sd.mobile_number}</td>
        <td>{sd.country_name}</td>
        </tr>
      )
    }))
    
} 
        </>
    )
}
