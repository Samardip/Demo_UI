import React from 'react'
import ReactDOM from 'react-dom'
import { DialogCompanyLocationBox } from './DialogCompanyLocationBox'

export const CompanyLocationModal = ({open,children,onClose}) => {
    if(!open) return null
    return ReactDOM.createPortal(
        <>
            <DialogCompanyLocationBox onClose={onClose}/>
        </>,
        document.getElementById('portal')
    )
}
