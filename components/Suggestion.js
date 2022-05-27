import React, { useEffect, useState } from 'react'
import { randUser } from '@ngneat/falso';

const Suggestion = () => {
    const [suggestion,setSuggestion] = useState([])
    useEffect(()=>{
        const suggestions = randUser({ length: 5 });
        setSuggestion(suggestions);
        },[])
    return (
        <div className='mt-4 ml-10'>
            <div className='flex justify-between text-sm mb-5'>
                <h3 className='text-sm font-bold text-gray-400'>Suggestion for you</h3>
                <button className='text-gray-600 font-semibold'>See All</button>
            </div>
            {suggestion.map((sugge)=>(<div key={sugge.id} className="flex items-center justify-between mt-3">
                                            <img className="w-10 h-10 rounded-full border p-[2px]" src={sugge.img} alt="yikes"/> 
                                            <div className='flex-1 ml-4'>
                                                <h2 className='font-semibold text-sm'>{sugge.username}</h2>
                                                <h2 className='texc-xs text-gray-400'>From the {sugge.address.country}</h2>
                                            </div>
                                            <button className='text-blue-400 font-bold'>Follow</button>
                                    </div>))}
        </div>
    )
}

export default Suggestion