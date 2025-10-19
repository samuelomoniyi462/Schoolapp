import Navbar from "./Navbar"
import RegisterPage from "./registerpage"
import AdminDashboard from "./admindashboard"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./Login"
import StudentDashboard from "./studentdashboard"
import LandingPage from "./Landingpage"
import Authcontext from "./assets/context/Authcontext"
import ProtectedRoutes from "./utils/ProtectedRoutes"
import TeacherDashboard from "./Teacherdashboard"


function App() {
  return (
    <Authcontext> 
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<ProtectedRoutes>
          <RegisterPage />
         </ProtectedRoutes> } />
        <Route path="/admin" element={
          <AdminDashboard />
          } />
        <Route path="/teacher" element={
          <TeacherDashboard />
         } />
        <Route path="/student" element={ <ProtectedRoutes>
          <StudentDashboard />
        </ProtectedRoutes> } />

      </Routes>
    </BrowserRouter>
    </Authcontext>
  )
}


export default App