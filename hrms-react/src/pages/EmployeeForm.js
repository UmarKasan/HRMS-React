import { useState } from "react";

export default function EmployeeForm() {
  const [position, setPosition] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:8080/api/registeruser", {
        headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json; charset=UTF-8'
        },
        method: "POST",
        body: JSON.stringify({
          position: position,
          password: password,
          firstname: firstname,
          lastname: lastname,
          email: email
        }),
      });
      if (res.status === 200) {
        setPosition("");
        setPassword("");
        setFirstname("");
        setLastname("");
        setEmail("");
        setMessage("User created successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h1 class="text-info">Register Employee</h1>
        <div class="mb-3">
          <label for="InputPosition" class="form-label">Position</label>
          <input 
            class="form-control" 
            id="InputPosition" 
            aria-describedby="PositionHelp"
            type="text"
            value={position}
            placeholder="Position"
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label for="InputPassword" class="form-label">Password</label>
          <input 
            class="form-control" 
            id="InputPassword" 
            aria-describedby="PasswordHelp"
            type="text"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label for="InputFirstname" class="form-label">First Name</label>
          <input 
            class="form-control" 
            id="InputFirstname" 
            aria-describedby="FirstnameHelp"
            type="text"
            value={firstname}
            placeholder="First Name"
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label for="InputLastname" class="form-label">Last Name</label>
          <input 
            class="form-control" 
            id="InputLastname" 
            aria-describedby="LastnameHelp"
            type="text"
            value={lastname}
            placeholder="Last Name"
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label for="InputEmail" class="form-label">Email</label>
          <input 
            class="form-control" 
            id="InputEmail" 
            aria-describedby="EmailHelp"
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button class="btn btn-primary" type="submit">Create</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  )
}
