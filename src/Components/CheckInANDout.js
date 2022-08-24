import React from "react";
import DateRangeIcon from '@mui/icons-material/DateRange';
import { InputNumbers } from "./UI/InputNumbers";
export const CheckInANDout = ({ inputNumber,ComponentNames }) => {
  return (
    <> 
      <div >
        <div className={ComponentNames.style}>
          <DateRangeIcon />
          <p>{ComponentNames.name}</p>
        </div>
        <div>
          <InputNumbers inputNumber={inputNumber} />
        </div>
      </div>
    </>
  );
};
