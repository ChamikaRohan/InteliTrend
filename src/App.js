import { BrowserRouter as Router, Routes, Switch, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';
import React, {Component} from 'react';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import Logout from './Pages/Logout';
import AboutUs from './Pages/AboutUs';
import FileShow from './Pages/FileShow';
import UserUploads from './Pages/UserUploads';
import ServicesPage from './Pages/ServicesPage';
import FileUpload from './Pages/FileUpload';
import Dashboard from './Pages/Dashboard';
import Doctors from './Pages/DoctorsPage';
import './App.css';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Home" element={<Home/>}/>
      <Route path="/Signup" element={<SignupPage/>}/>
      <Route path="/Login" element={<LoginPage/>}/>
      <Route path="/Dashboard" element={<Dashboard/>}/>
      <Route path="/Logout" element={<Logout/>}/>
      <Route path="/Aboutus" element={<AboutUs/>}/>
      <Route path="/FileUpload" element={<FileUpload/>}/>
      <Route path="/FileShow" element={<FileShow/>}/>
      <Route path="/Uploads" element={<UserUploads/>}/>
      <Route path="/Services" element={<ServicesPage/>}/>
      <Route path="/Doctors" element={<Doctors/>}/>
    </Routes>
    </Router>
  );
}

export default App;
