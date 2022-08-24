import React from "react";
import ReactDOM from "react-dom";
import { ResumeDialogBox } from "./ResumeDialogBox";

export const ResumeModalBox = ({ open, children, onClose, setresumeState,FilePath,setFilePath }) => {
  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      <ResumeDialogBox onClose={onClose} setresumeState={setresumeState} 
      FilePath={FilePath}
      setFilePath={setFilePath}/>
    </>,
    document.getElementById("portal")
  );
};
