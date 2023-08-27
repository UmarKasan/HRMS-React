import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const ViewMc = () => {
    // declare state variables
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();
    const [mcDate, setMcDate] = useState("");
    const [mcs, setMcs] = useState("");

    const fetchMcs = async () => {
        try {
            // make GET request to Spring Boot API
            if (mcDate){
                const response = await axios.get(`http://localhost:8080/mc-submissions/date/${mcDate}`);
                console.log(response);
                setMcs(response.data);

                if (response.data.length === 0) {
                    alert(`No leaves applied on ${mcDate}. Please select another date.`)
                }
            }
            else {
                alert("Please select a date.")
            }

        } catch (error) {
            // error handling
            console.error(error);
        }
    };

    // declare useEffect hook
    // useEffect(() => {
    //     fetchMcs();

    // }, []);

    // const viewMc = () => {
       
    //     fetchMcs();
    // }

   
    return (
        <div className="container h-100 mt-5">
            <div className="d-flex justify-content-between">
                <h1 className="text-center text-secondary font-weight-bold fs-1 mb-3">Applied Medical Leaves</h1>
                <div className="d-flex">
                <div className="mb-3">
                    <input 
                        className="form-control" 
                        id="InputMcDate" 
                        aria-describedby="McDate"
                        type="date"
                        value={mcDate}
                        placeholder=""
                        onChange={(e) => setMcDate(e.target.value)}/>
                </div>
                    <button className="btn btn-outline-success mb-3 mx-3" type="submit" onClick={fetchMcs}>VIEW MC</button>
                </div>
            </div>
            <table className="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>MC Leave Date</th>
                        <th>Reason</th>
                        <th>Reporting Manager</th>
                    </tr>
                </thead>
                <tbody>
                    {mcs.length > 0 ? (mcs.map((mc) => (
                        <tr key={mc.mcId} className="table-hover">
                            <td>{mc.employee.employeeName}</td>
                            <td>{mc.mcDate}</td>
                            <td>{mc.reason}</td>
                            <td>{mc.employee.reportsTo}</td>
                        </tr>
                    ))) :
                    <tr className="table-hover">
                            <td colspan="6" className='text-center'>No Medical Leave to view</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ViewMc;