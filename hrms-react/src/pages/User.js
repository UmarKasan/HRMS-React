import React from 'react';
import { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function User() {
    const {state} = useLocation();
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    let handleClick = async (e) => {
      e.preventDefault();

      const buttonValue = e.currentTarget.value;

      console.log(buttonValue);

      if (buttonValue === "delete") {
        const url = "http://localhost:8080/api/searchcarbyusernameandemail?username=" + state.data.username + 
                    "&email=" + state.data.email;
        try {
          let res = await axios.get(url);
    
          console.log(res.status);
          console.log(res.data);
          
          if (res.status === 200) {
            navigate('/deletepost', { state: {data: res.data} });
          }
          
        } catch (err) {
          console.log(err);
          setMessage("You have no post.  Please create one.");
        }
      }

      if (buttonValue === "post") {
        navigate('/postsale', { state: {data: state.data} });
      }
    }

    return (
      <div>
        <button value="delete" className="Button1" type="submit" onClick={handleClick}>Delete</button>&nbsp;
        <button value="post" className="Button2" type="submit" onClick={handleClick}>Post</button>
        <div className="App">
          <form>
            <h1>Welcome, { state.data.username }</h1>
            <div>Username: { state.data.username }</div>
            <div>First Name: { state.data.firstname }</div>
            <div>Last Name: { state.data.lastname }</div>
            <div>Email: { state.data.email }</div>
            <div className="message">{message ? <p>{message}</p> : null}</div>
          </form>
        </div>
      </div>
    )
  }