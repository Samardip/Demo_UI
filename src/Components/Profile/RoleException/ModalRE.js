import React from 'react'
import ReactDOM from 'react-dom'
import { DialogDescBox } from '../DialogDescBox'
import { DialogEducationBox } from '../DialogEducationBox'
import { DialogRoleExceptionBox } from '../DialogRoleExceptionBox'
export const ModalRE = ({open,children,onClose}) => {
    if(!open) return null
    return ReactDOM.createPortal(
        <>
            <DialogRoleExceptionBox onClose={onClose}/>
        </>,
        document.getElementById('portal')
    )
}