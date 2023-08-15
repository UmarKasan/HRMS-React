import React from "react"
import { useState } from "react";
import axios from 'axios';

export default function Search() {
  const [searchmode, setSearchmode] = useState("Make");
  const [searchtype, setSearchtype] = useState("");
  const [message, setMessage] = useState("");
  const [results, setResults] = useState("[]");

  let handleSubmit = async (e) => {
    e.preventDefault();

    console.log(searchmode);
    console.log(searchtype);

    if (message === "Car searched successfully") {
      setMessage("");
    }

    if (searchmode === "Make" && searchtype !== "") {
      const url = "http://localhost:8080/api/searchcarbymake?make="+searchtype;

      console.log(searchmode);
      console.log(searchtype);
      console.log(url);

      try {
        let res = await axios.get(url);

        console.log(res);
        setResults(res.data);

        if (res.status === 200) {
          setSearchtype("");
          setMessage("Car searched successfully");
        } else {
          setMessage("Some error occured");
        }
      } catch (err) {
        console.log(err);
      }
    }

    if (searchmode === "Model" && searchtype !== "") {
      const url = "http://localhost:8080/api/searchcarbymodel?model="+searchtype;

      console.log(searchmode);
      console.log(searchtype);
      console.log(url);

      try {
        let res = await axios.get(url);

        console.log(res);
        setResults(res.data);

        if (res.status === 200) {
          setSearchtype("");
          setMessage("Car searched successfully");
        } else {
          setMessage("Some error occured");
        }
      } catch (err) {
        console.log(err);
      }
    }

    if (searchmode === "Registration" && searchtype !== "") {
      const url = "http://localhost:8080/api/searchcarbyregistration?registration="+searchtype;

      console.log(searchmode);
      console.log(searchtype);
      console.log(url);

      try {
        let res = await axios.get(url);

        console.log(res);
        setResults(res.data);

        if (res.status === 200) {
          setSearchtype("");
          setMessage("Car searched successfully");
        } else {
          setMessage("Some error occured");
        }
      } catch (err) {
        console.log(err);
      }
    }

    if (searchmode === "Price Range" && searchtype !== "") {
      const url = "http://localhost:8080/api/searchcarbypricerange?pricerange="+searchtype;

      console.log(searchmode);
      console.log(searchtype);
      console.log(url);

      try {
        let res = await axios.get(url);

        console.log(res);
        setResults(res.data);

        if (res.status === 200) {
          setSearchtype("");
          setMessage("Car searched successfully");
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
        <h1>Search</h1>
        <h3>by &nbsp;
        <select value={ searchmode } onChange={(e) => setSearchmode(e.target.value)}>
          <option value="Make">Make</option>
          <option value="Model">Model</option>        
          <option value="Registration">Registration</option>
          <option value="Price Range">Price Range</option>
        </select>
        </h3>
        <input
          type="text"
          value={searchtype}
          placeholder="Search type"
          onChange={(e) => setSearchtype(e.target.value)}
        />

        <button type="submit">Submit</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
        <div>
          {message === "Car searched successfully" && results.map((result) => (
            <div key={ result.id }>
              <div>&nbsp;</div>
              <div><img src={ result.image } width="280" height="100" alt=""/></div>
              <div>Username: { result.username }</div> 
              <div>Email: { result.email },</div>
              <div>Make: { result.make }, Model: { result.model },</div>
              <div>Registration: { result.registration }, Price Range: { result.pricerange }</div>
              <div>&nbsp;</div>
            </div>
          ))}
        </div>
      </form>
    </div>
  )
}
