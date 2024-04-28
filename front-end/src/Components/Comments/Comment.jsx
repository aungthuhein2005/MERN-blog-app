import React, { useState } from 'react'
import User from '../Assets/17.jpg';
import { PiDotsThreeCircleVerticalLight } from "react-icons/pi";
import Modal from '../Modal';
import axios from 'axios';

function Comment(props) {
    const [toolbox,setToolbox] = useState(false);
    const [edit,setEdit] = useState(false);
    const [deleteComment,setDeleteComment] = useState(false);
    const [commentText,setCommentText] = useState(props.description);

    const toolboxHandle = () =>{
        setToolbox(!toolbox)
    }

    const editHandle = () =>{
        setEdit(!edit);
        setToolbox(false)
    }

    const updateHandle = () => {
        axios.patch(`http://localhost:5000/api/comments/${props.commentId}`,{
            postId: props.postId,
            text: commentText,
        }).then(response=>{
            if(response.status == 200){
                setEdit(!edit);
                props.fetchPostData();
            }
        })
    }

    const deleteHandle = () =>{
        setDeleteComment(!deleteComment)
        setToolbox(false)
    }

    const deleteConfirm = () =>{
        axios.delete(`http://localhost:5000/api/comments/${props.commentId}`,{
            data: {
                postId: props.postId,
            }
        })
        .then(response=>{
            if(response.status == 200){
                props.fetchPostData();
            }}
        )
        .catch(err=>console.error(err))
        setDeleteComment(false);
    }

    return (
        <div className='my-2'>

            {
                deleteComment ? 
                <Modal description={"Are you sure you want to delete it?"} cancel={deleteHandle} processName={"Delete"} process={deleteConfirm}/>
                : null
            }

            <div className='flex items-center justify-between'>
                <div className='flex items-start'>
                    <img src={User} alt="" className='w-10 rounded-full' />
                    <div className='ms-1'>
                        <p className='font-bold text-sm'>{props.name}</p>
                        <p className='text-xs text-gray-500'>12:00 PM</p>
                    </div>
                </div>
                <div className='relative'>
                    {
                        localStorage.getItem("user_id") === props.userId ? 
                        <PiDotsThreeCircleVerticalLight size={22} onClick={toolboxHandle} className='cursor-pointer' color='#000'/> : ''
                    }
                    <div className={`${toolbox ? "" : "hidden"} shadow-md p-1 absolute top-6 left-6`}>
                        <ul>
                            <li className='cursor-pointer my-1' onClick={deleteHandle} >Delete</li><hr />
                            <li className='cursor-pointer my-1' onClick={editHandle}>Edit</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='px-4 py-2'>
                {
                    edit ? 
                    <div>
                        <textarea name="" id="" cols="30" rows="2" className='w-full outline-none border-1 border-gray-400 resize-none p-1' onChange={(e)=>{setCommentText(e.target.value)}} value={commentText}/>
                        <div className='text-end'>
                            <button onClick={editHandle} className="bg-gray-200 p-1 rounded-sm mx-1 text-xs">Cancel</button>
                            <button onClick={updateHandle} className='bg-green-800 p-1 rounded-sm text-white mx-1 text-xs'>Update</button>
                        </div>
                    </div> : 
                    <p className='text-sm'>{commentText}</p>   
                }
            </div><hr/>
        </div>
    )
}

export default Comment
 