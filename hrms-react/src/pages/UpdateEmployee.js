import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateEmployee = () => {
    // declare the state variables
    const { employeeId } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        employeeName: '',
        emailAddress: '',
        employeePassword: '',
        icNumber: '',
        dateOfBirth: '',
        address: '',
        qualifications: '',
        skills: '',
        employeePosition: '',
        reportsTo: '',
        emergencyContact: ''
    });

    // declare useEffect hook
    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                // get employee by id
                const response = await axios.get(`http://localhost:8080/employees/${employeeId}`);

                // set employee and form data state variables
                setEmployee(response.data);

                // set form data state variables
                setFormData({
                    employeeName: response.data.employeeName,
                    emailAddress: response.data.emailAddress,
                    employeePassword: response.data.employeePassword,
                    icNumber: response.data.icNumber,
                    dateOfBirth: response.data.dateOfBirth,
                    address: response.data.address,
                    qualifications: response.data.qualifications,
                    skills: response.data.skills,
                    employeePosition: response.data.employeePosition,
                    reportsTo: response.data.reportsTo,
                    emergencyContact: response.data.emergencyContact
                });
            } catch (error) {
                // error handling
                console.error(error);
            }
        };

        // invoke fetchEmployee
        fetchEmployee();
    }, [employeeId]);

    // handle save
    const handleSave = async (event) => {
        // prevent default form behaviour
        event.preventDefault();

        // use axios to update data
        try {
            // send a PUT request
            const response = await axios.put(`http://localhost:8080/employees/${parseInt(employeeId)}`, formData);
            console.log(response);

            // clear error message
            setError('');

            // send alert
            alert('Employee updated successfully!');

            // navigate to admin page
            navigate('/home');
        } catch (error) {
            // error handling
            console.error(error);

            // set error message
            setError('Unable to complete request. Please try again later.');
        }
    }

    // handle cancel click
    const handleCancel = () => {
        // redirect to admin page
        navigate('/home');
    }

    // handle form data change
    const handleChange = (event) => {
        // update form data state
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }
    
    // if employee is null
    if (!employee) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container h-100 d-flex align-items-center flex-column mt-5">
            <h1 className="text-left text-secondary font-weight-bold fs-1 mb-3">Update Employee Details</h1>
            <div className="row w-50 border border-dark rounded-3 px-5 py-3 me-0">
                <div className="mb-3 d-flex flex-column align-items-start">
                    <label htmlFor="employeeId" className="form-label">ID</label>
                    <h4 className="text-primary fs-6">{employee.employeeId}</h4>
                </div>
                <div className="mb-3 d-flex flex-column align-items-start">
                    <label htmlFor="employeeName" className="form-label">Name</label>
                    <input 
                        type="text"
                        className="form-control"
                        id="employeeName"
                        name="employeeName"
                        value={formData.employeeName}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3 d-flex flex-column align-items-start">
                    <label htmlFor="emailAddress" className="form-label">Email</label>
                    <h4 className="text-primary fs-6">{employee.emailAddress}</h4>
                </div>
                <div className="mb-3 d-flex flex-column align-items-start">
                    <label htmlFor="employeePassword" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="employeePassword"
                        name="employeePassword"
                        value={formData.employeePassword}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3 d-flex flex-column align-items-start">
                    <label htmlFor="icNumber" className="form-label">NRIC</label>
                    <input
                        type="text"
                        className="form-control"
                        id="icNumber"
                        name="icNumber"
                        value={formData.icNumber}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3 d-flex flex-column align-items-start">
                    <label htmlFor="dateOfBirth" className="form-label">Date Of Birth</label>
                    <input
                        type="date"
                        className="form-control"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3 d-flex flex-column align-items-start">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3 d-flex flex-column align-items-start">
                    <label htmlFor="qualifications" className="form-label">Qualifications</label>
                    <input
                        type="text"
                        className="form-control"
                        id="qualifications"
                        name="qualifications"
                        value={formData.qualifications}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3 d-flex flex-column align-items-start">
                    <label htmlFor="skills" className="form-label">Skills</label>
                    <input  
                        type="text"
                        className="form-control"
                        id="skills"
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3 d-flex flex-column align-items-start">
                    <label htmlFor="employeePosition" className="form-label">Position</label>
                    <input
                        type="text"
                        className="form-control"
                        id="employeePosition"
                        name="employeePosition"
                        value={formData.employeePosition}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3 d-flex flex-column align-items-start">
                    <label htmlFor="reportsTo" className="form-label">Reports To</label>
                    <input
                        type="text" 
                        className="form-control"
                        id="reportsTo"
                        name="reportsTo"
                        value={formData.reportsTo}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3 d-flex flex-column align-items-start">
                    <label htmlFor="emergencyContact" className="form-label">Emergency Contact</label>
                    <input
                        type="text"
                        className="form-control"
                        id="emergencyContact"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleChange}
                    />
                </div>
                <p className="text-danger">{error}</p>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-outline-primary me-2" onClick={handleSave}>SAVE</button>
                    <button className="btn btn-outline-secondary ms-2" onClick={handleCancel}>CANCEL</button>
                </div>
            </div>
        </div>
    );
}

export default UpdateEmployee;