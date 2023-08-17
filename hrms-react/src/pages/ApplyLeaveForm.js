import { useState } from "react";

export default function ApplyLeaveForm() {
  const [leaveDate, setLeaveDate] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:8080/leave-applications", {
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-Type': 'application/json; charset=UTF-8'
        },
        method: "POST",
        body: JSON.stringify({
          leaveDate: leaveDate,
          reason: reason,
          
          // Other fields from the API headers can be added here
        }),
      });
      if (res.status === 200) {
        setLeaveDate("");
        setReason("");
        setMessage("Leave Applied");
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
        <h1 className="text-info">Apply Leave</h1>
        <div className="mb-3">
          <label htmlFor="InputLeaveDate" className="form-label">Leave Date</label>
          <input 
            className="form-control" 
            id="InputLeaveDate" 
            aria-describedby="leaveDate"
            type="date"
            value={leaveDate}
            placeholder=""
            onChange={(e) => setLeaveDate(e.target.value)}/>
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
        <button className="btn btn-primary" type="submit">Apply</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
        </form>
    </div>
    )
}

{/* export default ApplyLeaveForm; */}