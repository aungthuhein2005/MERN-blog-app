import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import VerifyStatus from "./VerifyStatus";

function OTPVerify() {
    const navigate = useNavigate();

    const [otp, setOtp] = useState("");
    const [verified, setVerified] = useState(false);
    const [fail, setFail] = useState(false);

    const inputStyle = {
        width: "50px",
        height: "50px",
        outline: "none",
        border: "1px solid #ccc",
        margin: "0 10px 0 10px",
    };

    const verify = async () => {
        setVerified(true);
        try {
            const response = await axios.get(
                `http://localhost:5000/api/users/verify-otp/${otp}`
            );
            console.log(response.data);
            navigate('/account/edit/password-edit');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.error(error.response.data.error);
            } else {
                console.error("An unexpected error occurred:", error.message);
                // Handle other errors
            }
            setFail(true);
        }
    };

    return (
        <div className="flex items-center justify-center w-full">
            <div className="bg-gray-100 w-2/4 p-3 rounded-md px-4">
                <div>
                    <label htmlFor="" className="pb-2 text-lg">
                        OTP Verify
                    </label>
                    <br />

                    {
                        !fail ?
                            <div>
                                <div className="flex items-center justify-center my-2">
                                    <OtpInput
                                        value={otp}
                                        onChange={setOtp}
                                        inputStyle={inputStyle}
                                        numInputs={6}
                                        renderSeparator={<span>-</span>}
                                        renderInput={(props) => <input {...props} />}
                                    />
                                </div>

                                <button
                                    onClick={() => verify()}
                                    className="bg-green-500 text-white rounded-md px-4 py-2 mt-3 w-full text-md font-bold"
                                >
                                    Verify
                                </button>
                            </div> :
                            <VerifyStatus success={false} link='/account/edit/password-verify' linkName="Get OTP" text="Verify fail" />
                    }
                </div>
            </div>
        </div>
    );
}

export default OTPVerify;
