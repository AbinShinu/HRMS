import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Home';
import LoginForm from './login';
import Registration from './Registration';
import Dashboard from './Admindashboard';
import HomePage2 from './Home2';
import AddHomeForm from './AddHome';
import ProfileSettings from './profilesetting';



function App() {
    return (
        <Router>
            <Routes>
            <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<Registration />} />
          <Route path="/admindashboard" element={<Dashboard />} />
          <Route path="/home2" element={<HomePage2/>} />
          <Route path="/addhome" element={<AddHomeForm />} />
          <Route path="/profilesettings" element={<ProfileSettings />} />
          
            </Routes>
        </Router>
    );
}

export default App;
