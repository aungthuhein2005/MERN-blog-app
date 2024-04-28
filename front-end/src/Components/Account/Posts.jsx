import React, { useRef, useState, useEffect,useCallback } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Alert from '../UI/Alert';
import { useAccountContext } from '../../Context/AccountContext';


// import 'react-rich-text-editor';

function Posts() {
  const userId = localStorage.getItem('user_id');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [posted, setPosted] = useState(false);
  const [canPost, setCanPost] = useState(false);
  const {data,loading} = useAccountContext();
  if(!loading) data.then(response=> {
    console.log(response);
});
  //editor ref
  const quill = useRef();


  const handleImage = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const imageUrl = reader.result;
        const quillEditor = quill.current.getEditor();

        const range = quillEditor.getSelection(true);
        quillEditor.insertEmbed(range.index,"imaeg",imageUrl,"user");
      }
      reader.readAsDataURL(file);
      // if (file) {
      //   const formData = new FormData();
      //   formData.append('image', file);
      //   console.log(formData);
      // }
    }
  },[]); 

  const modules = {
    toolbar:{
      container:  [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image'],
      ['clean'],
    ],
    handlers: {
      image: handleImage
    },clipboard: {
      matchVisual: true,
    },}
    
  };

  const handlePost = async () => {
    console.log(content);
    const toSend = {
      author : {
        name : "jhon",
        author_id: userId,
      },
      category: category,
      date : new Date(),
      description: content,
    }
    const response = await axios.post(`http://localhost:5000/api/blogs`,toSend,{
      headers: {
        'Content-Type': 'application/json',
        Authorization : `Bearer ${localStorage.getItem('jwtToken')}`,
      }
    })
    if(response.status === 200){
      setContent('');
      setCategory('')
      setPosted(true);
      setTimeout(()=>{
        setPosted(false)
      },5000)
    }
  }

  const handleChange = (value) => {
    setContent(value);
  }

  useEffect(() => {
    if (content === '' || category === '') {
      setCanPost(false);
    } else {
      setCanPost(true);
    }
  }, [content, category])


  return (
    <div className='px-12 relative'>
      {
        // posted ? <Alert bg="green" color="white" text="Created Successfully" status="success" /> : null
      }
      <ReactQuill modules={modules} value={content} onChange={handleChange} ref={(el)=>quill.current = el} className='' />
      <input list='categories' onChange={(e) => setCategory(e.target.value)} className='border border-gray-500 outline-none py-1 px-3 rounded-sm me-2' placeholder='Category' />
      <datalist id='categories'>
        <option value="Knowledge"></option>
        <option value="Computer"></option>
        <option value="Books"></option>
        <option value="Movies"></option>
        <option value="War"></option>
      </datalist>
      <button className='bg-blue-600 py-1 px-3 text-white rounded-sm my-2' onClick={handlePost} disabled={!canPost}>Post</button>
    </div>
  )
}

export default Posts
