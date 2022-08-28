import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./components/LoginSection/Login";
import SignUp from "./components/LoginSection/SignUp";
import Student from "./components/AdminSection/Student";
import StudentData from "./components/AdminSection/AdminPage";
import Dashboard from "./components/StudentSection/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/student" element={<Student />} />
        <Route path="/studentData" element={<StudentData />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
