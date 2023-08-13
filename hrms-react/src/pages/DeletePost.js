import React from 'react';
import { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function DeletePost() {
    const {state} = useLocation();
    const username = state.data[0].username;
    const email = state.data[0].email;
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    var msg = "existed";

    console.log(username);
    console.log(email);
    console.log(state.data)

    let handleClick = async (e) => {
      e.preventDefault();

      const buttonValue = e.currentTarget.value;

      if (buttonValue === "home") {
        navigate('/home');
      }

      const urlDelete = "http://localhost:8080/api/deletebyid?id=" + buttonValue;

      console.log(buttonValue);
      console.log(urlDelete)

      try {
        let res = await axios.post(urlDelete);
  
        console.log(res);
        console.log(res.data);
        
        const urlCar = "http://localhost:8080/api/searchcarbyusernameandemail?username=" + username + 
                    "&email=" + email;
        try {
          let res = await axios.get(urlCar);
    
          console.log(res);
          console.log(res.data);
          
          if (res.status === 200) {
            navigate('/deletepost', { state: {data: res.data} });
          }
        } catch (err) {
          console.log(err);
          msg = "";
          setMessage("Above is the last to delete.  You have no post.  Please create one.");
        }       
      } catch (err) {
        console.log(err);
      }
    }

    return (
      <div>        
        <button value="home" className="Button4" type="submit" onClick={handleClick}>Return to Home</button>
        <div className="App">
          <form>
            <h1>Welcome, { username }</h1>
            <div>
              {msg === "existed" && state.data.map((result) => (
                  <div key={ result.id }>
                    <div>&nbsp;</div>
                    <div><img src={ result.image } width="280" height="100" alt=""/></div>
                    <div>Id: { result.id}</div>
                    <div>Username: { result.username }</div> 
                    <div>Email: { result.email },</div>
                    <div>Make: { result.make }, Model: { result.model },</div>
                    <div>Registration: { result.registration }, Price Range: { result.pricerange }</div>
                    <div>&nbsp;</div>
                    <button className="Button3" value={ result.id } type="submit" onClick={handleClick}>Delete</button>
                    <div>&nbsp;</div>
                  </div>
                ))}
             <div className="message">{message ? <p>{message}</p> : null}</div>
            </div>  
          </form>
        </div>
      </div>
    )
  }