import React from 'react'
import {getProviders,signIn as SignIntoProvider} from 'next-auth/react';
import Header from '../../components/Header';

const signIn = ({providers}) => {
    return (
        <>
        <Header></Header>
        <div className='flex flex-col items-center justify-center min-h-screen pt-5 -mt-28 px-14 text-center'>
            <img className='w-80' src='https://upload.wikimedia.org/wikipedia/commons/0/06/%C4%B0nstagram-Profilime-Kim-Bakt%C4%B1-1.png?20201125095359'/>
            <p className='font-xs italic'>This app is only for educational purposes only and its not the real instagram app by any means </p>
            <div className='mt-40'>
                {Object.values(providers).map((provider) => (
                    <div key={provider.name}>
                        <button className="p-3 bg-blue-500 rounded-lg text-white" onClick={() => SignIntoProvider(provider.id,{callbackUrl:'/'})}>
                        Sign in with {provider.name}
                        </button>
                    </div>
                    ))}
            </div>
        </div>
        </>
        )
    }

export async function getServerSideProps(){
    const providers= await getProviders();
    return{
        props:{
            providers
        }
    }
}

export default signIn