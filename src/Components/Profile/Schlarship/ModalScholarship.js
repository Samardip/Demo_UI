import React from 'react'
import ReactDOM from 'react-dom'
import { DialogDescBox } from '../DialogDescBox'
import { DialogEducationBox } from '../DialogEducationBox'
import { DialogRoleExceptionBox } from '../DialogRoleExceptionBox'
import { DialogScholarshipBox } from '../DialogScholarshipBox'
export const ModalScholarship = ({open,children,onClose,show,setShow}) => {
    if(!open) return null
    return ReactDOM.createPortal(
        <>
            <DialogScholarshipBox onClose={onClose} show={show} setShow={setShow}/>
        </>,
        document.getElementById('portal')
    )
}