// import modules
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

// define component
const MCSubmissionDisplay = () => {
    // declare properties
    const navigate = useNavigate();
    const [mcSubmissions, setMcSubmissions] = useState([]);

    // declare useEffect hook
    useEffect(() => {
        const fetchMcSubmissions = async () => {
            try {
                // make GET request to Spring Boot API
                const response = await axios.get('http://localhost:8080/mc-submissions');
                console.log(response);
                setMcSubmissions(response.data);
            } catch (error) {
                // error handling
                console.error(error);
            }
        };

        // invoke fetchMcSubmissions
        fetchMcSubmissions();
    }, []);

    // redirect back to admin home
    const handleBack = () => {
        // redirect to admin home page
        navigate('/home');
    }

    // return jsx
    return (
        <div className="container h-100 mt-5">
            <h1 className="text-center text-secondary font-weight-bold fs-1 mb-3">MC Submissions List</h1>
            <table className="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Reason</th>
                        <th>File Path</th>
                        <th>Employee Name</th>
                    </tr>
                </thead>
                <tbody>
                    {mcSubmissions.map((mcSubmission) => {
                        return (
                            <tr key={mcSubmission.mcId}>
                                <td>{mcSubmission.mcId}</td>
                                <td>{mcSubmission.mcDate}</td>
                                <td>{mcSubmission.reason}</td>
                                <td>{mcSubmission.fileUpload}</td>
                                <td>{mcSubmission.employee ? (
                                    mcSubmission.employee.employeeName
                                ) : (
                                    <em>Not Available</em>
                                )}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="d-flex justify-content-between">
                <button className="btn btn-primary" onClick={handleBack}>Back</button>
            </div>
        </div>
    );
};

// export component
export default MCSubmissionDisplay;