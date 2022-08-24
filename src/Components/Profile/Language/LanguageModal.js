import React from 'react'
import ReactDOM from 'react-dom'
import { LanguageDialogBox } from '../LanguageDialogBox'
export const LanguageModal = ({open,children,onClose,Lcount}) => {
    if(!open) return null
    return ReactDOM.createPortal(
        <>
            <LanguageDialogBox onClose={onClose} Lcount={Lcount}/>
        </>,
        document.getElementById('portal')
    )
}