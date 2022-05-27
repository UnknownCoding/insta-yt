import React, { useEffect, useState } from 'react'
import { BookmarkIcon , ChatIcon, DotsHorizontalIcon,EmojiHappyIcon,PaperAirplaneIcon,HeartIcon,HeartIconFilled} from '@heroicons/react/outline';
import { LightBulbIcon} from '@heroicons/react/solid';
import { useSession } from 'next-auth/react';
import { addDoc,doc, collection, getFirestore, serverTimestamp , onSnapshot,query,orderBy, setDoc, deleteDoc} from 'firebase/firestore';
import { db } from '../firebase';
import Moment from 'react-moment';
import 'moment-timezone';

const Post = ({id,username,userImg,img,caption}) => {
    const {data:session}= useSession();
        // this where an array of the current comments for that particular post is bein set !
    const [comment ,setComment]=useState(""); 
    const [elemental ,setElemental]=useState([]);      //this is where the current comment is bein set !
    const [like,setLike]=useState([])
    const [hasliked,setHasLiked]=useState()

    //comments are down here !
        useEffect(()=>{     
            return onSnapshot(query(collection(db,'posts',id,'comments'),orderBy('timestamp','desc')),(snapshot) =>{
                setElemental(snapshot.docs)
            }); 
            },[db]);
    
        
        useEffect(()=>{
            return onSnapshot(collection(db,'posts',id,'likes'),orderBy('timestamp','desc'),(snapshot) =>{
                setLike(snapshot.docs)
            }); 
            },[db]);
        

        useEffect(()=>{
            setHasLiked(
                like.findIndex((like)=>like.id == session?.user?.uid) !==-1
                )
        },[like])

        const likePost=async()=>{
            if(hasliked){
                await deleteDoc(doc(db,'posts',id,'likes',session.user.uid))
            }else{
                await setDoc(doc(db,'posts',id,'likes',session.user.uid),{
                    username:session.user.username
                })
            }
        }

        //comments are here i will never know what the error is man :((()))
    const sendComment = async (e)=>{
            e.preventDefault();
            const commentToSend=comment;
            setComment("");

            await addDoc(collection(db,'posts',id,'comments'),{
                comment:commentToSend,
                username:session?.user?.username,
                userImage:session?.user?.image,
                timestamp:serverTimestamp(),
            })
    }



    console.log("HERE LIES THE ERROR")
    console.log(elemental)
    console.log("HERE LIES THE ERROR TIEM FOR SOME DEBUPPP ACTION!")
    console.log("here is the" , elemental.length)
    return (
        <div className='bg-white my-7 border rounded-sm'>
            <div className='flex items-center p-5'>
                <img className='rounded-full h-12 w-12 object-contain border p-1 mr-3' src={userImg} alt="fix your browser"/>
                <p className='flex-1 font-bold'>{username}</p>
                <DotsHorizontalIcon className='h-5 '/>
            </div>
            <img className="object-cover w-full" src={img} ></img>
            {session && (
                <div className="flex justify-between px-4 pt-4 pb-3">
                    <div className="flex space-x-4">
                        {hasliked?(
                            <LightBulbIcon onClick={ likePost} className='btn text-red-500'/>
                        ):(    
                            <HeartIcon onClick={ likePost} className='btn'/>
                        )}
                        <ChatIcon className='btn'/>
                        <PaperAirplaneIcon className='btn'/>
                    </div>
                    <BookmarkIcon className="btn"/>
                </div>
            )}
            <p className='p-5 truncate'>
                {like.length>0 &&(<p className='font-bold mb-1'>{like.length} likes</p>)}
                <span className='font-bold mr-1'>{username}</span>
                {caption}
            </p>
            
    
            {elemental.length>0 &&(
                <div className='ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin'>
                    {elemental.map((comment)=>(<div key={comment.id} className='flex items-center space-x-2 mb-3'> 
                                                        <img src={comment.data().userImage} className="h-7 rounded-full"/>
                                                            <p className='text-sm flex-1'>
                                                                <span className='font-bold'>{comment.data().username}</span>
                                                                {" "}
                                                                {comment.data().comment}
                                                            </p>
                                                            <Moment fromNow className='text-purple-700 pr-5 text-xs'>
                                                                    {comment.data().timestamp?.toDate()}
                                                            </Moment>
                                                            

                                                </div>))}                        
                </div>
            )}

            {session&&(
                <form className='flex items-center p-4'>
                    <EmojiHappyIcon className='h-7'/>
                    <input type="text" className='border-none flex-1 focus:ring-0 outline-none' value={comment} onChange={e=>setComment(e.target.value) } placeholder='comment'/>
                    <button type='submit'disabled={!comment.trim} onClick={sendComment} className="bg-blue-500 shadow-lg shadow-blue-500/50 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">post</button>
                </form>
            )}
        </div>
    )
}

export default Post

