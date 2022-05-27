import React, { useEffect, useState } from 'react';
import { randUser } from '@ngneat/falso';
import Story from './Story';
import {  useSession } from 'next-auth/react'

const Stories = () => {
    const {data:session}= useSession();

    const [suggestions,setSuggestions]=useState([])
    useEffect(()=>{
        const suggestions = randUser({ length: 20 });
        setSuggestions(suggestions);
    },[]);


    return (
        <div className='flex space-x-2 p-6 bg-white mt-5 border border-gray-200  rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black'>
            {session && (<Story img={session?.user?.image} username={session?.user?.username} />)}
            {suggestions.map((profile)=>(<Story key={profile.id} img={profile.img} username={profile.username}/>))}
        </div>
    )
}

export default Stories