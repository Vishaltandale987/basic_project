import React, { useCallback, useEffect, useState } from "react";
import {
  Heading,
  Avatar,
  Box,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  Container,
  IconButton,
  useColorModeValue,
  StackDivider,
  Grid,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import CreatePost from "../post/createPost/CreatePost";
import Post from "../post/Poster/Post";
import axios from "axios";
import { StageSpinner } from "react-spinners-kit";

function Profile() {
  const navigate = useNavigate();
  const toast = useToast();
  const [image, setimage] = useState("");
  const [coverimage, setcoverimage] = useState("");

  // console.log("image",image)
  // console.log("coverimage",coverimage)

  const [postData, setpostData] = useState();
  const [getuser, setgetuser] = useState();

  const [Profile, setProfile] = useState("");
  const [cover, setcover] = useState("");

  const [profieUrl, setprofieUrl] = useState(false);

  const [loader, setloader] = useState(false);

  // console.log("image cover",cover)

  const userCredential = "";
  //  const NumberFormat =""
  //  const posts =""
  //  const UserPostCard =""

  //get post userId
  let ass = localStorage.getItem("profile");

  let logId = localStorage.getItem("id");
  const getPost = async () => {
    try {
      const res = await axios(
        `https://new-facebook-server.vercel.app/post/userpost/${ass}`
      );
      setpostData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    getPost();
  }, []);

  //follow

  let id = {
    userId: logId,
  };

  const handleFollow = async () => {
    try {
     
      const res = await axios.put(
        `https://new-facebook-server.vercel.app/user/${ass}/follow`,
        id
      );
     
      console.log(res);
      getUserData();
    } catch (error) {
      console.log(error);
    }
  };

  //following

  const handleFollowing = async () => {
    setloader(true);
    try {
      const res = await axios.put(
        `https://new-facebook-server.vercel.app/user/${ass}/unfollow`,
        id
      );
      setloader(false);
      console.log(res);
      getUserData();
    } catch (error) {
      console.log(error);
    }
  };

  //getuserdata
  const getUserData = async () => {
    try {
      setloader(true);

      const res = await axios(
        `https://new-facebook-server.vercel.app/user/${ass}`
      );
      setgetuser(res.data);
      setloader(false);
    } catch (error) {
      console.log(error);
    }
  };

  //Update Profile Image

  const handleUpdateprofileImage = async () => {
    setloader(true);

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
        setProfile(data.url);
        addprofile(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addprofile = async (url) => {
    let Profile_obj = {
      profilePicture: url,
    };
    try {
      const res = await axios.put(
        `https://new-facebook-server.vercel.app/user/${ass}/profilePicture`,
        Profile_obj
      );

      toast({
        position: "top",
        title: `${res?.data}`,
        status: "success",
        duration: 4000,
        isClosable: false,
      });
      setloader(false);

      closeimage();
      getUserData();
    } catch (error) {
      console.log(error);
    }
  };

  //Update cover Image

  // console.log("cover_obj",cover_obj)

  const handleUpdatecoverImage = async () => {
    setloader(true);

    const data = new FormData();
    data.append("file", coverimage);
    data.append("upload_preset", "ml_default");
    data.append("cloud_name", "dd9cmhunr");

    fetch("https://api.cloudinary.com/v1_1/dd9cmhunr/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setcover(data.url);
        addcover(data.url);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const addcover = async (url) => {
    let cover_obj = {
      coverPicture: url,
    };
    try {
      const res = await axios.put(
        `https://new-facebook-server.vercel.app/user/${ass}/coverPicture`,
        cover_obj
      );

      toast({
        position: "top",
        title: `${res?.data}`,
        status: "success",
        duration: 4000,
        isClosable: false,
      });
      setloader(false);

      closecover();
      getUserData();
    } catch (error) {
      console.log(error);
    }
  };

  const closecover = () => {
    setcoverimage("");
  };

  const closeimage = () => {
    setimage("");
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
        style={{
          position: "relative",
        }}
      >
        <Container maxW="5xl" mt={10}>
          <Flex gap={6} w="100%">
            <Box w={{ base: "100%", md: "75%" }}>
              <Box
                bg={useColorModeValue("white", "gray.800")}
                boxShadow={"2xl"}
                rounded={"md"}
                overflow={"hidden"}
              >
                <Image
                  h={"200px"}
                  w={"full"}
                  src={getuser?.coverPicture}
                  objectFit={"cover"}
                />

                <div
                  className="shareOptions"
                  style={{
                    float: "right",
                  }}
                >
                  <label htmlFor="file" className="n">
                    <AddIcon ml={-4} className="shareIcon" />
                    <input
                      style={{ display: "none" }}
                      type="file"
                      id="file"
                      // accept=".png,.jpeg,.jpg"
                      onChange={(e) => setcoverimage(e.target.files[0])}
                    />
                  </label>
                  {coverimage && (
                    <div
                      className="shareImgContainer"
                      style={{
                        display: "flex",
                      }}
                    >
                      <img
                        src={URL.createObjectURL(coverimage)}
                        alt=""
                        style={{
                          width: "50px",
                          borderRadius: "50px",
                          marginTop: "30px",
                        }}
                      />

                      <CloseIcon
                        onClick={closecover}
                        style={{
                          marginTop: "30px",
                        }}
                      />
                      <Button
                        colorScheme="whatsapp"
                        style={{
                          marginTop: "30px",
                          marginLeft: "100px",
                        }}
                        onClick={handleUpdatecoverImage}
                      >
                        Change Cover
                      </Button>
                    </div>
                  )}
                </div>

                <Flex pl={10}>
                  <Avatar
                    mt={-12}
                    size={"2xl"}
                    bg={"blue.500"}
                    src={getuser?.profilePicture}
                    css={{ border: "2px solid white" }}
                  />

                  <div className="shareOptions">
                    <label htmlFor="file1" className="shareOption">
                      <AddIcon ml={-4} className="shareIcon" />
                      <input
                        style={{ display: "none" }}
                        type="file"
                        id="file1"
                        // accept=".png,.jpeg,.jpg"
                        onChange={(e) => setimage(e.target.files[0])}
                      />
                    </label>
                    {image && (
                      <div
                        className="shareImgContainer"
                        style={{
                          display: "flex",
                        }}
                      >
                        <img
                          src={URL.createObjectURL(image)}
                          alt=""
                          style={{
                            width: "50px",
                            borderRadius: "50px",
                            marginTop: "30px",
                          }}
                        />

                        <CloseIcon
                          // className="shareCancelImg"
                          onClick={closeimage}
                          style={{
                            marginTop: "30px",
                          }}
                        />
                        <Button
                          colorScheme="whatsapp"
                          style={{
                            marginTop: "30px",
                            marginLeft: "100px",
                          }}
                          onClick={handleUpdateprofileImage}
                        >
                          Change Profile
                        </Button>
                      </div>
                    )}
                  </div>
                </Flex>

                <Box p={4}>
                  <Stack
                    spacing={0}
                    pl={4}
                    align={"flex-start"}
                    mb={2}
                    letterSpacing="1.2px"
                  >
                    <Flex align={"center"} gap="5">
                      <Heading
                        fontSize={"2xl"}
                        fontWeight={500}
                        whiteSpace="nowrap"
                      >
                        {userCredential.username}
                      </Heading>
                      <Box
                        w="100%"
                        color={"green"}
                        display={"flex"}
                        justifyContent="center"
                        alignItems={"center"}
                        gap="2"
                        borderRadius="10px"
                        mt="10px"
                      >
                        <Box
                          bg="green"
                          borderRadius={"50%"}
                          h="7px"
                          w="7px"
                        ></Box>
                        <Text fontWeight={"500"}>{getuser?.username}</Text>
                      </Box>
                    </Flex>
                    <Text fontSize={"md"} color={"gray.800"}>
                      {userCredential.bio}
                    </Text>
                    <Text fontSize={"sm"} color={"gray.500"}>
                      {userCredential.email}
                    </Text>
                  </Stack>
                  <Stack pl={4} mt="2" direction={"row"} fontSize=".9em">
                    <Text> {getuser?.followers.length} </Text>
                    <Text
                      _hover={{ textDecoration: "underline" }}
                      fontWeight="semibold"
                      color={"blue.500"}
                      onClick={handleFollow}
                    >
                      Follow
                    </Text>

                    <Text> {getuser?.followings.length} </Text>

                    <Text
                      _hover={{ textDecoration: "underline" }}
                      fontWeight="semibold"
                      color={"blue.500"}
                      onClick={handleFollowing}
                    >
                      {/* {NumberFormat(userCredential.followingCount)}  */}
                      Following
                    </Text>
                  </Stack>
                </Box>
              </Box>
              <Grid
                my={"40px"}
                gap={"20px"}
                gridTemplateColumns={{
                  base: `repeat(2, 1fr)`,
                  md: "repeat(3, 1fr)",
                  lg: "repeat(3, 1fr)",
                }}
                cursor="pointer"
              ></Grid>
            </Box>
          </Flex>

          {postData?.map((el, index) => {
            return <Post key={index} data={el} />;
          })}
        </Container>
      </div>
    </>
  );
}

export default Profile;
