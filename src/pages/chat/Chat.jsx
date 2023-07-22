import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "./chat.css";
import axios from "axios";

let second_person = localStorage.getItem("id");

function Chat({ frist_person ,chatdata,defaults ,get_chat_data}) {
  const [senddata, setsenddata] = useState("");

  const [getUserState, setgetUserState] = useState()


  let initialData = {
    message: senddata,
    sender_name:getUserState?.username,
    sender_img:getUserState?.profilePicture,
    sender: true,
  };


  let baseData = {
    message: "Start",
    sender_name:getUserState?.username,
    sender_img:getUserState?.profilePicture,
    sender: true,
  };

  console.log("chatdata",initialData)



  const create_pannel = async () => {

    try {
      let res = await axios.post(`http://localhost:8088/chat/create/${frist_person}/${second_person}`,baseData);
      
      alert(res.data)
   
    } catch (error) {
      console.log(error);
    }

  };
  //  send message



  const sendmessage = async () => {
     try {
      let res = await axios.post(`http://localhost:8088/chat/send/${frist_person}/${second_person}`,initialData);
      get_chat_data()

   
    } catch (error) {
      console.log(error);
    }
  };






// get info
  const getUser = async () => {


    try {
      const res = await axios(`https://new-facebook-server.vercel.app/user/${second_person}`);
      setgetUserState(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {

    getUser()
  }, []);

  return (
    <div className="inputparent">

      
      <div>

      {
        defaults === "Start your conversion" ? 
        <div>
          <p>{defaults}</p>
          <Button onClick={create_pannel}>Start</Button>
        </div>
        :
        <div>
          {chatdata?.map((el, index) => {
          return (
            <div key={index}>
              <div id={el.sender} className="status">

              <p>
                <b> {el.message}</b>
              </p>

              <p>
                <b> {el.sender_name}</b>
              </p>


              <p>
                <b> {el.sender_id}</b>
              </p>
              </div>
            </div>
          );
        })} 
        </div>
        
      }


      




      </div>

      <div className="inputtag">
        <Input
          type="text"
          placeholder="Enter message"
          style={{
            border: "2px solid black",
          }}
          onChange={(e) => setsenddata(e.target.value)}
        />
        <Button
          rightIcon={<ArrowForwardIcon />}
          colorScheme="teal"
          onClick={sendmessage}
        >
          Send
        </Button>
      </div>
    </div>
  );
}

export default Chat;
