import React from 'react'
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosWarning } from "react-icons/io";
import { RiErrorWarningLine } from "react-icons/ri";

function Alert(props) {
    return (
        <div className={`bg-${props.bg}-500 absolute top-0 left-1/2 -translate-x-1/2 z-30 text-${props.color} w-fit py-1 px-2 text-sm rounded-full flex items-start`}>
            <span className='me-2'>{(props.text).toUpperCase()}</span>
            {props.status === "success" && <FaCircleCheck size={19} className='inline' />}
            {props.status === "danger" && <RiErrorWarningLine size={19} className='inline' />}
            {props.status === "warning" && <IoIosWarning size={19} className='inline' />}
        </div>
    )
}

export default Alert
