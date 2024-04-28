import React,{useState, useEffect} from "react";
import { IoCloseCircle } from "react-icons/io5";
import { IoArrowBackCircle } from "react-icons/io5";
import { MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";

function FavoruiteEdit() {

    const id = localStorage.getItem('user_id');
    const [categories,setCategoreis] = useState()
    const [checkedItems,setCheckedItems] = useState({});
    // const checkList = [];

    useEffect(()=>{
         axios.get(`http://localhost:5000/api/users/${id}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                }
            })
            .then((response)=>{
              fetchCategory(response.data.favourite);
            })
    },[])

    const fetchCategory = async (data) =>{
        try{
            const response = await axios.get('http://localhost:5000/api/blogs/categories');
            setCategoreis(response.data);
            const initialCheckedItems = {};
            response.data.forEach(item => {
              let checked = data.includes(item);
              initialCheckedItems[item] = checked; // Assuming 'id' is a unique identifier for each item
            });
            setCheckedItems(initialCheckedItems);
        }catch(err){
           console.error(err);
        }
    }

    const checkBoxhandle = (name) =>{
      setCheckedItems(prevState => ({
        ...prevState,
        [name]: !prevState[name],
      }));
    }

    const saveHandle = () => {
      const updatedData = categories.filter((item)=> checkedItems[item])
                          .map(item=>item);
      console.log(updatedData);
      axios.patch(`http://localhost:5000/api/users/${id}`,
      {
          favourite : updatedData,
      },{
      headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
      },
      })
      .then(response=>console.log(response))
      .catch(err=>console.log(err))
    }


  return (
    <div className="flex items-center justify-center w-full">
      <div className="bg-gray-100 w-2/4 p-3 rounded-md px-4">
        <div className="pb-3">
          <div className="text-end text-sm pe-2 pb-3">
            <Link to="/account/edit">
              <MdArrowBack size={18} className="inline" /> Back{" "}
            </Link>
          </div>
          <label htmlFor="" className="pb-2 text-lg">
            Name
          </label>
          <br />
          <div className="h-40 overflow-y-scroll">
            <ul className="pe-2">
            {
              categories
                ? categories.map((item, i) => {
                    return (
                    <li key={i} className="flex items-center justify-between my-2 capitalize">
                        <span>{item}</span>
                        <input type="checkbox" checked={checkedItems[item]} onChange={()=>{checkBoxhandle(item)}} name={`checkbox_${i}`} id={`checkbox_${i}`} />
                    </li>
                    );
                })
                : null}
                
            </ul>
          </div>
        </div>
        <div className="pb-3">
        </div>
        <button className="bg-green-500 text-white rounded-md px-4 py-2 w-full text-md font-bold" onClick={saveHandle}>
          Save
        </button>
      </div>
    </div>
  );
}

export default FavoruiteEdit;
