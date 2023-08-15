import Navbar from "./Navbar"
import Footer from "./Footer"
import Home from "./pages/Claim"
import Dashboard from "./pages/Dashboard"
import About from "./pages/About"
import Search from "./pages/MCsubmissionForm"
import EmployeeForm from "./pages/EmployeeForm"
import LogIn from "./pages/LogIn"
import User from "./pages/User"
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/search" element={<Search />} />
          <Route path="/employeeform" element={<EmployeeForm />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </div>
      <Footer />
    </>
      
  );
}

export default App
