import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import { InputNumbers } from "./UI/InputNumbers";
export const AdultKidsnumber = ({ inputNumber,ComponentNames }) => {
    return (
        <div>
        <div className={ComponentNames.style}>
          <PersonIcon />
          <p>{ComponentNames.name}</p>
        </div>
        <div>
          <InputNumbers inputNumber={inputNumber} />
        </div>
      </div>
    )
}
