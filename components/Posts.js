import { collection, onSnapshot, orderBy, query,db,getFirestore  } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import Post from './Post'

// const posts=[
//     {
//         id:'123',
//         username:'mohamed_aaqib',
//         userImg:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Instagram_simple_icon.svg/180px-Instagram_simple_icon.svg.png',
//         img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Instagram_simple_icon.svg/180px-Instagram_simple_icon.svg.png',
//         caption:'THIS IS MY FIRST EVER APP THAT I HAVE CREATED EVER SINCE THE FAILIURE OF MY COVID APP '
//     },
//     {
//         id:'12',
//         username:'mohamed_aaqib',
//         userImg:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Instagram_simple_icon.svg/180px-Instagram_simple_icon.svg.png',
//         img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Instagram_simple_icon.svg/180px-Instagram_simple_icon.svg.png',
//         caption:'THIS IS MY FIRST EVER APP THAT I HAVE CREATED EVER SINCE THE FAILIURE OF MY COVID APP '
//     },
// ]
const Posts = () => {
    const [posts,setPosts]=useState([]);
    useEffect(()=>{
        const db = getFirestore()
        return onSnapshot(query(collection(db,'posts'),orderBy('timestamp','desc')),snapshot =>{
            setPosts(snapshot.docs)
        });
    },[db])
    // console.log(posts)
    return (
        <div>
            {posts.map((post)=>(<Post key={post.id} id={post.id} username={post.data().username} userImg={post.data().profileImg} img={post.data().image} caption={post.data().caption}/>))}
        </div>
    )
}

export default Posts