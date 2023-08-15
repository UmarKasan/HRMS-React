import { useState, useRef } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

export default function Post() {
  const {state} = useLocation();
  const navigate = useNavigate();
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [registration, setRegistration] = useState("");
  const [pricerange, setPricerange] = useState("");
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileRef = useRef();

  let handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  let handleClick = async (e) => {
    e.preventDefault();

    const buttonValue = e.currentTarget.value;

    if (buttonValue === "home") {
      navigate('/home');
    }
  }

  let handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setMessage("Please select an image for your car model.");
      return;
    }

    console.log(selectedFile.name);
    const image = "images/" + selectedFile.name;
    console.log(image);
    
    try {
      let res = await fetch("http://localhost:8080/api/addcar", {
        headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json; charset=UTF-8'
        },
        method: "POST",
        body: JSON.stringify({
          userid: state.data.id,
          username: state.data.username,
          email: state.data.email,
          make: make,
          model: model,
          image: image,
          registration: registration,
          pricerange: pricerange
        }),
      });
      if (res.status === 200) {
        fileRef.current.value = null;
        setMake("");
        setModel("");
        setRegistration("");
        setPricerange("");
        setMessage("New post created successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <button value="home" className="Button4" type="submit" onClick={handleClick}>Return to Home</button>
      <div className="App">
        <form onSubmit={handleSubmit}>
          <h1>Welcome, { state.data.username }</h1>
          <h1>New Post</h1>
          <input
            type="text"
            value={make}
            placeholder="Make"
            onChange={(e) => setMake(e.target.value)}
          />
          <input
            type="text"
            value={model}
            placeholder="Model"
            onChange={(e) => setModel(e.target.value)}
          />
          <input 
            type="file" 
            onChange={handleFileChange} 
            ref={fileRef}
          />
          <input
            type="text"
            value={registration}
            placeholder="Registration"
            onChange={(e) => setRegistration(e.target.value)}
          />
          <input
            type="text"
            value={pricerange}
            placeholder="Price Range"
            onChange={(e) => setPricerange(e.target.value)}
          />

          <button className="Button3" type="submit">Post</button>

          <div className="message">{message ? <p>{message}</p> : null}</div>
        </form>
      </div>
    </div>
  )
}
