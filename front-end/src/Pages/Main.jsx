import React from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Subscribe from '../Components/Subscribe/Subscribe'
import Latest from '../Components/Latest/Latest'

function Main() {
    return (
        <>
            <Hero/>
            <Popular/>
            {/* <Subscribe/> */}
            <Latest/>
        </>
    )
}

export default Main
