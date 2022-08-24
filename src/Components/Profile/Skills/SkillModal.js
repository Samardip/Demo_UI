import React from 'react'
import ReactDOM from 'react-dom'
import { DialogSkillBox } from '../DialogSkillBox'
export const SkillModal = ({open,children,onClose,Lcount}) => {
    if(!open) return null
    return ReactDOM.createPortal(
        <>
            <DialogSkillBox onClose={onClose} Lcount={Lcount}/>
        </>,
        document.getElementById('portal')
    )
}