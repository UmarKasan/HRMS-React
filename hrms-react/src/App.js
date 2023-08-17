import Navbar from "./Navbar"
import Footer from "./Footer"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import About from "./pages/About"
import MCsubmission from "./pages/MCsubmissionForm"
import EmployeeForm from "./pages/EmployeeForm"
import LogIn from "./pages/LogIn"
import User from "./pages/User"
import Policy from "./pages/Policy"
import { Route, Routes } from "react-router-dom"
import ApplyLeaveForm from "./pages/ApplyLeaveForm"
import ApplyClaimForm from "./pages/ApplyClaimForm"
import ApplyMcForm from "./pages/ApplyMcForm"

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        {/* Adds Space below  navbar */}
      <h1 class="text-light">~</h1>
        <Routes class="position-relative">
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/MC submission" element={<MCsubmission />} />
          <Route path="/employeeform" element={<EmployeeForm />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/user" element={<User />} />
          <Route path="/about" element={<About />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/apply-leave" element={<ApplyLeaveForm />} />
          <Route path="/apply-claim" element={<ApplyClaimForm />} />
          <Route path="/apply-mc" element={<ApplyMcForm />} />
        </Routes>

      </div>
      {/* Adds Space above  Footer */}
      <h1 class="text-light">~</h1>
      <Footer />
        <Routes>
        </Routes>
    </>
      
  );
}

export default App
