import React from 'react'
import ReactDOM from 'react-dom'
import { InterestedDialogBox } from '../InterestedDialogBox'

export const ModalInterested = ({open,children,onClose}) => {
    if(!open) return null
    return ReactDOM.createPortal(
        <>
            <InterestedDialogBox onClose={onClose}/>
        </>,
        document.getElementById('portal')
    )
}
