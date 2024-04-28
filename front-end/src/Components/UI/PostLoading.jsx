import React from 'react'
import { ShimmerPostItem,ShimmerPostDetails, ShimmerText, ShimmerThumbnail, ShimmerCard } from "react-shimmer-effects";

function PostLoading() {
    return (
        <div className='mt-10'>
            <ShimmerThumbnail/>
            <ShimmerText line={15}/>
        </div>
    )
}

export default PostLoading
