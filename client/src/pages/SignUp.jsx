import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    address: '',
    phoneNumber: '',
    // School-specific fields
    area: '',
    totalStudents: '',
    totalBooks: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset error state
    setError('');
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    try {
      setLoading(true);
      
      // Prepare common data for API call
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword:formData.confirmPassword,
        address: formData.address,
        phone: formData.phoneNumber,
      };
      
      let apiEndpoint;
      
      // Determine API endpoint and data based on role
      if (formData.role === 'donor') {
        // Add donor-specific fields
        userData.donorType = 'individual';
        apiEndpoint = 'http://localhost:5001/api/donar/donors/register';
      } else if (formData.role === 'school') {
        // Add school-specific fields
        userData.area = formData.area;
        userData.totalStudents = formData.totalStudents;
        userData.password=formData.password
        userData.confirmPassword=formData.confirmPassword
        apiEndpoint = 'http://localhost:5001/api/school/schools/register';
      } else if (formData.role === 'logistics') {
        apiEndpoint = 'http://localhost:5001/api/logistics/register';
      } else {
        setError('Please select a valid role');
        setLoading(false);
        return;
      }
      
      console.log(`Sending ${formData.role} registration data to ${apiEndpoint}:`, userData);
      
      // Make API call to the appropriate registration endpoint
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.message || 'Registration failed');
      }
      
      console.log('Registration successful:', responseData);
      
      // Redirect to sign in page after successful registration
      alert('Registration successful! Please sign in.');
      navigate('/signin');
      
    } catch (err) {
      console.error('Registration error:', err);
      
      // Display error message
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError(err.message || 'An error occurred during registration. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Render school-specific fields when role is 'school'
  const renderRoleSpecificFields = () => {
    if (formData.role === 'school') {
      return (
        <div className="space-y-4 mt-4">
          <div>
            <label className="block text-gray-600">School Area</label>
            <select
              name="area"
              value={formData.area}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-orange-300"
              style={{ borderColor: "#ddd", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
            >
              <option value="">Select Area Type</option>
              <option value="Urban">Urban</option>
              <option value="Rural">Rural</option>
              <option value="Metropolitan">Metropolitan</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-600">Total Students</label>
            <input
              type="number"
              name="totalStudents"
              value={formData.totalStudents}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-orange-300"
              style={{ borderColor: "#ddd", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
            />
          </div>
          <div>
            <label className="block text-gray-600">Total Books</label>
            <input
              type="number"
              name="totalBooks"
              value={formData.totalBooks}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-orange-300"
              style={{ borderColor: "#ddd", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
            />
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen flex items-center justify-center"
    style={{
      backgroundImage: `linear-gradient(rgba(255, 250, 240, 0.9), rgba(255, 250, 240, 0.8)), url('https://www.hamraahfoundation.org/data/2018/05/book-distribution-4-1024x682.jpg')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      <div className="w-full max-w-4xl p-8 space-y-6 bg-white shadow-lg rounded-lg my-8 mx-4">
        <h2 className="text-2xl font-bold text-center" style={{ color: "#ff7f00" }}>
          Sign Up as {formData.role ? formData.role.charAt(0).toUpperCase() + formData.role.slice(1) : ''}
        </h2>
        
        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-lg text-center">
            {error}
          </div>
        )}
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-gray-600">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-orange-300"
                  style={{ borderColor: "#ddd", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
                />
              </div>
              <div>
                <label className="block text-gray-600">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-orange-300"
                  style={{ borderColor: "#ddd", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
                />
              </div>
              <div>
                <label className="block text-gray-600">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-orange-300"
                  style={{ borderColor: "#ddd", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
                />
              </div>
              <div>
                <label className="block text-gray-600">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-orange-300"
                  style={{ borderColor: "#ddd", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4 mt-2">
              <div>
                <label className="block text-gray-600">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-orange-300"
                  style={{ borderColor: "#ddd", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
                >
                  <option value="">Select a role</option>
                  <option value="donor">Donor</option>
                  <option value="school">School</option>
                  <option value="logistics">Logistics</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-600">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-orange-300"
                  style={{ borderColor: "#ddd", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
                />
              </div>
              <div>
                <label className="block text-gray-600">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-orange-300"
                  style={{ borderColor: "#ddd", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
                  rows="5"
                />
              </div>
            </div>
          </div>
          
          {/* Render role-specific fields */}
          {renderRoleSpecificFields()}

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3 text-white rounded-lg hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#ff7f00" }}
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </div>
        </form>
        <p className="text-center text-gray-600 mt-6">
          Already have an account? {" "}
          <Link
            to="/signin"
            className="hover:underline"
            style={{ color: "#ff7f00" }}
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
