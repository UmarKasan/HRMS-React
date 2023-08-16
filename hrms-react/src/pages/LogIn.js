import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  let handleSubmit = async (e) => {
    e.preventDefault();

    console.log(email);
    console.log(password);

    if (email !== "" && password !== "") {
      const url = "http://localhost:8080/employees/login";

      console.log(email);
      console.log(password);

      try {
        let res = await axios.get(url, 
                                 {params: 
                                  { 
                                    email_address: email,
                                    employee_password: password
                                  }});

        console.log(res);
        console.log(res.data);

        if (res.status === 200) {
          navigate('/user', { state: {data: res.data} });
        } else {
          setMessage("Some error occurred");
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <h1 className="text-info">Log In</h1>
          <label htmlFor="InputEmail" className="form-label">Email address</label>
          <input 
            className="form-control" 
            id="InputEmail" 
            aria-describedby="emailHelp"
            type="text"
            value={email}
            placeholder="JohnDoe@Lmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input
            className="form-control" 
            id="exampleInputPassword1"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" type="submit">Submit</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
        
      </form>
    </div>
  )
}
