// Importing helper modules
import axios from "axios";
import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { useAccountContext } from "../../Context/AccountContext";
import Alert from "../UI/Alert";

// Importing core components
import QuillEditor from "react-quill";

const CLOUD_NAME = 'dmuaggg9o';
const UPLOAD_PRESET = 'testing';
//cloudinary config

const Editor = () => {
  // Editor state
  // const userId = localStorage.getItem('user_id');
  const [value, setValue] = useState("");
  const [category, setCategory] = useState('');
  const [posted, setPosted] = useState(false);
  const [canPost, setCanPost] = useState(false);
  const [userId,setUserId] = useState(null);
  const [userName,setUserName] = useState(null);
  const {data,loading} = useAccountContext();
 
  useEffect(() => {
    if (!loading) {
      setUserId(data._id);
      setUserName(data.name);
    }
  }, [loading, data]);

  // Editor ref
  const quill = useRef();

  // Handler to handle button clicked
  const handler = async () => {

    const toSend = {
      author: {
        author_id: userId,
        name: userName,
      },
      category: category,
      date: new Date(),
      description: value,
    }
    const response = await axios.post(`http://localhost:5000/api/blogs`, toSend, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      }
    })
    if (response.status === 200) {
      setValue('');
      setCategory('')
      setPosted(true);
      setTimeout(() => {
        setPosted(false)
      }, 5000)
    }
  }

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = async () => {
        const imageUrl = reader.result;
        const quillEditor = quill.current.getEditor();
        const range = quillEditor.getSelection(true);

        const form = new FormData();
        const config = {
          headers: {
            "X-Unique-Upload-Id": new Date(),
          },
        }

        form.append("file", file);
        form.append("cloud_name", CLOUD_NAME)
        form.append("upload_preset", UPLOAD_PRESET)
        axios.post("https://api.cloudinary.com/v1_1/dmuaggg9o/image/upload", form, config)
          .then((response) => {
            quillEditor.clipboard.dangerouslyPasteHTML(range.index, `<img src=${response.data.url} alt=""/>`)
          })
          .catch(e => {
            console.error(e);
            quillEditor.clipboard.dangerouslyPasteHTML(range.index, `Image can't upload`);
          })
      };

      reader.readAsDataURL(file);
    };
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'color': [] }, { 'background': [] }],
          ['link', 'image'],
          ['clean'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: true,
      },
    }),
    [imageHandler]
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "clean",
  ];

  useEffect(() => {
    if (value === '' || category === '') {
      setCanPost(false);
    } else {
      setCanPost(true);
    }
  }, [value, category])

  return (
    <div className='px-12 relative'>
      {
        posted ? <Alert bg="green" color="white" text="Created Successfully" status="success" /> : null
      }
      <QuillEditor
        ref={(el) => (quill.current = el)}

        theme="snow"
        value={value}
        formats={formats}
        modules={modules}
        onChange={(value) => setValue(value)}
      />
      <input list='categories' onChange={(e) => setCategory(e.target.value)} className='border border-gray-500 outline-none py-1 px-3 rounded-sm me-2' placeholder='Category' />
      <datalist id='categories'>
        <option value="Knowledge"></option>
        <option value="Computer"></option>
        <option value="Books"></option>
        <option value="Movies"></option>
        <option value="War"></option>
      </datalist>
      <button className='bg-blue-600 py-1 px-3 text-white rounded-sm my-2' onClick={handler} disabled={!canPost}>Post</button>
    </div>
  );
};

export default Editor;