// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import HomePage from './Components/HomePage';
import AdminHome from './Components/AdminHome'; // Import AdminHome
import AddDoctor from './Components/AdminSettings/AddDoctor';
import ListDoctors from './Components/AdminSettings/ListDoctors';
import ViewDoctor from './Components/AdminSettings/ViewDoctor';
import ViewPatient from './Components/AdminSettings/ViewPatient';
import SinglePatient from './Components/AdminSettings/SinglePatient';
import AddDiagnostics from './Components/AdminSettings/AddDiagnostics';
import ViewDiagnostics from './Components/AdminSettings/ViewDiagnostics';
import PatientDashboard from './Components/Patient/PatientDashboard';
import BookDoctor from './Components/Patient/BookDoctor';
import DoctorDashboard from './Components/Doctor/DoctorDashboard';
import AddShedule from './Components/Doctor/AddShedule';
import ViewAppointment from './Components/Doctor/ViewAppointment';
import BookAppointment from './Components/Patient/BookAppointment';
import GetProfile from './Components/GetProfile';
import PatientAppointmentList from './Components/Patient/PatientAppointmentList';
import AddPatient from './Components/AdminSettings/AddPatient';
import PatientProfile from './Components/Patient/GetProfile';
import DoctorProfile from './Components/Doctor/DoctorProfile';
// import AddPharmacy from './pages/AddPharmacy';
// import AddDiagnosticsCenter from './pages/AddDiagnosticsCenter';
// import AddPatient from './pages/AddPatient';
// import ManageProducts from './pages/ManageProducts';
// import Orders from './pages/Orders';
// import Customers from './pages/Customers';
// import Settings from './pages/Settings';

function App() {
  return (
    <div   style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh', // Ensure the app takes full viewport height
    }}>
  <Router>
      <Header />
      <Routes>
        {/* Define Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/admin-home" element={<AdminHome />} /> {/* Admin route */}
        <Route path="/admin-home/AddDoctor" element={<AddDoctor />} />
        <Route path="/admin-home/doctorsList" element={<ListDoctors/>}/>
        <Route path="/admin-home/Addpatient" element={<AddPatient/>}/>
        <Route path="/doctorsList/:id" element={<ViewDoctor/>}/>
        <Route path="/admin-home/viewPatient" element={<ViewPatient/>}/>
        <Route path="/admin-home/patientsList/:id" element={<SinglePatient/>}/>
        <Route path="/admin-home/AddDiagnosticsCenter" element={<AddDiagnostics/>}/>
        <Route path="/admin-home/ViewDiagnosticList/:id" element={<ViewDiagnostics/>}/>
        <Route path="/Patientdashboard/:id" element={<PatientDashboard/>}/>
        <Route path="/bookingdoctor" element={<BookDoctor/>}/>
        <Route path="/doctordashboard/:id" element={<DoctorDashboard/>}/>
        <Route path="/addschedule/:id/:name" element={<AddShedule/>}/>
        <Route path="/viewappointment/:id" element={<ViewAppointment/>}/>
        <Route path="/bookappointment/:id" element={<BookAppointment/>}/>
        <Route path="/profile/:name/:id" element={<GetProfile/>}/>
        <Route path="/patientAppointments" element={<PatientAppointmentList/>}/>
        <Route path="/profile/patient/:id" element={<PatientProfile/>}/>
        <Route path="/profile/doctor/:id" element={<DoctorProfile/>}/>
        {/* <Route path="/admin-home/AddPharmacy" element={<AddPharmacy />} />
        <Route path="/admin-home/AddDiagnosticsCenter" element={<AddDiagnosticsCenter />} />
        <Route path="/admin-home/AddPatient" element={<AddPatient />} />
        <Route path="/admin-home/ManageProducts" element={<ManageProducts />} />
        <Route path="/admin-home/Orders" element={<Orders />} />
        <Route path="/admin-home/Customers" element={<Customers />} />
        <Route path="/admin-home/Settings" element={<Settings />} /> */}
      </Routes>
      <Footer />
    </Router>
    </div>
  
  );
}

export default App;
