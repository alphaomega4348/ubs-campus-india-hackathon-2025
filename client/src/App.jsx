import './App.css';
import { Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
// import DonorDashboard from './pages/DonorDashboard';

// import AdminDashboard from './pages/AdminDashboard';
// import DeliveryPersonDashboard from './pages/DeliveryPersonDashboard';
// import BookDonationForm from './components/BookDonationForm';
// import BookRequestForm from './components/BookRequestForm';
// import DeliveryStatus from './components/DeliveryStatus';
// import ProtectedRoute from './components/ProtectedRoute';
import SchoolDashboard from './pages/SchoolDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Home Page</div>} />
      
    
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/school/dashboard" element={<SchoolDashboard/>} />

{/*       
      <Route path="/donor/dashboard" element={<ProtectedRoute role="donor" component={DonorDashboard} />} />
      
      <Route path="/admin/dashboard" element={<ProtectedRoute role="admin" component={AdminDashboard} />} />
      <Route path="/delivery/dashboard" element={<ProtectedRoute role="delivery_person" component={DeliveryPersonDashboard} />} />

     
      <Route path="/donate-book" element={<ProtectedRoute role="donor" component={BookDonationForm} />} />
      <Route path="/request-book" element={<ProtectedRoute role="school" component={BookRequestForm} />} />

      
      <Route path="/delivery/status/:trackingId" element={<DeliveryStatus />} /> */}
    </Routes>
  );
}

export default App;
