import React, { useState, useEffect } from "react";
import styled from 'styled-components'
export default function Welcome({ currentUser }) {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    useEffect(() => {
        const fetchData = async () => {
          const data = await JSON.parse(
            localStorage.getItem("banter-user")
          );
          if(data!=null)
            {
          setCurrentUserName(data.username);
          setCurrentUserImage(data.appearance);
            }
        };
        
        fetchData();
    
       
      }, []);


  return (
    <>
        <Container>
    <div>
    <img
     src={`data:image/svg+xml;base64,${currentUserImage}`}  alt="avatar"
     />
      <h1> Hello, <span>{currentUserName}</span> </h1>
      <h3>Welcome to Banter</h3>
    </div>
    </Container>
    </>

  )
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  flex-direction: column;
  overflow:scroll;
  scrollbar-width:none;
  span {
    color: #4e0eff;
  }
    img{
    width: 17rem;
padding-left:1rem;
    }
`;
