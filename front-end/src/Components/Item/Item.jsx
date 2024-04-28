import React, { useRef, useEffect } from 'react'
import beachImg from '../Assets/beach.jpg';
import { HiArrowRightCircle } from 'react-icons/hi2';
import { MdDateRange } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';


function Item(props) {
    const iframeRef = useRef();

    //select img tag
    const getImg = (htmlString) => {
        const parser = new DOMParser();

        // Parse the HTML string
        const doc = parser.parseFromString(htmlString, 'text/html');

        // Select all img tags
        const imgTags = doc.querySelectorAll('img');
        return imgTags[0];
    }

    const removeImgTags = (htmlString) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        const imgTags = doc.querySelectorAll('img');
        imgTags.forEach((img) => {
            img.parentNode.removeChild(img);
        });
        const h1tags = doc.querySelectorAll('h1');
        if (h1tags.length > 0) {
            h1tags[0].classList.add('text-xl','font-bold');
          }
        const modifiedHtml = new XMLSerializer().serializeToString(doc);
        return modifiedHtml;
    }

    const date = new Date(props.date);
    const postClickHandle = () => {
        let accessTime = Cookies.get(`${props.id}`) || 0;
        if (accessTime !== 0) {
            accessTime++;
        } else {
            accessTime = 1;
        }
        Cookies.set(`${props.id}`, accessTime);
    }

    return (
        <div className='shadow-sm rounded-sm overflow-hidden'>
            <img src={getImg(props.description) !== undefined ? getImg(props.description).src : beachImg} alt="" className='w-full object-cover' style={{ height: "250px" }} />
            <div className='p-3'>
                <div dangerouslySetInnerHTML={{ __html: removeImgTags(props.description) }} style={{ height: "100px" }} className='overflow-hidden' />
                <div className='float-end py-2'>
                    <Link to={`/blogs/${props.id}`} onClick={postClickHandle} className='bg-yellow-400 rounded-sm text-white p-1 shadow-sm d-flex items-center hover:bg-yellow-500 transition ease-in duration-300'>
                        <span className='mr-2 text-base'>Read More</span> <HiArrowRightCircle size={20} />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Item
