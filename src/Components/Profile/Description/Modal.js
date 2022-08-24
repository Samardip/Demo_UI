import React from 'react'
import ReactDOM from 'react-dom'
import { DialogDescBox } from '../DialogDescBox'
export const Modal = ({open,children,onClose}) => {
    if(!open) return null
    return ReactDOM.createPortal(
        <>
            <DialogDescBox onClose={onClose}/>
        </>,
        document.getElementById('portal')
    )
}
