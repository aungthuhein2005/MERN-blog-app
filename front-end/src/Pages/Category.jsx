import React, { useEffect, useState } from 'react'
import SectionTitle from '../Components/SectionTitle'
import ItemList from '../Components/ItemList'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BlogLoading from '../Components/UI/BlogLoading';

function Category() {
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(true);
    const { category } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/blogs/categories/${category}`)
            .then((response) => {
                setData(response.data)
                setLoading(false);
            })
    }, [category])

    return (
        <div className='min-h-screen'>
            <SectionTitle title={category} />
            {loading ? <BlogLoading /> : (
                <div className='pb-12 lg:px-20'>
                    <ItemList data={data} />
                </div>)}
        </div>
    )


}

export default Category
