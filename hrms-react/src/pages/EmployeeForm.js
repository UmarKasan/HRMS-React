import { useState } from "react";

export default function EmployeeForm() {
  const [username, setUsername] = useState("");
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
          username: username,
          password: password,
          firstname: firstname,
          lastname: lastname,
          email: email
        }),
      });
      if (res.status === 200) {
        setUsername("");
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
        <h1>Sign Up</h1>
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
        <input
          type="text"
          value={firstname}
          placeholder="First Name"
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          type="text"
          value={lastname}
          placeholder="Last Name"
          onChange={(e) => setLastname(e.target.value)}
        />
        <input
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Create</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  )
}
