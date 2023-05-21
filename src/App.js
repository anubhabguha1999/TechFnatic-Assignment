import Admin from "./pages/Admin";
import Home from "./pages/Home";
import { BrowserRouter, Route,Routes } from "react-router-dom"
import { AuthProvider, AuthContext } from './Contexts/AuthContext/AuthContext';
import Login from "./pages/Login";
import Admins from "./pages/Admins";

export default function App() {

  const routes = <BrowserRouter>
  <Routes>
  <Route path="signin" element={<Login/>}/>
  {/* <Route path="signup" element={<Login/>}/> */}
  <Route path="admins" element={<Admins/>}/>
  <Route path="" element={<Home/>}/>
  <Route exact path="admin" element={<Admin/>}/>
  </Routes>
  </BrowserRouter>


  return (
    <AuthProvider>
      {routes}
    </AuthProvider>
  )
}