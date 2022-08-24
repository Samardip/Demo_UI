import React, { useState } from 'react'
import { Addanother } from './Addanother';

export const Add = () => {
    const [A,any]=useState(false);
    any(true);
    console.log(A);
    return (
        <>
            
            {/* {
                (isopen===true)?(
                    <Addanother />
                ):(<button className="btn btn-primary" onClick={()=>{setIsopen(true)}}>Add</button>)
            } */}
        </>
    )
}
