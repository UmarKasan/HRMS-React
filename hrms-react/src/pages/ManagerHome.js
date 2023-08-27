import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import ViewMc from './ViewMC';

const ManagerHome = () => {
    const [showMc, setShowMc] = useState (false);
    const [showLeave, setShowLeave] = useState(false);
    const [showClaim, setShowClaim] = useState(false);
    const [claims, setClaims] = useState([]);
    const [leaves, setLeaves] = useState([]);
    const navigate = useNavigate();

    // view MCs
    const handleAdd = () => {
        // redirect to MC page
        navigate('/view-mc');
    }

    const fetchClaims = async () => {
        try {
            // make GET request to Spring Boot API
            const response = await axios.get('http://localhost:8080/claims/status/PENDING');
            console.log(response);
            setClaims(response.data);
        } catch (error) {
            // error handling
            console.error(error);
        }
    };

    const fetchLeaves = async () => {
        try {
            // make GET request to Spring Boot API
            const response = await axios.get('http://localhost:8080/leave-applications/status/PENDING');
            console.log(response);
            setLeaves(response.data);
        } catch (error) {
            // error handling
            console.error(error);
        }
    };
    // declare useEffect hook
    useEffect(() => {
        fetchClaims();
        fetchLeaves();
    }, []);

    const approveClaim = async (claimId) => {
        // alert confirmation
        if (window.confirm('Are you sure you want to approve this claim?')) {
            // use axios to approve claim
            axios.put(`http://localhost:8080/claims/approve/${claimId}`)
                .then((response) => {
                    // fetch updated claims
                    fetchClaims();
                })
                .catch((error) => {
                    // error handling
                    console.error(error);
                });
        }
    }

    const rejectClaim = async (claimId) => {
        // alert confirmation
        if (window.confirm('Are you sure you want to reject this claim')) {
            // use axios to reject claim
            axios.put(`http://localhost:8080/claims/reject/${claimId}`)
                .then((response) => {
                    // fetch updated claims
                    fetchClaims()
                })
                .catch((error) => {
                    // error handling
                    console.error(error);
                });
        }
    }

    const approveLeave = async (leaveId) => {
        // alert confirmation
        if (window.confirm('Are you sure you want to approve this leave?')) {
            // use axios to approve leave
            axios.put(`http://localhost:8080/leave-applications/approve/${leaveId}`)
                .then((response) => {
                    // fetch update leaves
                    fetchLeaves();
                })
                .catch((error) => {
                    // error handling
                    console.error(error);
                });
        }
    }

    const rejectLeave = async (leaveId) => {
        // alert confirmation
        if (window.confirm('Are you sure you want to reject this leave')) {
            // use axios to reject leaves
            axios.put(`http://localhost:8080/leave-applications/reject/${leaveId}`)
                .then((response) => {
                    // fetch updated leaves
                    fetchLeaves()
                })
                .catch((error) => {
                    // error handling
                    console.error(error);
                });
        }
    }

    
    const toggleMc = () => {
        setShowMc(prev => !prev)
    }
    const toggleLeave = () => {
        setShowLeave(prev => !prev)
    }
    const toggleClaim = () => {
        setShowClaim(prev => !prev)
    }

    return (
        <div className="container h-100 mt-5">
            
            <div className='row mb-5'>
                <div className="d-flex justify-content-start gap-5">
                {/* <Link className="pe-auto" to={`/view-mc`} onClick={handleAdd}></Link> */}
                <h1 className="text-center text-secondary font-weight-bold fs-1" onClick={toggleMc}>Medical Leaves</h1>
                <button
                    className="btn btn-outline-secondary ml-5 btn-lg"
                    onClick={toggleMc}
                    >
                    {showMc ? "Hide" : "View"}
                    </button>
                </div>             
            </div>

            {showMc ? <ViewMc /> : null}

            <div className='row'>
                <div className="d-flex justify-content-start gap-5">
                    <h1 className="text-center text-secondary font-weight-bold fs-1 mb-2">Leave Applications</h1>
                    <button
                    className="btn btn-outline-secondary ml-5 btn-lg"
                    onClick={toggleLeave}
                    >
                    {showLeave ? "Hide" : "View"}
                    </button>
                </div>
                {showLeave ? 
                <table className="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Leave Date</th>
                            <th>Reason</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaves.length > 0 ? ( leaves.map((leave) => (
                            <tr key={leave.leaveId} className="table-hover">
                                <td>{leave.employee ? (
                                    leave.employee.employeeName
                                ) : (
                                    <span className="text-danger">Employee data not available.</span>
                                )}</td>
                                <td>{leave.leaveDate}</td>
                                <td>{leave.reason}</td>
                                <td>
                                    <button
                                    className="btn btn-outline-success mr-2"
                                    onClick={() => approveLeave(leave.leaveId)}
                                    >
                                        Approve
                                    </button>
                                    <span> </span>
                                    <button
                                    className="btn btn-outline-danger ml-1"
                                    onClick={() => rejectLeave(leave.leaveId)}
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))) : 
                        <tr className="table-hover">
                            <td colspan="6" className='text-center'>No New Leaves Applied</td>
                        </tr>}
                    </tbody>
                </table>
                : null
                }
            </div>
            <div className='row mt-5'>
                <div className="d-flex justify-content-start gap-5">
                    <h1 className="text-center text-secondary font-weight-bold fs-1 mb-2">Claim Applications</h1>
                    <button
                    className="btn btn-outline-secondary ml-5 btn-lg"
                    onClick={toggleClaim}
                    >
                    {showClaim ? "Hide" : "View"}
                    </button>
                </div>
                {showClaim ?
                <table className="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Claim Date</th>
                            <th>Claim Amount ($)</th>
                            <th>Claim Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {claims.length > 0 ? (claims.map((claim) => (
                            <tr key={claim.claimId} className="table-hover">
                                <td>{claim.employee ? (
                                    claim.employee.employeeName
                                ) : (
                                    <span className="text-danger">Employee data not available.</span>
                                )}</td>
                                <td>{claim.claimDate}</td>
                                <td>{claim.claimAmount}</td>
                                <td>{claim.claimType}</td>
                                <td>
                                <button
                                    className="btn btn-outline-success mx-2"
                                    onClick={() => approveClaim(claim.claimId)}
                                    >
                                        Approve
                                    </button>
                                    <span> </span>
                                    <button
                                    className="btn btn-outline-danger mx-1"
                                    onClick={() => rejectClaim(claim.claimId)}
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))) : 
                        <tr className="table-hover">
                            <td colspan="6" className='text-center'>No New Claims Applied</td>
                        </tr>}
                    </tbody>
                </table>
                : null
                }
            </div>
            
        </div>

    )
}

export default ManagerHome;