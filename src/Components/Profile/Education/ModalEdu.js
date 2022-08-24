import React from 'react'
import ReactDOM from 'react-dom'
import { DialogDescBox } from '../DialogDescBox'
import { DialogEducationBox } from '../DialogEducationBox'
export const ModalEdu = ({open,children,onClose}) => {
    if(!open) return null
    return ReactDOM.createPortal(
        <>
            <DialogEducationBox onClose={onClose}/>
        </>,
        document.getElementById('portal')
    )
}