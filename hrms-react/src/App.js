import Home from "./pages/Home"
import About from "./pages/About"
import Search from "./pages/Search"
import SignUp from "./pages/SignUp"
import LogIn from "./pages/LogIn"
import Policy from "./pages/Policy"
import User from "./pages/User"
import DeletePost from "./pages/DeletePost"
import PostSale from "./pages/Post"
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/search" element={<Search />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/user" element={<User />} />          
          <Route path="/deletepost" element={<DeletePost />} />
          <Route path="/postsale" element={<PostSale />} />
        </Routes>
      <form>
        <h1>Home</h1>
        <div>
        <img src="images/HR.jpg" width="540" height="300" alt="Car"/>
        </div>
      </form>
    </div>
  );
}

export default App;
