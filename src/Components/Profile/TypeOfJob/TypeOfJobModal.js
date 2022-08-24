import React from 'react'
import ReactDOM from 'react-dom'
import { DialogTypeOfJobBox } from '../DialogTypeOfJobBox'

export const TypeOfJobModal = ({open,children,onClose}) => {
    if(!open) return null
    return ReactDOM.createPortal(
        <>
            <DialogTypeOfJobBox onClose={onClose}/>
        </>,
        document.getElementById('portal')
    )
}
