import React, { useState } from "react";

export default function ApplyClaimForm() {
  const [claimDate, setClaimDate] = useState("");
  const [claimAmount, setClaimAmount] = useState("");
  const [claimType, setClaimType] = useState("");
  const [fileUpload, setFileUpload] = useState("");
  const [message, setMessage] = useState("");

  const CLAIM_TYPES = [
    {value:"Transport", label:"Transport Claims"}, 
    {value:"Overseas", label:"Overseas Travel Claims"},
    {value:"Medical", label:"Medical Claims"},
    {value:"Monthly", label:"Monthly Claims"}
  ]

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:8080/claims", {
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-Type': 'application/json; charset=UTF-8'
        },
        method: "POST",
        body: JSON.stringify({
          claimDate: claimDate,
          claimAmount: claimAmount,
          claimType: claimType,
          fileUpload: fileUpload,
          // Other fields from the API headers can be added here
        }),
      });
      if (res.status === 200) {
        setClaimDate("");
        setClaimAmount("");
        setClaimType("");
        setFileUpload("");
        setMessage("Claim Submitted");
      } else {
        setMessage("Some error occurred");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h1 className="text-info">Submit Claim</h1>
        <div className="mb-3">
          <label htmlFor="InputClaimDate" className="form-label">Claim Date</label>
          <input 
            className="form-control" 
            id="InputClaimDate" 
            aria-describedby="claimDate"
            type="date"
            value={claimDate}
            placeholder=""
            onChange={(e) => setClaimDate(e.target.value)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="InputClaimAmount" className="form-label">Claim Amount</label>
          <input 
            className="form-control" 
            id="InputClaimAmount" 
            aria-describedby="claimAmount"
            type="text"
            value={claimAmount}
            placeholder="00.00"
            onChange={(e) => setClaimAmount(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="InputClaimType" className="form-label">Claim Type</label>
          <select 
            className="form-control" 
            id="InputClaimType" 
            value={claimType}
            placeholder="Select"
            onChange={(e) => setClaimType(e.target.value)}
            >
              {CLAIM_TYPES.map((type) => (
                <option value={type.value}>{type.label}</option>
              ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="InputFileUpload" className="form-label">File Upload</label>
          <input 
            className="form-control" 
            id="InputFileUpload" 
            aria-describedby="fileUpload"
            type="file"
            value={fileUpload}
            placeholder="Select File"
            onChange={(e) => setFileUpload(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" type="submit">Submit Claim</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
        </form>
    </div>
    )
}

// export default ApplyClaimForm;