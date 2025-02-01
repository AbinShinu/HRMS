import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Home';
import LoginForm from './login';
import Registration from './Registration';
import Dashboard from './Admindashboard';
import HomePage2 from './Home2';
import AddHomeForm from './AddHome';
import ProfileSettings from './profilesetting';
import HomesList from './Viewhome';
import UsersList from './Viewuser';
import Applications from './viewApplication';
import TrackApplications from './trackapplication';
import UserProfileSettings from './userprofilesetting';
import AllApplications from './viewallApplication';
import RentedHomesPage from './tenanthome';
import AvailableHomesList from './AvailableHome';
import RentedHomesList from './RentedHome';
import UserDashboard from './userdashboard';



function App() {
    return (
        <Router>
            <Routes>
            <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<Registration />} />
          <Route path="/admindashboard" element={<Dashboard />} />
          <Route path="/bookhome" element={<HomePage2/>} />
          <Route path="/addhome" element={<AddHomeForm />} />
          <Route path="/profilesettings" element={<ProfileSettings />} />
          <Route path="/viewhome" element={<HomesList />} />
          <Route path="/getuser" element={<UsersList />} />
          <Route path="/getPendingApplication" element={<Applications />} />
          <Route path="/trackapplication" element={<TrackApplications />} />
          <Route path="/userprofile" element={<UserProfileSettings />} />
          <Route path="/allApplication" element={<AllApplications />} />
          <Route path="/tenanthome" element={<RentedHomesPage /> } />
          <Route path="/availablehome" element={<AvailableHomesList />} />
          <Route path="/rentedhome" element={<RentedHomesList />} />
          <Route path="/userdashboard" element={<UserDashboard />} />
          
            </Routes>
        </Router>
    );
}

export default App;
