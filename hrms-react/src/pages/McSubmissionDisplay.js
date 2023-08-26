// import modules
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

// define component
const MCSubmissionDisplay = () => {
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
            </table>
        </div>
    );
};

// export component
export default MCSubmissionDisplay;