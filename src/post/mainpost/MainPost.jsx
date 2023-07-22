import React, { useEffect, useState } from 'react'
import CreatePost from '../createPost/CreatePost'
import Post from '../Poster/Post'
import "./mainpost.css"
import axios from 'axios';

function MainPost() {
  const [postData, setpostData] = useState([]);

  const getPost = async () => {
    try {
      const res = await axios("https://new-facebook-server.vercel.app/post");
      setpostData(res.data);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getPost();
  }, []);




  // console.log("mainpost",add)


  return (
    <div className="feed">
    <div className="feedWrapper">

    <CreatePost getPost={getPost}/>

    {
      postData?.map((el,index) => {

        
          return <Post  key={index}  data={el} maingetPost={getPost}/>
        

      }



      )}

      {/* <Post/> */}
    </div>
  </div>
  )
}

export default MainPost
