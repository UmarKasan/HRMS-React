import React, {useContext, useReducer} from 'react'
import Navbar from "./Navbar"
import Footer from "./Footer"
import { InitialUserInfo, UserContext, UserDispatchContext, userReducer } from "./UserContext"
import AppRoutes from './AppRoutes'

function App() {
const [userInfo, dispatch] = useReducer(userReducer, InitialUserInfo);


  return (
    <UserContext.Provider value={userInfo}>
      <UserDispatchContext.Provider value={dispatch}>
        <Navbar />
        <div className="container mt-5">
          {/* Adds Space below  navbar */}
          <h1 class="text-light">~</h1>
          <AppRoutes /> 
        </div>
        {/* Adds Space above  Footer */}
        <h1 class="text-light">~</h1>
        <Footer />
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

export default App
