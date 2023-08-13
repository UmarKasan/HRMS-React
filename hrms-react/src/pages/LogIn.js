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
        <h1>Log In</h1>
        <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Submit</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  )
}
