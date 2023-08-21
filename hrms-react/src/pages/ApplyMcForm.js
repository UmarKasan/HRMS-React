import { useContext, useState } from "react";
import { UserContext } from "../UserContext";

export default function ApplyMcForm() {
  const [mcDate, setMcDate] = useState("");
  const [reason, setReason] = useState("");
  const [fileUpload, setFileUpload] = useState("");
  const [message, setMessage] = useState("");
  const userInfo = useContext(UserContext);

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:8080/mc-submissions", {
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-Type': 'application/json; charset=UTF-8'
        },
        method: "POST",
        body: JSON.stringify({
          mcDate: mcDate,
          reason: reason,
          fileUpload: fileUpload,
          employee: userInfo.employee
          
          // Other fields from the API headers can be added here
        }),
      });
      if (res.status === 200) {
        setMcDate("");
        setReason("");
        setFileUpload("");
        setMessage("MC Applied");
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
        <h1 className="text-info">Apply Medical Leave</h1>
        <div className="mb-3">
          <label htmlFor="InputMcDate" className="form-label">MC Date</label>
          <input 
            className="form-control" 
            id="InputMcDate" 
            aria-describedby="mcDate"
            type="date"
            value={mcDate}
            placeholder=""
            onChange={(e) => setMcDate(e.target.value)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="InputReason" className="form-label">Reason</label>
          <input 
            className="form-control" 
            id="InputReason" 
            aria-describedby="reason"
            type="text"
            value={reason}
            placeholder="Reason"
            onChange={(e) => setReason(e.target.value)}
          />
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
        <button className="btn btn-primary" type="submit">Apply</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
        </form>
    </div>
    )
}