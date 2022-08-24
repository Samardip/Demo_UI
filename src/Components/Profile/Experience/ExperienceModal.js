import React from "react";
import ReactDOM from "react-dom";
import { ExperienceDialogBox } from "./ExperienceDialogBox";
export const ExperienceModal = ({ open, children, onClose,YesNoState,setYesNoState,setExpStateData,setIsDesc }) => {
  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      <ExperienceDialogBox
        onClose={onClose}
        YesNoState={YesNoState}
        setYesNoState={setYesNoState}
        setExpStateData={setExpStateData}
        setIsDesc={setIsDesc}
      />
    </>,
    document.getElementById("portal")
  );
};
