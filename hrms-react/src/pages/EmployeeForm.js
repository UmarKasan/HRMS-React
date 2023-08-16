import { useState } from "react";

export default function EmployeeForm() {
  const [employeeName, setEmployeeName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [employeePassword, setEmployeePassword] = useState("");
  const [icNumber, setIcNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [skills, setSkills] = useState("");
  const [reportsTo, setReportsTo] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:8080/employees", {
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-Type': 'application/json; charset=UTF-8'
        },
        method: "POST",
        body: JSON.stringify({
          employeeName: employeeName,
          emailAddress: emailAddress,
          employeePassword: employeePassword,
          icNumber: icNumber,
          dateOfBirth: dateOfBirth,
          address: address,
          qualifications: qualifications,
          skills: skills,
          reportsTo: reportsTo,
          emergencyContact: emergencyContact,
          // Other fields from the API headers can be added here
        }),
      });
      if (res.status === 200) {
        setEmployeeName("");
        setEmailAddress("");
        setEmployeePassword("");
        setIcNumber("");
        setDateOfBirth("");
        setAddress("");
        setAddress("");
        setQualifications("");
        setReportsTo("");
        setSkills("");
        setEmergencyContact("");
        setMessage("User created successfully");
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
        <h1 className="text-info">Register Employee</h1>
        <div className="mb-3">
          <label htmlFor="InputEmployeeName" className="form-label">Employee Name</label>
          <input 
            className="form-control" 
            id="InputEmployeeName" 
            aria-describedby="employeeName"
            type="text"
            value={employeeName}
            placeholder="John Doe"
            onChange={(e) => setEmployeeName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="InputEmailAddress" className="form-label">Email Address</label>
          <input 
            className="form-control" 
            id="InputEmailAddress" 
            aria-describedby="emailAddress"
            type="text"
            value={emailAddress}
            placeholder="johndoe@Lmail.com"
            onChange={(e) => setEmailAddress(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="InputPassword" className="form-label">Employee Password</label>
          <input 
            className="form-control" 
            id="InputPassword" 
            aria-describedby="employeePassword"
            type="password"
            value={employeePassword}
            placeholder="Password"
            onChange={(e) => setEmployeePassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="InputIcNumber" className="form-label">NRIC Number</label>
          <input 
            className="form-control" 
            id="InputIcNumber" 
            aria-describedby="icNumber"
            type="text"
            value={icNumber}
            placeholder="S91234567X"
            onChange={(e) => setIcNumber(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="InputDateOfBirth" className="form-label">DateOfBirth</label>
          <input 
            className="form-control" 
            id="InputDateOfBirth" 
            aria-describedby="dateOfBirth"
            type="date"
            value={dateOfBirth}
            placeholder="2000-04-11"
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="InputAddress" className="form-label">Address</label>
          <input 
            className="form-control" 
            id="InputAddress" 
            aria-describedby="address"
            type="text"
            value={address}
            placeholder="123 Sesame Street 1 #01-00"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="InputQualifications" className="form-label">Qualifications</label>
          <input 
            className="form-control" 
            id="InputQualifications" 
            aria-describedby="qualifications"
            type="text"
            value={qualifications}
            placeholder="I went to school"
            onChange={(e) => setQualifications(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="InputSkills" className="form-label">Skills</label>
          <input 
            className="form-control" 
            id="InputSkills" 
            aria-describedby="skills"
            type="text"
            value={skills}
            placeholder="wiggle my toes"
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="InputReportsTo" className="form-label">Reports To</label>
          <input 
            className="form-control" 
            id="InputReportsTo" 
            aria-describedby="reportsTo"
            type="text"
            value={reportsTo}
            placeholder="boss"
            onChange={(e) => setReportsTo(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="InputEmergencyContact" className="form-label">Emergency Contact</label>
          <input 
            className="form-control" 
            id="InputEmergencyContact" 
            aria-describedby="emergencyContact"
            type="text"
            value={emergencyContact}
            placeholder="boss"
            onChange={(e) => setEmergencyContact(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" type="submit">Create</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  )
}