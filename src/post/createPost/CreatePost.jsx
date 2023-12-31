import "./createPost.css";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CloseIcon } from "@chakra-ui/icons";
import { AddIcon, MoonIcon } from "@chakra-ui/icons";
import { Input, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { frameData } from "framer-motion";
import moment from "moment";
import { StageSpinner } from "react-spinners-kit";

let id = localStorage.getItem("id");

const initState = {
  user_profilePicture: "",
  postTime: "",
  username: "",
  userId: id,
  desc: "",
  img: "",
};

export default function CreatePost({ getPost }) {
  const desc = useRef();
  const [image, setimage] = useState("");
  const [formData, setFormData] = useState(initState);
  const [userdata, setuserdata] = useState();
  const [loader, setloader] = useState(false);
  const toast = useToast();

  let time = moment().format("MMMM Do YYYY, h:mm:ss a");

  //get username

  let getId = async () => {
    try {
      const res = await axios(
        `https://new-facebook-server.vercel.app/user/${id}`
      );

      setFormData({
        ...formData,
        username: res.data.username,
        user_profilePicture: res.data.profilePicture,
        postTime: time,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id !== null) {
      getId();
      getUser();
    }
  }, []);

  // cloudinaty && post

  const submit = async () => {
    setloader(true)
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "ml_default");
    data.append("cloud_name", "dd9cmhunr");

    fetch("https://api.cloudinary.com/v1_1/dd9cmhunr/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setFormData({ ...formData, img: data.url });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log("data",formData)

  const add = async () => {
    try {
      let res = await axios.post(
        "https://new-facebook-server.vercel.app/post",
        formData
      );
      setloader(false)

      toast({
        position: "top",
        title: `${res.data}`,
        status: "success",
        duration: 4000,
        isClosable: false,
      });

      setFormData({ ...formData, img: "" });
      getPost();
      setimage("");
    } catch (err) {
      console.log(err);
    }
  };

  if (formData.img !== "" && id !== "") {
    add();
  }

  // get users

  const getUser = async () => {
    try {
      const res = await axios(
        `https://new-facebook-server.vercel.app/user/${id}`
      );
      setuserdata(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loader ? (
        <div
          style={{
            position: "absolute",
            zIndex: "1",
            left: "38em",
          }}
        >
          <StageSpinner size={60} color="#7CB9E8" />
        </div>
      ) : null}


      
      <div
        className="share"
        style={{
          position: "relative",
        }}
      >
        <div className="shareWrapper">
          <div className="shareTop">
            <img
              className="shareProfileImg"
              src={userdata?.profilePicture}
              alt=""
            />

            <div className="shareBottom">
              <div className="shareOptions">
                <label htmlFor="file" className="shareOption">
                  <AddIcon mr={2} className="shareIcon" />
                  <span className="shareOptionText">Photo or Video</span>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="file"
                    // accept=".png,.jpeg,.jpg"
                    onChange={(e) => setimage(e.target.files[0])}
                  />
                </label>
                {image && (
                  <div className="shareImgContainer">
                    <img
                      src={URL.createObjectURL(image)}
                      alt=""
                      style={{
                        width: "50px",
                        borderRadius: "50px",
                      }}
                    />
                    <CloseIcon
                      className="shareCancelImg"
                      onClick={() => setimage("")}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <hr className="shareHr" />
          <div className="des">
            <Input
              placeholder={"What's in your mind " + "?"}
              className="shareInput"
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, desc: e.target.value })
              }
              required
              ref={desc}
            />

            <button className="shareButton" onClick={submit}>
              Post
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
