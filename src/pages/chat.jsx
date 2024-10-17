import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
 import Welcome from "../components/Welcome";
 import { io } from "socket.io-client";

function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const[contacts,setContacts]=useState([]);
  const [currentUser,setCurrentUser]=useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [loadingUser,setLoadingUser]=useState(true);
  const [isLoaded, setIsLoaded] =useState(false);
  
  const setUser = async ()=>{
    if(!localStorage.getItem("banter-user")){
      navigate('/login');
    }
    else{
      setCurrentUser(await JSON.parse(localStorage.getItem("banter-user")));
      setIsLoaded(true);
      setTimeout(async()=>{
        setLoadingUser(false);
      },1000)
    }
  }
  
const getContacts =async()=>{
  if(currentUser){
    if(currentUser.appearance){
      const req = await fetch(`${allUsersRoute}/${currentUser._id}`);
      const res =await req.json();
      setContacts(res)
    }
    else
    {
      navigate('/avatar');
    }
  }
}




const handleChatChange = (chat) => {
  setCurrentChat(chat);
};


useEffect(()=>{
  setUser();
},[])

useEffect(()=>{
  if(currentUser){
    socket.current = io(host);
    socket.current.emit("add-user",currentUser._id);
  }
},[loadingUser])


useEffect(()=>{
getContacts();
console.log()
},[loadingUser])

  return (
    <>
    <Container>
    <div className="container">
    <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentUser && currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat = {currentChat} currentUser={currentUser} socket={socket}/>
          )}
    </div>
  </Container>
</>
  )
}

const Container = styled.div`
height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: white;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: white;
    filter: drop-shadow(-1rem 1rem 1rem rgb(51, 51, 51));
    border-radius:1rem;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
export default Chat

