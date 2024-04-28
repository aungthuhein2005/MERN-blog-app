import React from 'react'

function Modal(props) {
    return (
        <div className="relative z-10">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 py-5 sm:p-6 ">
                            <p className='py-2 text-lg'>{props.description}</p>
                            <div className='text-end'>
                                <button className="bg-gray-200 p-1 rounded-sm mx-1" onClick={props.cancel} >Cancel</button>
                                <button  className='bg-red-500 p-1 rounded-sm text-white mx-1' onClick={props.process}>{props.processName}</button>                                   
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
