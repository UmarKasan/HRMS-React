import React from "react"
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  let handleSubmit = async (e) => {
    e.preventDefault();

    console.log(username);
    console.log(password);

    if (username !== "" && password !== "") {
      const url = "http://localhost:8080/api/loginuser";

      console.log(username);
      console.log(password);

      try {
        let res = await axios.get(url, 
                                 {params: 
                                  { 
                                    username: username,
                                    password: password
                                  }});

        console.log(res);
        console.log(res.data);

        if (res.status === 200) {
          navigate('/user', { state: {data: res.data} });
        } else {
          setMessage("Some error occured");
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <h1 class="text-info">Log In</h1>
          <label for="InputEmail" class="form-label">Email address</label>
          <input 
            class="form-control" 
            id="InputEmail" 
            aria-describedby="emailHelp"
            type="text"
            value={username}
            placeholder="JohnDoe@Lmail.com"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input
            class="form-control" 
            id="exampleInputPassword1"
            type="text"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          </div>
          <button class="btn btn-primary" type="submit">Submit</button>

          <div className="message">{message ? <p>{message}</p> : null}</div>
        
      </form>
    </div>
  )
}
