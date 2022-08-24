import React from 'react'
import ReactDOM from 'react-dom'
import { UpdateEducationbox } from './UpdateEducationBox'

export const ModalUpdateEdu = ({open,children,onClose,updateId,university,fieldStudy,degree,Month,Date}) => {
    if(!open) return null
    return ReactDOM.createPortal(
        <>
            <UpdateEducationbox onClose={onClose} updateId={updateId} 
            university={university}
            fieldStudy={fieldStudy}
            degree={degree}
            Month={Month}
            Date={Date}
            />
        </>,
        document.getElementById('portal')
    )
}