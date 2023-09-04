// import dependencies
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

// define component
const ClaimDisplay = () => {
    // declare properties
    const navigate = useNavigate();
    const [claim, setClaim] = useState([]);
    const [error, setError] = useState("");

    // declare useEffect hook
    useEffect(() => {
        const fetchClaims = async () => {
            try {
                // get request to get all claims
                const response = await axios.get('http://localhost:8080/claims');
                console.log(response);
                setClaim(response.data);
            } catch (error) {
                // error handling
                console.error(error);
                setError("Unable to fetch data.");
            }
        };

        // invoke fetchClaim
        fetchClaims();
    }, []);

    // redirect back to admin home
    const handleBack = () => {
        // redirect to admin home page
        navigate('/home');
    }

    // jsx
    return (
        <div className="container h-100 mt-5">
            <h1 className="text-center text-secondary font-weight-bold fs-1 mb-3">Leave List</h1>
            <table className="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>File Path</th>
                        <th>Status</th>
                        <th>Employee Name</th>
                    </tr>
                </thead>
                <tbody>
                    {claim.map((claim) => {
                        return (
                            <tr key={claim.claimId}>
                                <td>{claim.claimId}</td>
                                <td>{claim.claimDate}</td>
                                <td>{claim.claimType}</td>
                                <td>{claim.claimAmount}</td>
                                <td>{claim.fileUpload}</td>
                                <td>{claim.claimStatus}</td>
                                <td>{claim.employee ? (
                                    claim.employee.employeeName
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
export default ClaimDisplay;