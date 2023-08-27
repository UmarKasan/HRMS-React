import React, {useContext} from 'react';
import { Route, Routes } from "react-router-dom"
import { UserContext } from './UserContext'
import EmployeeHome from "./pages/EmployeeHome"
import Admin from "./pages/Admin"
import UpdateEmployee from './pages/UpdateEmployee';
import ManagerHome from "./pages/ManagerHome"
import Dashboard from "./pages/Dashboard"
import About from "./pages/About"
import MCsubmission from "./pages/MCsubmissionForm"
import EmployeeForm from "./pages/EmployeeForm"
import LogIn from "./pages/LogIn"
import User from "./pages/User"
import Policy from "./pages/Policy"
import ApplyLeaveForm from "./pages/ApplyLeaveForm"
import ApplyClaimForm from "./pages/ApplyClaimForm"
import ApplyMcForm from "./pages/ApplyMcForm"
import ViewMc from "./pages/ViewMC"
import MCSubmissionDisplay from "./pages/McSubmissionDisplay";

export default function AppRoutes(){
    const user = useContext(UserContext);

    return(
        <Routes class="position-relative">
          <Route path="/" element={<LogIn />} />
          <Route path="/home" element={
            user.userRole === 'ADMIN' || user.userRole === 'admin' ? <Admin /> : 
            user.userRole === 'MANAGER' || user.userRole === 'manager'? <ManagerHome />: 
            <EmployeeHome />}
            />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mc-submission" element={<MCsubmission />} />
          <Route path="/mc-submission-list" element={<MCSubmissionDisplay />} />
          <Route path="/employeeform" element={<EmployeeForm />} />
          <Route path="/user" element={<User />} />
          <Route path="/about" element={<About />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/apply-leave" element={<ApplyLeaveForm />} />
          <Route path="/apply-claim" element={<ApplyClaimForm />} />
          <Route path="/apply-mc" element={<ApplyMcForm />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="update-employee/:employeeId" element={<UpdateEmployee />} />
          <Route path="/view-mc" element={<ViewMc />} />
        </Routes>
    )
}