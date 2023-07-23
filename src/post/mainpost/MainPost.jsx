import React, { useEffect, useState } from "react";
import CreatePost from "../createPost/CreatePost";
import Post from "../Poster/Post";
import "./mainpost.css";
import axios from "axios";
import { StageSpinner } from "react-spinners-kit";

function MainPost() {
  const [postData, setpostData] = useState([]);
  const [loader, setloader] = useState(false);

  const getPost = async () => {
    try {
      setloader(true);
      const res = await axios("https://new-facebook-server.vercel.app/post");
      setpostData(res.data);
      setloader(false);
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
        <CreatePost getPost={getPost} />

        <>
          {loader ? (
            <div
              style={{
                position: "absolute",
                zIndex: "1",
                left: "38em",
                top: "5em",
              }}
            >
              <StageSpinner size={60} color="orange" />
            </div>
          ) : null}
        </>

        <div
          style={{
            position: "relative",
          }}
        >
          {postData?.map((el, index) => {
            return <Post key={index} data={el} maingetPost={getPost} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default MainPost;
