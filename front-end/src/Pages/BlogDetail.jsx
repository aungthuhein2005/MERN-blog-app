import React, { useEffect, useState, useRef } from 'react';
import { MdDateRange } from 'react-icons/md';
import { AiFillLike, AiOutlineSend } from 'react-icons/ai';
import { BiSolidComment } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import axios, { all } from 'axios';
import RelatedList from '../Components/Related/RelatedList';
import SectionTitle from '../Components/SectionTitle';
import PostLoading from '../Components/UI/PostLoading';

import beach from '../Components/Assets/beach.jpg';
import authorImg from '../Components/Assets/17.jpg';
import ReguralComponent from '../Components/ReguralComponent';
import CommentList from '../Components/Comments/CommentList';
import { MdBookmarkAdd } from "react-icons/md";
import { MdBookmarkAdded } from "react-icons/md";

function BlogDetail() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment,setComment] = useState(false);
  const [like,setLike] = useState(false);
  const [subscribe,setSubscribe] = useState(false);
  const [save,setSave] = useState(false);
  const [commentText,setCommentText] = useState("");
  useEffect(  ()=>{
    fetchPost();
  },[like])

  useEffect(() => {
    if (data && data.likes && userId) {
      const likedByCurrentUser = data.likes.some(like => like === userId);
      setLike(likedByCurrentUser);
    }
  }, [data, userId]);

  useEffect(()=>{
    setSaved();
  },[save,data])

  useEffect(() => {
    setSubscribed();
  }, [subscribe,data]);

  const setSaved = () => {
    if(data && userId){
        axios.get(`http://localhost:5000/api/save/${userId}`)
        .then(result=>{
          if(result.data.saved.length > 0) setSave(true)
          else setSave(false)
        })
      .catch(error=>{
        console.error("Error fetching saved : ",error);
      })
    }
  }
  
  const setSubscribed = () => {
    if (data && userId) {
      axios.get('http://localhost:5000/api/subscribes', {
        params: {
          userId: userId,
          authorId: data.author.author_id,
        }
      }).then(result => {
        if (result.data) {
          setSubscribe(true);
        }else if(result.data === null){
          setSubscribe(false)
        }
      }).catch(error => {
        console.error('Error fetching subscribes:', error);
      });
    }
  }


  const fetchPost = async () => {
    const result = await axios.get(`http://localhost:5000/api/blogs/blog/${id}`)
    setLoading(false);
    setData(result.data);
  }

  const subscribeHandle = async() => {
    try{
      const response = subscribe 
    ? await axios.patch(`http://localhost:5000/api/subscribes/`,{authorId: data.author.author_id, userId: userId})
    : await axios.post(`http://localhost:5000/api/subscribes/`,{authorId: data.author.author_id, userId: userId});
    
    if(response.status === 200){
      fetchPost();
    }
    }catch(error){
      console.error("Error Handling like : ",error);
    }
  }


  const handleComment = () => {
    setComment(!comment);
  };

  const handelSave = async () =>{
    setSave(!save);
    try{
      const response = save 
      ? await axios.patch('http://localhost:5000/api/save/',{blogId: id, userId: userId})
      : await axios.post('http://localhost:5000/api/save/',{blogId: id,userId: userId});

      if(response.status === 200){
        fetchPost();
      }
    }catch(error){
      console.error(error);
    }
  }

  const handleLike = async () => {
    try {
      const response = like
        ? await axios.patch('http://localhost:5000/api/likes/', { postId: id, userId: userId })
        : await axios.post('http://localhost:5000/api/likes/', { userId: userId, postId: id });
  
      if (response.status === 200) {
        fetchPost();
      }
    } catch (error) {
      console.error('Error handling like:', error);
    }
  };
  

  const commentSubmit = async () => {
    const comment = await axios.post(`http://localhost:5000/api/comments/`,{
      userId: userId,
      postId: id,
      description: commentText,
    })
    console.log(comment);
    setCommentText("");
    fetchPost();
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  
  const addStyleToElements = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
  
    // Set styles for h1 elements
    const h1Elements = doc.getElementsByTagName('h1');
    for (let i = 0; i < h1Elements.length; i++) {
      h1Elements[i].style.fontSize = '28px';
      h1Elements[i].style.fontWeight = 'bold';
      // Add more styles as needed
    }
  
    // Set styles for h2 elements
    const h2Elements = doc.getElementsByTagName('h2');
    for (let i = 0; i < h2Elements.length; i++) {
      h2Elements[i].style.fontSize = '22px';
      h2Elements[i].style.fontWeight = 'bold';
      // Add more styles as needed
    }
  
    // Set styles for blockquote elements
    const blockquoteElements = doc.getElementsByTagName('blockquote');
    for (let i = 0; i < blockquoteElements.length; i++) {
      blockquoteElements[i].style.borderLeft = '5px solid #ccc';
      blockquoteElements[i].style.paddingLeft = '10px';
      // Add more styles as needed
    }
  
    // Set styles for link elements
    const linkElements = doc.getElementsByTagName('a');
    for (let i = 0; i < linkElements.length; i++) {
      linkElements[i].style.color = 'blue';
      // Add more styles as needed
    }
  
    // Set styles for code elements
    const codeElements = doc.getElementsByTagName('pre');
    for (let i = 0; i < codeElements.length; i++) {
      codeElements[i].style.backgroundColor = '#000';
      codeElements[i].style.color = '#fff';
      codeElements[i].style.padding = '10px';

      // Add more styles as needed
    }
  
    // Convert back to HTML string
    return doc.documentElement.outerHTML;
  };
  
  

  return (
    <div className="min-h-screen">
      {loading ? (
        <PostLoading />
      ) : (
        <div className="lg:px-20">
          <div className="flex items-center justify-between my-4">
            <div className="flex items-start mb-2">
              <img src={authorImg} className="w-10 rounded-full object-cover" alt="" />
              <div>
                <p className="ps-2 text-md font-bold">{data.author.name}</p>
                <button className={`${subscribe ? 'text-green-500' :  'text-red-500' } text-sm ps-2 `} onClick={subscribeHandle}>
                {subscribe ? 'Subscribed' :  'Subscribe' }
                </button>
              </div>
              <div>
                {/* <button
                  className={`${subscribe ? 'bg-green-300' :  'bg-red-300' } px-2 py-1 self-center rounded-full mt-2 hover:shadow-md transition-shadow duration-300 ms-3`}
                  onClick={subscribeHandle}
                >
                  Subscribe
                </button> */}
                {/* <button className={`${subscribe ? 'text-green-300' :  'text-red-300' } `} onClick={subscribeHandle}>
                  Subscribe
                </button> */}
              </div>
            </div>
            <div>
              <span className="font-bold flex items-center text-green-600">
                <MdDateRange size={20} /> {formatDate(data.date)}
              </span>
              {/* <div onClick={handelSave}  className={`my-2 cursor-pointer text-center rounded bg-yellow-200 border-2 w-fit p-1 border-yellow-400 text-gray-700`}>{save ? <MdBookmarkAdded size={20} className='inline mb-1' /> : <MdBookmarkAdd size={20} className='inline mb-1' />}</div> */}
              <div onClick={handelSave}  className={`my-2 cursor-pointer text-center rounded bg-${save ? 'green' : 'yellow'}-200 border-2 w-fit p-1 border-${save ? 'green' : 'yellow'}-400 text-gray-700`}>{save ? <MdBookmarkAdded size={20} className='inline mb-1' /> : <MdBookmarkAdd size={20} className='inline mb-1' />}</div>
            </div>
          </div>
          <hr />
          <p className="py-5 px-4"> 
            <div className='no-tailwind'>
            <div style={{all: "unset"}}
        dangerouslySetInnerHTML={{
          __html: data.description ? addStyleToElements(data.description) : ''
        }}
        // className='no-tailwind'
      ></div>
            </div>
          </p>
          <hr />
          <div className="my-1 text-end">
            <button className="border-1 px-2 py-1 me-2" onClick={handleLike}>
              <AiFillLike size={20} color={ like ? 'blue' : ''} />
            </button>
            <button className="border-1 px-2 py-1 me-2" onClick={handleComment}>
              <BiSolidComment size={20} />
            </button>
            <p className="text-gray-500">
              <span className="px-1">
                {data.likes.length > 0
                  ? data.likes.length === 1
                    ? `${data.likes.length}Like`
                    : `${data.likes.length}Likes`
                  : ''}
              </span>
              <span className="px-1">
              {data.comments.length > 0
                  ? data.comments.length === 1
                    ? `${data.comments.length}Comment`
                    : `${data.comments.length}Comments`
                  : ''}
              </span>
            </p>
          </div>
          <div className={ !comment && 'hidden'}>
            <div className="bg-gray-100 p-2">
              <div className="flex border-1 p-1 bg-white rounded-lg my-2 ">
                <input
                  type="text"
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full outline-none me-4"
                  placeholder="Add a comment..."
                  value={commentText}
                />
                <AiOutlineSend size={25} className="cursor-pointer" onClick={commentSubmit} />
              </div>
            </div>
            <div>
              {data.comments !== null ? (
                <CommentList data={data.comments} fetchPostData={fetchPost} postId={data._id} />
              ) : (
                <p>There is no comment</p>
              )}
            </div>
          </div>
          <div className="my-20">
            <SectionTitle title="Related Blogs" />
            <RelatedList category={data.category} />
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogDetail;
