import "./post.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { BsFillHeartFill } from "react-icons/bs";
import { DeleteIcon } from "@chakra-ui/icons";
import moment from "moment";
export default function Post({ data ,maingetPost }) {
  const [postData, setpostData] = useState();
  const [showComments, setComments] = useState(false);
  const [createComment, setcreateComment] = useState("");
  const [topsection, settopsection] = useState();

  const toast = useToast();

  // time

  //like


  let ass = localStorage.getItem("id");
  let idata = {
    userId: ass,
  };

  const handleLikes = async () => {
    // console.log(data._id,data.userId)
    try {
      const res = await axios.put(
        `https://new-facebook-server.vercel.app/post/${data._id}/like`,
        idata
      );

      toast({
        position: "top",
        title: `You Like ${data.username} post.`,
        // description: "done",
        status: "success",
        duration: 4000,
        isClosable: false,
      });

      maingetPost()
    
    } catch (error) {
      console.log(error);
    }
  };



  //comments

  const [getuser, setgetuser] = useState();
  const getUserData = async () => {
    try {
      const res = await axios(
        `https://new-facebook-server.vercel.app/user/${ass}`
      );
      setgetuser(res.data);
    } catch (error) {
      // console.log(error);
    }
  };

  let time = moment().format("MMMM Do YYYY, h:mm:ss a");

  let object = {
    comment: createComment,
    username: getuser?.username,
    profilePicture: getuser?.profilePicture,
    curenttime: time,
  };

 
  const handleCommentPost = async () => {

    console.log("handleCommentPost")
    try {

    

        const res = await axios.put(
          `https://new-facebook-server.vercel.app/post/${data._id}/comment`,
          object
          );

     

          toast({
            position: "top",
            title: res.data.msg,
    
            status: "success",
            duration: 4000,
            isClosable: false,
          });
    
          maingetPost()

       
      // console.log(res.data.msg)

    
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(data);

  //get post

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
    // getTopData();
    if(ass !== null){

      getUserData();
    }
  }, []);

  // Delete post
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleDeletePost = async () => {
    let postId = data._id;

    // console.log(postId, idata);

    try {
      const res = await axios.delete(
        `https://new-facebook-server.vercel.app/post/${postId}`,
        { data: idata }
      );

      console.log(res.data)
      toast({
        position: "top",
        title: `${res.data}`,
        status: "success",
        duration: 4000,
        isClosable: false,
      });

      maingetPost()
    } catch (error) {
      toast({
        position: "top",
        title: `You can't delete other user post.`,
        status: "error",
        duration: 4000,
        isClosable: false,
      });
    }

    onClose();
  };


  // console.log(data.comment)

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            {/* <Link to={`/profile/${user.username}`}> */}
            <img
              className="postProfileImg"
              src={data.user_profilePicture}
              alt=""
            />
            {/* </Link> */}
            <span className="postUsername">{data.username}</span>
            <span className="postDate">{data.postTime}</span>
          </div>
          <div className="postTopRight">
            {/* <h1
            onClick={handleDeletePost}
            >Delete</h1> */}
            <DeleteIcon onClick={onOpen} />

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalBody>
                  <p>
                
                    <b> Are you sure you want to delete your post. </b>
                  </p>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button colorScheme="red" onClick={handleDeletePost}>
                    Delete
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>
        </div>

        <div className="postCenter">
          <span className="postText">{data.desc}</span>
          <img className="postImg" src={data.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <p className="likeIcon" onClick={handleLikes}>
              <BsFillHeartFill />
            </p>
            {/* <p className="likeIcon">lik</p> */}
            <span className="postLikeCounter">{data.likes.length}</span>
          </div>
          <div className="postBottomRight">
            <span
              className="postCommentText"
              onClick={() => setComments((v) => !v)}
            >
              {data.comment.length} comments
            </span>
          </div>
        </div>
        <h1>{createComment}</h1>
        {showComments && (
          <Box as="section" className="comments-container">

            {data.comment?.map((el, index) => {
             return <div key={index}>
          <Card
            h="max-content"
            boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
            mt="20px"
            border={"1px"}
            borderColor={"gray.400"}
          >
            <CardBody>
              <Box display={"flex"} alignItems={"center"}>
                <Avatar
                  size="0.5x0.5"
                  name="Segun Adebayo"
                  w={50}
                  src={el.profilePicture}
                />

                <Stack ml={5}>
                  <Divider />
                  <Text size="md" textAlign={"center"} fontWeight="bold">
                    {el.username}
                  </Text>
                </Stack>

                <Stack ml={5}>
                  <Divider />
                  <Text size="md" textAlign={"center"} fontWeight="bold">
                    {el.curenttime}
                  </Text>
                </Stack>
              </Box>

              <Stack ml={5}>
                  <Divider />
                  <Text size="md" textAlign={"left"} fontWeight="bold">
                    {el.comment}
                  </Text>
                </Stack>
            </CardBody>
          </Card>
             
              </div>
            })}

            <div className="des">
              <input
                placeholder={"Create Comment"}
                className="shareInput"
                type="text"
                onChange={(e) => setcreateComment(e.target.value)}
                required
              />

              <button className="shareButton" onClick={handleCommentPost}>
                Post
              </button>
            </div>
          </Box>
        )}
      </div>
    </div>
  );
}
