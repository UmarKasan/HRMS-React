import Navbar from "./Navbar"
import Home from "./pages/Home"
import Policy from "./pages/Policy"
import About from "./pages/About"
import Search from "./pages/Search"
import SignUp from "./pages/SignUp"
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
          <Route path="/policy" element={<Policy />} />
          <Route path="/search" element={<Search />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </div>
      <form>
        <h1>Home</h1>
        <div>
        <img src="images/HR.jpg" width="540" height="300" alt="HR logo"/>
        <h1>Hi</h1>
        </div>
      </form>
    </>
      
  );
}

export default App
