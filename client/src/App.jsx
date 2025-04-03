import './App.css';
import { Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import DonorDashboard from './pages/DonorDashboard';
import Home from './pages/Home';
// import SchoolDashboard from './pages/SchoolDashboard';
// import AdminDashboard from './pages/AdminDashboard';
// import DeliveryPersonDashboard from './pages/DeliveryPersonDashboard';
// import BookDonationForm from './components/BookDonationForm';
// import BookRequestForm from './components/BookRequestForm';
// import DeliveryStatus from './components/DeliveryStatus';
// import ProtectedRoute from './components/ProtectedRoute';
// import DonorDashboard from './pages/DonorDashboard';

// import AdminDashboard from './pages/AdminDashboard';
// import DeliveryPersonDashboard from './pages/DeliveryPersonDashboard';
// import BookDonationForm from './components/BookDonationForm';
// import BookRequestForm from './components/BookRequestForm';
// import DeliveryStatus from './components/DeliveryStatus';
// import ProtectedRoute from './components/ProtectedRoute';
import SchoolDashboard from './pages/SchoolDashboard';
import AdminSchools from './components/admin/AdminSchool';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
    
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      {/* <Route path="/donor" element={<SignUp />} /> */}
      <Route path="/school/dashboard" element={<SchoolDashboard/>} />

      {/* Protected Routes */}
      {/* <Route path="/donor/dashboard" element={<ProtectedRoute role="donor" component={DonorDashboard} />} /> */}
      <Route path="/donor/dashboard" element={<DonorDashboard />} />
      {/* <Route path="/school/dashboard" element={<ProtectedRoute role="school" component={SchoolDashboard} />} />
{/*       
      <Route path="/donor/dashboard" element={<ProtectedRoute role="donor" component={DonorDashboard} />} />
      
      <Route path="/admin/dashboard" element={<ProtectedRoute role="admin" component={AdminDashboard} />} />
      <Route path="/delivery/dashboard" element={<ProtectedRoute role="delivery_person" component={DeliveryPersonDashboard} />} /> */}

      {/* Forms for Donations and Requests */}
      {/* <Route path="/donate-book" element={<ProtectedRoute role="donor" component={BookDonationForm} />} />
      <Route path="/request-book" element={<ProtectedRoute role="school" component={BookRequestForm} />} /> */}
     
      {/* <Route path="/donate-book" element={<ProtectedRoute role="donor" component={BookDonationForm} />} />
      <Route path="/request-book" element={<ProtectedRoute role="school" component={BookRequestForm} />} /> */}

          <Route path="/admin/schools" element={<AdminSchools />} />
      {/* Delivery Status Tracking */}
      {/* <Route path="/delivery/status/:trackingId" element={<DeliveryStatus />} /> */}
      
      {/* <Route path="/delivery/status/:trackingId" element={<DeliveryStatus />} /> */}
    </Routes>
  );
}

export default App;
