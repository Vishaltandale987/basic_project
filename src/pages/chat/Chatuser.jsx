import axios from "axios";
import React, { useEffect, useState } from "react";
import "./chat.css";
import Chat from "./Chat";

let second_person = localStorage.getItem("id");

function Chatuser() {
  const [chat_user_id, setchat_user_id] = useState("");
  const [userdata, setuserdata] = useState();
  const [chatdata, setchatdata] = useState();
  const [defaults, setdefaults] = useState()
  const getUser = async () => {
    try {
      const res = await axios(`https://new-facebook-server.vercel.app/user`);
      setuserdata(res.data);
    } catch (error) {
      console.log(error);
    }
  };


   // render 
   const get_chat_data = async (a) => {

    try {
      let res = await axios(`http://localhost:8088/chat/get/${a}/${second_person}`);
      setdefaults(res.data)
      setchatdata(res.data[0]?.conversion);
   
    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <div
        style={{
          display: "flex",
          height: "89vh",
        }}
      >
        <div
          style={{
            height: "89vh",

            overflowY: "scroll",
          }}
        >
          {userdata?.map((el, index) => {
            return (
              <div
                key={index}
                className="usercard"
                onClick={() => {
                  get_chat_data(el._id)
                  setchat_user_id(el._id)
                } }
              >
                <img
                  src={el.profilePicture}
                  alt=""
                  style={{
                    borderRadius: "50px",
                    width: "50px",
                    height: "50px",
                  }}
                />
                <p>
                  <b> {el.username}</b>
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{
          width: "100%",
        }}
      >
        <Chat frist_person={chat_user_id} chatdata={chatdata} defaults={defaults} get_chat_data={get_chat_data}/>
      </div>
    </div>
  );
}

export default Chatuser;
