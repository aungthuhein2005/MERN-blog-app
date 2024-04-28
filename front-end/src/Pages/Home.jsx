import React, {useState} from 'react'
import Footer from '../Components/Footer/Footer';
import Navbar from '../Components/Navabr/Navbar';
import Blog from '../Pages/Blog';
import Category from '../Pages/Category';
import Login from '../Pages/Login';
import Main from '../Pages/Main';
import Search from '../Pages/Search';
import Singup from '../Pages/Singup';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import axios from 'axios';
import BlogDetail from '../Pages/BlogDetail';
import BlogList from '../Components/BlogList';

function Home() {
    
    const isAuthenticated = () => {
        return !!localStorage.getItem("user_id");
    }

    const [searchData,setSearchData] = useState("");
    const handleSearch = (data) => {
      axios.get(`http://localhost:5000/api/blogs/search/`,{
        params: {
            search : data
        }
      })
      .then((response)=>{
        setSearchData(response.data)
    })
      .catch(err=>console.error("Error",err));
      console.log(searchData);
    }

    return (
        <div className=''>
            <Navbar handleSearch={handleSearch} />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/signup" element={isAuthenticated() ? <Navigate to="/account/"/>  :  <Singup />} />
                <Route path="/login" element={isAuthenticated() ? <Navigate to="/account/"/>  :  <Login />} />
                <Route path="/blogs" element={<Blog />}>
                    <Route index element={<BlogList />} />
                    <Route path=":id" element={<BlogDetail />} />
                    <Route path="search" element={<Search search={searchData} />} />
                </Route>
                <Route path='/categories/:category' element={<Category/>}/>
            </Routes>
            <Footer />
        </div>
    )
}

export default Home
