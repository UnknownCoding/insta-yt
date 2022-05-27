import React, { Fragment, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import { Dialog,Transition } from '@headlessui/react'
import { CameraIcon } from '@heroicons/react/outline'
import { db,storage } from '../firebase'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'

const Modal = () => {
    const {data:session}= useSession();
    const[open,setOpen]=useRecoilState(modalState)
    const filePickerRef=useRef(null)
    const [loading,setLoading]=useState(false)
    const [selectedFile,setSelectedFile]=useState(null)
    const captionRef=useRef(null)


    const uploadPost = async ()=>{
        if(loading)return
        setLoading(true)
        //create a post and add to the firestore database "posts " collection
        // get post id for newly created post 
        // upload the image to firebase storage with post id 
        //get download url from fb storage and upload  to orignal post with image 
        const docRef=await addDoc(collection(db,'posts'),{
            username:session.user.username,
            caption:captionRef.current.value,
            profileImg:session.user.image,
            timestamp: serverTimestamp()
        })
        console.log("New Doc Added with ID",docRef.id);
        const imageRef = ref(storage,`posts/${docRef.id}/image`)
        await uploadString(imageRef,selectedFile,'data_url').then(async snapshot=>{
            const downloadURL= await getDownloadURL(imageRef)
            await updateDoc(doc(db,'posts',docRef.id),{
                image:downloadURL
            })
        });                 //third one is the data type 
        setOpen(false);
        setLoading(false);
        setSelectedFile(null);
    }



    const addImageToPost =(e)=>{
        const reader = new FileReader();
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload=(readerEvent)=>{
            setSelectedFile(readerEvent.target.result);
        };
    };

    return (<Transition.Root show={open} as={Fragment}>
                <Dialog as='div'
                        className='fixed z-10 inset-0 overflow-y-auto'
                        onClose={()=>{setOpen(false)}}
                
                >
                <div className='flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">

                        <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'/>
                    </Transition.Child>
                    <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
                        &#8203;
                    </span>
                    <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                                <div className=' inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left
                                                overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-sm
                                                sm:w-full sm:p-6
                                '>
                                    <div>
                                        {selectedFile?(
                                            <img src={selectedFile} onClick={()=>{setSelectedFile(null)}}></img>
                                        ):(
                                            <div onClick={()=>{filePickerRef.current.click()}}className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer'>
                                                <CameraIcon className='h-6 w-6 text-red-600'/>
                                            </div>                                        
                                        )}
                                        <div>
                                            <div className='mt-3 text-center sm:mt-3'>
                                                <Dialog.Title as='h3' className='text-lg leading-6 font-medium text-gray-500'>
                                                    Upload A photo
                                                </Dialog.Title>
                                                <div>
                                                    <input ref={filePickerRef} type='file' hidden onChange={addImageToPost}/>
                                                </div>
                                                <div className='mt-2'>
                                                    <input ref={captionRef} className='border-none focus:ring-0 w-full text-center' type='text' placeholder='enter an captiopn'/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='mt-5 sm:mt-6 items-center'>
                                            <button dsiabled={!selectedFile} onClick={uploadPost} className=" inline-flex justify-center w-full p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                                                <span className="w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                    {loading?"Uploading...":"Upload Post"}
                                                </span>
                                            </button>
                                        </div>                        
                                    </div>
                                </div>
                    </Transition.Child>
                </div>
                </Dialog>
            </Transition.Root>
            );
}

export default Modal