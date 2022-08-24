import React from 'react'
import ReactDOM from 'react-dom'
import { ExpectedSalaryDialogBox } from './ExpectedSalaryDialogBox'
export const ExpectedSalaryModal = ({open,children,onClose,Lcount,setLcount}) => {
    if(!open) return null
    return ReactDOM.createPortal(
        <>
            <ExpectedSalaryDialogBox onClose={onClose} Lcount={Lcount} setLcount={setLcount}/>
        </>,
        document.getElementById('portal')
    )
}