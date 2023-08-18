import React, { useState, useContext } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { UserDispatchContext } from "../UserContext";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  
  const dispatch = useContext(UserDispatchContext);

  let handleSubmit = async (e) => {
    e.preventDefault();

    console.log(email);
    console.log(password);

    if (email !== "" && password !== "") {
      const url = "http://localhost:8080/employees/login";

      console.log(email);
      console.log(password);

      try {
        let res = await axios.post(url, 
                                 {
                                    emailAddress: email,
                                    employeePassword: password
                                  });

        console.log(res);
        console.log(res.data);

        if (res.status === 200) {
          dispatch({
            type: 'login',
            username: res.data.employeeName,
            userId: res.data.employeeId,
            userRole: res.data.employeePosition,
            employee: res.data
          })
          navigate('/home');
        }else {
          setMessage("Some error occurred");
        }
      } catch (err) {
        if (err.response) {
          if (err.response.status === 404) {
            setMessage("User not found");
          } else if (err.response.status === 401) {
            setMessage("Invalid username or password");
          } else {
            setMessage("Error occurred");
          }
        }
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
        <p></p>
        {message && (
          <div className="alert alert-primary d-flex justify-content-center">
            <div className="alert-link" role="alert">
              <p>{message}</p>
            </div>
          </div>)
        }
        
      </form>
    </div>
  )
}
