import React, { useEffect } from 'react'
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { PiWarningCircleLight } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";

function VerifyStatus(props) {

    const navigate = useNavigate();

    // useEffect(() => {
    //     if (props.status) {
    //         setTimeout(() => {
    //             navigate('/account/edit/password-edit');
    //         }, 3000)
    //     }
    // }, [])

    return (
        <div>
            <div className="text-center">
                {
                    props.success ?
                        <IoMdCheckmarkCircleOutline size={50} color="#38CA70" className="w-full text-center mb-2" />
                        :
                        <PiWarningCircleLight size={50} color="red" className="w-full text-center mb-2" />
                }
                <span className={`w-full text-center text-lg text-${props.success ? 'green' : 'red'}-500 font-bold`}>{props.text}</span><br />
                {props.link !== false ? <Link to={props.link} className="text-blue-400 underline text-end w-full">{props.linkName}</Link> : null}
            </div>
        </div>
    )
}

export default VerifyStatus
