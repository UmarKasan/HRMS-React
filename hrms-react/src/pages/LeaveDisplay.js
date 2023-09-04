// import dependencies
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

// define component
const LeaveDisplay = () => {
    // declare properties
    const navigate = useNavigate();
    const [leave, setLeave] = useState([]);
    const [error, setError] = useState("");

    // declare useEffect hook
    useEffect(() => {
        const fetchLeaves = async () => {
            try {
                // get request to get all leaves
                const response = await axios.get('http://localhost:8080/leave-applications');
                console.log(response);
                setLeave(response.data);
            } catch (error) {
                // error handling
                console.error(error);
                setError("Unable to fetch data.");
            }
        };

        // invoke fetchLeave
        fetchLeaves();
    }, []);

    // redirect back to admin home
    const handleBack = () => {
        // redirect to admin home page
        navigate('/home');
    };

    // jsx
    return (
        <div className="container h-100 mt-5">
            <h1 className="text-center text-secondary font-weight-bold fs-1 mb-3">Leave List</h1>
            <table className="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Employee Name</th>
                    </tr>
                </thead>
                <tbody>
                    {leave.map((leave) => {
                        return (
                            <tr key={leave.leaveId}>
                                <td>{leave.leaveId}</td>
                                <td>{leave.leaveDate}</td>
                                <td>{leave.reason}</td>
                                <td>{leave.leaveStatus}</td>
                                <td>{leave.employee ? (
                                    leave.employee.employeeName
                                ) : (
                                    <em>Not Available</em>
                                )}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <p className="text-danger">{error}</p>
            <div className="d-flex justify-content-between">
                <button className="btn btn-primary" onClick={handleBack}>Back</button>
            </div>
        </div>
    );
}

// export component
export default LeaveDisplay;