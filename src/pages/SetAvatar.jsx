import React, { useEffect, useState } from "react";
import stylerr from "styled-components";
import axios from "axios";
import {Buffer} from "buffer";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";

export default function SetAvatar() {

    const api = `https://api.multiavatar.com/45678945`;
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);

    const toastoptions={
        position: "bottom-right",
        autoclose: 4000,
        pauseOnHover: true,
        draggable: true,
    };

    useEffect(()=>{
      if(!localStorage.getItem("banter-user"))
          navigate('/login')
  },[])

    const setProfilePicture = async ()=>{
      if(selectedAvatar ===undefined){
        toast.error("Please select one avatar",toastoptions)
      }
      else{
        const user = await JSON.parse(localStorage.getItem("banter-user"));
        const {data} =await axios.post(`${setAvatarRoute}/${user._id}`,{
          image: avatars[selectedAvatar],
        });
        if(data.isSet) {
          user.isAppearance = true;
          user.appearance = data.image;
          localStorage.setItem("banter-user",JSON.stringify(user));
          navigate('/');
        }
        else{
          toast.error("Please Try again",toastoptions);
        }
      }
    };

    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = [];
          for (let i = 0; i < 4; i++) {
            const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
            const buffer = Buffer.from(image.data);
            data.push(buffer.toString('base64'));
          }
          setAvatars(data);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching images:", error);
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, []);

  return (
    <div>
      {
        isLoading ? <Container>
          <div className="load">
          <h1>Loading....
          </h1>
          </div>
      
        </Container> : (
          <Container>
       
       <div className="mainbox">
       <div className="title-container">
     <h1>Pick your Appearance</h1>
   </div>
   <div className="avatars">
     {
       avatars.map((avatar,index) =>{
         return(
           <div 
           key={index}
           className={`avatar ${selectedAvatar === index ? "selected" :""

           }`}>
           <img
                 src={`data:image/svg+xml;base64,${avatar}`}
                 alt="avatar"
                 key={avatar}
                 onClick={() => setSelectedAvatar(index)}
               />
           </div>
         )
       })
     }
   </div>
<button onClick={setProfilePicture}>Continue</button>
</div>

 
   
     </Container>
        )
      }
        
        <ToastContainer/>
      
    </div>
  )
}
const Container = stylerr.div`
 display: flex;
  justify-content: center;
    align-items: center;
   
.load{
  display: flex;
  height: 70vh;
  width: 70vw;
   margin:15vh;
  color: #4e0eff;
   justify-content: center;
  align-items: center;
  text-align: center;
}
.mainbox{
height: 70vh;
  width: 70vw;
   margin:15vh;
  border-radius: 2rem;
  filter: drop-shadow(-1rem 1rem 1rem rgb(51, 51, 51));
   overflow : auto;
   scrollbar-width:none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3rem;
  align-items: center;
  background-color: white;
}


  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
       color: #4e0eff;
      padding-top: 15px;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
   

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
        &:hover{
    transform: scale(1.2);
     transition: 0.5s ease-in-out;
     filter: drop-shadow(-0.5rem 0.5rem 0.5rem rgb(51, 51, 51));
    }
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  }
`;



