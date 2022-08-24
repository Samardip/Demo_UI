import React from 'react'
import ReactDOM from 'react-dom'
import { DialogIndustryBox } from './DialogIndustryBox'

export const IndustryModal = ({open,children,onClose}) => {
    if(!open) return null
    return ReactDOM.createPortal(
        <>
            <DialogIndustryBox onClose={onClose}/>
        </>,
        document.getElementById('portal')
    )
}
