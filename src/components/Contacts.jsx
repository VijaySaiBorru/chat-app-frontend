import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg.png";
import { allUsersRoute } from '../utils/APIRoutes';
import Logout from './Logout';
export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const data = await JSON.parse(
        localStorage.getItem("banter-user")
      );
      if(data!=null)
      setCurrentUserName(data.username);
      setCurrentUserImage(data.appearance);
      
    };
    
    fetchData();

   
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {
      currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h2>Banter</h2>
          </div>
           <div className="contacts">
            <h2>Chats</h2>
             {contacts.map((contact, index) => (
              <div
                key={contact._id}
                className={`contact ${
                  index === currentSelected ? "selected" : ""
                }`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${contact.appearance}`}
                    alt="avatar"
                  />
                </div>
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            ))}
          </div> 
          <div className="current-user">
          <Logout/>
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
   display: grid;
  grid-template-rows: 9.5% 75.5% 15%;
  overflow: hidden;
  background-color: transparent;
  border-right: solid;
  border-width:0.01rem;
  border-color:grey;
  
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    border-bottom: solid;
  border-width:0.01rem;
  border-color:grey;
    img {
      height: 2rem;
      padding-top: 0.3rem;
      transform: scale(3);
    }
    h2 {
      color:#4e0eff;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.9rem;
        h2{
        padding-top: 1rem;
        color:#4e0eff;
         text-transform: uppercase;
        }
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }

    .contact {
      background-color: white;
      border-bottom:solid;
      min-height: 3 rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.8rem;
      padding: 0.6rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;

      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: black;
        }
      
      }

    &:hover{
    transform: scale(1.03);
    color: #4e0eff;
   background-color: rgb(239, 239, 239);
     transition: 0.5s ease-in-out;
     filter: drop-shadow(-0.07rem 0.07rem 0.2rem rgb(51, 51, 51));
    }

    }
    
    .selected {
      background-color: #9a86f3;
    }
        
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.8rem;
    .avatar {
      img {
        height: 3rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
