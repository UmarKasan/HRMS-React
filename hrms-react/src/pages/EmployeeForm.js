import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function EmployeeForm() {
  const [employeeName, setEmployeeName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [employeePassword, setEmployeePassword] = useState("");
  const [icNumber, setIcNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [skills, setSkills] = useState("");
  const [employeePosition, setEmployeePosition] = useState("");
  const [reportsTo, setReportsTo] = useState("");
  const [managers, setManagers] = useState([{ value: "", label: "" }]);
  const [emergencyContact, setEmergencyContact] = useState("");
  const [message, setMessage] = useState("");
  const [validForm, setValidForm] = useState(false);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    employeeName: "",
    emailAddress: "",
    employeePassword: "",
    icNumber: "",
    emergencyContact: "",
  });

  const POSITION = [
    { value: "ADMIN", label: "ADMIN" },
    { value: "MANAGER", label: "MANAGER" },
    { value: "EMPLOYEE", label: "EMPLOYEE" },
  ];

  const fetchManagers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/employees/position/MANAGER"
      );
      if (response.data.length > 0) {
        const managersArray = response.data.map((manager) => {
          return {
            value: manager.employeeName,
            label: manager.employeeName,
          };
        });
        setManagers(managersArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchManagers();
    const form =areAllPropertiesEmpty(errors);
    setValidForm(form)
  }, [errors]);

  const areAllPropertiesEmpty = (obj) => {

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (
          value !== null &&
          value !== undefined &&
          String(value).trim() !== ""
        ) {
          return false;
        }
      }
    }
    return true;
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:8080/employees", {
        headers: {
          Accept: "application/json, text/plain",
          "Content-Type": "application/json; charset=UTF-8",
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
          employeePosition: employeePosition,
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
        setEmployeePosition("");
        setEmergencyContact("");
        setMessage("User created successfully");

        // send alert
        alert("User created successfully!");
      } else {
        setMessage("Some error occurred");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fieldValueChange = (fun, field, value) => {
    fun((v) => value);
    validateFields(field, value);
  };

  const validateFields = (field, value) => {
    if (field === "employeeName") {
      const regex = /^[A-Za-z]+$/;
      if (!value) {
        setErrors({ ...errors, employeeName: "Employee name is required" });
      } else if (!regex.test(value)) {
        setErrors({
          ...errors,
          employeeName: "Employee name only include letters",
        });
      } else {
        setErrors({ ...errors, employeeName: "" });
      }
    }
    if (field === "emailAddress") {
      const regex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!value) {
        setErrors({ ...errors, emailAddress: "Employee email is required" });
      } else if (!regex.test(value)) {
        setErrors({ ...errors, emailAddress: "Not a valid email" });
      } else {
        setErrors({ ...errors, emailAddress: "" });
      }
    }

    if (field === "employeePassword") {
      if (!value) {
        setErrors({
          ...errors,
          employeePassword: "Employee password required",
        });
      } else {
        setErrors({ ...errors, employeePassword: "" });
      }
    }

    if (field === "icNumber") {
      const regex = /^[STFG]\d{7}[A-Z]$/;
      if (!value) {
        setErrors({ ...errors, icNumber: "Ic number is required" });
      } else if (!regex.test(value)) {
        setErrors({ ...errors, icNumber: "Not a valid IC number" });
      } else {
        setErrors({ ...errors, icNumber: "" });
      }
    }

    if (field === "emergencyContact") {
      const regex = /^([^.0-]\d+|\d)$/;
      if (!regex.test(value)) {
        setErrors({ ...errors, emergencyContact: "Not a valid phone number" });
      } else {
        setErrors({ ...errors, emergencyContact: "" });
      }
    }
  };

  // handle back button
  const handleBack = () => {
    // redirect to home page
    navigate("/home");
  };
  const typeOnChangeHandler = (e) => {
    setEmployeePosition(e.target.value);
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit} className="needs-validation">
        <h1 className="text-info">Register Employee</h1>
        <div className="mb-3">
          <label
            htmlFor="InputEmployeeName"
            for="InputEmployeeName"
            className="form-label"
          >
            Employee Name
          </label>
          <input
            className="form-control"
            id="InputEmployeeName"
            aria-describedby="employeeName"
            type="text"
            value={employeeName}
            placeholder="John Doe"
            onChange={(e) =>
              fieldValueChange(setEmployeeName, "employeeName", e.target.value)
            }
          />
          {errors.employeeName && (
            <div className="text-danger">{errors.employeeName}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="InputEmailAddress" className="form-label">
            Email Address
          </label>
          <input
            className="form-control"
            id="InputEmailAddress"
            aria-describedby="emailAddress"
            type="text"
            value={emailAddress}
            placeholder="johndoe@mail.com"
            onChange={(e) =>
              fieldValueChange(setEmailAddress, "emailAddress", e.target.value)
            }
          />
          {errors.emailAddress && (
            <div className="text-danger">{errors.emailAddress}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="InputPassword" className="form-label">
            Employee Password
          </label>
          <input
            className="form-control"
            id="InputPassword"
            aria-describedby="employeePassword"
            type="password"
            value={employeePassword}
            placeholder="Password"
            onChange={(e) =>
              fieldValueChange(
                setEmployeePassword,
                "employeePassword",
                e.target.value
              )
            }
            required
          />
          {errors.employeePassword && (
            <div className="text-danger">{errors.employeePassword}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="InputIcNumber" className="form-label">
            NRIC Number
          </label>
          <input
            className="form-control"
            id="InputIcNumber"
            aria-describedby="icNumber"
            type="text"
            value={icNumber}
            placeholder="S91234567X"
            onChange={(e) =>
              fieldValueChange(setIcNumber, "icNumber", e.target.value)
            }
          />
          {errors.icNumber && (
            <div className="text-danger">{errors.icNumber}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="InputDateOfBirth" className="form-label">
            DateOfBirth
          </label>
          <input
            className="form-control"
            id="InputDateOfBirth"
            aria-describedby="dateOfBirth"
            type="date"
            value={dateOfBirth}
            placeholder="2000-04-11"
            onChange={(e) => setDateOfBirth(e.target.value)}
            min="1900-01-01"
            max="2008-01-01"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="InputAddress" className="form-label">
            Address
          </label>
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
          <label htmlFor="InputQualifications" className="form-label">
            Qualifications
          </label>
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
          <label htmlFor="InputSkills" className="form-label">
            Skills
          </label>
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
          <label htmlFor="InputEmployeePosition" className="form-label">
            Position
          </label>
          <select
            className="form-select"
            id="InputEmployeePosition"
            value={employeePosition}
            placeholder="Select"
            onChange={typeOnChangeHandler}
            required
          >
            <option value="" disabled selected>
              Select
            </option>
            {POSITION.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="InputReportsTo" className="form-label">
            Reports To
          </label>
          {/* <input 
            className="form-control" 
            id="InputReportsTo" 
            aria-describedby="reportsTo"
            type="text"
            value={reportsTo}
            placeholder="boss"
            onChange={(e) => setReportsTo(e.target.value)}
          /> */}
          <select
            className="form-select"
            id="InputReportsTo"
            value={reportsTo}
            placeholder="Select Manager"
            onChange={(e) => setReportsTo(e.target.value)}
            required
          >
            <option value="" disabled selected>
              Select
            </option>
            {managers.map((manager) => (
              <option key={manager.value} value={manager.value}>
                {manager.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="InputEmergencyContact" className="form-label">
            Emergency Contact
          </label>
          <input
            className="form-control"
            id="InputEmergencyContact"
            aria-describedby="emergencyContact"
            type="number"
            value={emergencyContact}
            placeholder="9xxxxxxx"
            onChange={(e) =>
              fieldValueChange(
                setEmergencyContact,
                "emergencyContact",
                e.target.value
              )
            }
          />
          {errors.emergencyContact && (
            <div className="text-danger">{errors.emergencyContact}</div>
          )}
        </div>
        <div className="d-flex">
          <button className="btn btn-primary mx-3" type="submit" disabled={!validForm}>
            Create
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={handleBack}
          >
            Back
          </button>
        </div>

        <div className="message text-success">
          {message ? <p>{message}</p> : null}
        </div>
      </form>
    </div>
  );
}
