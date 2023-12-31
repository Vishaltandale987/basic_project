import {
    Center,
    Flex,
    Heading,
    HStack,
    Image,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Spinner,
    Stack,
    Text,
    useBreakpointValue,
    useDisclosure,
  } from "@chakra-ui/react";
  import { Link, useNavigate } from "react-router-dom";
  import React, { useRef, useState } from "react";
  import { AiOutlineSearch } from "react-icons/ai";
  import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "../redux/Products/products.actions";
import SearchModal from "./Search/SearchModal";
import { CloseIcon } from "@chakra-ui/icons";
import axios from "axios";

  
  const Search = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { loading, products } = useSelector((state) => state.productManager);
    const searchRef = useRef(null);
    const searchOutside = useRef(null);
  
    const dispatch = useDispatch();
    const navigate = useNavigate();


  
    function debounce(func, timeout = 3000) {
      let timer;
      return () => {
        if (timer) {
          return;
        }
        clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, arguments);
        }, timeout);
      };
    }
  
    const searchData = () => {
      if (searchRef.current) {
        dispatch(searchProducts({ q: searchRef.current.value || "" }));
      }
    };
    const handleChange = () => {
      if (isOpen && searchRef.current) {
        if (!searchRef.current.value.length) {
          onClose();
        
        }
      }
    };
    const processChange = debounce(searchData, 1500);


    const handleProfile = (id) => {
      localStorage.setItem('profile',id)
      onClose()
    }

    //search


    const [description, setdescription] = useState("")
    const [search, setsearch] = useState([])




    const getSearchData = async () => {
      try {
  
        let res = await axios(`https://new-facebook-server.vercel.app/user/search/${description}`)
  
        setsearch(res.data)
  
  
      } catch (error) {
        console.log(error)
      }
    }
    if(description !== ""){

      getSearchData()
    }


  



  
    return (
      <>
        <Text
          display={useBreakpointValue({ base: "solid", md: "none" })}
          fontSize={"30px"}
          onClick={onOpen}
        >
          <AiOutlineSearch />
        </Text>
        <InputGroup
          w={"370px"}
          mt={2}
          display={useBreakpointValue({ base: "none", md: "solid" })}
        >
          <InputLeftElement
            py={"20px"}
            pointerEvents="none"
            children={<AiOutlineSearch color="gray.300" fontSize={"20px"} />}
          />
          <Input
            py={"20px"}
            type="text"
            placeholder="Search users."
            focusBorderColor="gray.400"
            variant={"filled"}
            ref={searchOutside}
       
            onClick={async () => {
              await onOpen();
              searchRef.current.focus();
              searchRef.current.value = searchOutside.current.value;
            }}
            onChange={
              async (e) => {
              await onOpen();
              searchRef.current.value = e.target.value;
              searchRef.current.focus();
             
              setdescription(e.target.value)
            }
          }

          />

     

  
          <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={"inside"}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
              <CloseIcon 
              style={{
                float:"right",
                marginBottom:"20px"
                
              }}
              onClick={() => onClose()}
              />

                <InputGroup mt={2}>
                  <InputLeftElement
                    py={"20px"}
                    pointerEvents="none"
                    children={
                      <AiOutlineSearch color="gray.300" fontSize={"20px"} />
                    }
                  />
                  <Input
                    py={"20px"}
                    type="text"
                    placeholder="Search User"
                    focusBorderColor="gray.400"
                    variant={"filled"}
                    ref={searchRef}
                    onChange={(e) => {
                      searchOutside.current.value = searchRef.current.value;
                      processChange();
                      handleChange();
                      setdescription(e.target.value)

                    }}
                  />
                </InputGroup>
              </ModalHeader>
              <ModalBody>
                {loading ? (
                  <Center>
                    <Spinner m={"auto"} />
                  </Center>
                ) : products.length ? (
                  <Stack>


                  {search?.map((el, index) => {
            return <SearchModal key={index} data={el} handleProfile={handleProfile} />;
          })}
                  </Stack>
                ) : (
                  <Center>No Result Found!</Center>
                )}
              </ModalBody>
            </ModalContent>
          </Modal>
        </InputGroup>
      </>
    );
  };
  
  export default Search;
  