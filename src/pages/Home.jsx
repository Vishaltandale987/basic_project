import { Box, Button, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import LeftCompo from "../post/LeftCompo/LeftCompo";
import MainPost from "../post/mainpost/MainPost";
import axios from "axios";
import RigthCompo from "../post/RigthCompo/RigthCompo";

function Home() {
  const [userdata, setuserdata] = useState();

  const getUser = async () => {
    try {
      const res = await axios(`https://new-facebook-server.vercel.app/user`);
      setuserdata(res.data);
  
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  let login = localStorage.getItem("id");




  return (
    <div>
      <Box w="88%" h="120vh" m="auto" display="flex" gap="5">


        {
          login !== null ? 
          
          
          <Box
          w="25%"
          display={{ base: "none", sm: "none", md: "none", lg: "block" }}
        >
          <LeftCompo />
        </Box>
          
          
          :console.log('a')
        }
    

        <Box flex={1} h="100%" overflowY={"scroll"} className="scroll-hidden">
          <MainPost />
        </Box>
        <Box
          w="25%"
          display={{ base: "none", sm: "none", md: "none", lg: "block" }}
          id="display"
        >
          <Text mt={5}>
            <b>All Active Users {userdata?.length}</b>
          </Text>

          {userdata?.slice(0,7).map((el, index) => {
            return <RigthCompo key={index} data={el} />;
          })}
        </Box>
      </Box>
    </div>
  );
}

export default Home;
