import React, { useEffect, useState } from 'react'
import SectionTitle from '../SectionTitle'
import ItemList from '../ItemList'
import axios from 'axios';
import BlogLoading from '../UI/BlogLoading';


function Latest() {

    const [data, setData] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5000/api/blogs/latest/3')
            .then(response => {
                setData(response.data);
                setLoading(false);
            });
    }, [])

    return (
        <div>
            {loading ? <BlogLoading /> : <div className='my-12 lg:px-20'>
                <SectionTitle title="Latest blog" />
                <ItemList data={data} />
            </div>}
        </div>

    )
}

export default Latest
