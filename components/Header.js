import React from 'react'
import Image from 'next/image'
import { PlusCircleIcon , MenuIcon, SearchIcon,PaperAirplaneIcon,HomeIcon,HeartIcon,UserGroupIcon} from '@heroicons/react/outline'
import { signOut, useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'

const Header = () => {

    const {data:session}= useSession();
    const [open,setOpen]=useRecoilState(modalState)
    const router= useRouter();
    console.log(session)

    return (
        <div className='shadow-sm border-b bg-white sticky top-0 z-50'>
            <div className='flex justify-between max-w-6xl mx-5 lg:max-auto'>
                <div onClick={()=>{router.push('/')}} className='relative hidden lg:inline-grid w-24 h-24 cursor-pointer'>
                    <Image src='https://upload.wikimedia.org/wikipedia/commons/0/06/%C4%B0nstagram-Profilime-Kim-Bakt%C4%B1-1.png?20201125095359'
                            layout='fill'
                            objectFit='contain'
                    />
                </div>

                <div className='relative w-10 h-10 mt-6 lg:hidden flex-shrik-0 cursor-pointer' >
                    <Image src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Instagram_simple_icon.svg/180px-Instagram_simple_icon.svg.png'
                            layout='fill'
                            objectFit='contain'
                    />
                </div>

                <div onClick={()=>{router.push('/')}} className='relative mt-3 p-5 rounded-md '>
                    <div className='absolute inset-y-0 pl-3 pb-1.5 flex items-center pointer-events-none'>
                        <SearchIcon className='h-5 w-5 text-gray-500'/>
                    </div>
                    <input className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black" type="text" placeholder='Search!'/> 
                </div>

                <div className='flex items-center justify-end space-x-4'>
                    <HomeIcon onClick={()=>{router.push('/')}} className='navBtn'></HomeIcon>
                    <MenuIcon className='h-6 md:hidden cursor-pointer'></MenuIcon>
                
                    {session?(
                        <>
                            <div className='relative navBtn'>
                            <PaperAirplaneIcon className='navBtn rotate-45'></PaperAirplaneIcon>
                            <div className='absolute -top-2 -right-3 text-xs w-5 h-5 bg-red-500 rounded-full 
                                            flex items-center justify-center animate-pulse text-white
                            '>3
                            
                            </div>
                        </div>
                        <PlusCircleIcon onClick={()=>{setOpen(true)}}className='navBtn'></PlusCircleIcon>
                        <UserGroupIcon className='navBtn'></UserGroupIcon>
                        <HeartIcon className='navBtn'></HeartIcon>
                        <img src={session?.user?.image}
                                onClick={signOut}
                                alt="profile-pic"
                                className='h-7 rounded-full cursor-pointer'
                        />
                        
                        </>
                            ):(
                            <button onClick={signIn}>Sign In</button>    
                        )}
                
                    
                </div>
                



            </div>


        </div>
    )
}

export default Header