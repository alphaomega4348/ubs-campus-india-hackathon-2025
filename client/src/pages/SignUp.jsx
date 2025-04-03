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
    area: '',
    totalStudents: '',
    totalBooks: '',
    type: '', // Added type for logistics
    location: '' // Added location for logistics
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
    
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    try {
      setLoading(true);
      
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        address: formData.address,
        phone: formData.phoneNumber,
      };
      
      let apiEndpoint;
      
      if (formData.role === 'donor') {
        userData.donorType = 'individual';
        apiEndpoint = 'http://localhost:5001/api/donar/donors/register';
      } else if (formData.role === 'school') {
        userData.area = formData.area;
        userData.totalStudents = formData.totalStudents;
        apiEndpoint = 'http://localhost:5001/api/school/schools/register';
      } else if (formData.role === 'logistics') {
        userData.type = formData.type;
        userData.location = formData.location;
        userData.confirmPassword=formData.confirmPassword
        userData.password=formData.password // Include location field
        apiEndpoint = 'http://localhost:5002/api/patner/add-patner';
      } else {
        setError('Please select a valid role');
        setLoading(false);
        return;
      }
      
      console.log(`Sending ${formData.role} registration data to ${apiEndpoint}:`, userData);
      
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
      
      alert('Registration successful! Please sign in.');
      navigate('/signin');
      
    } catch (err) {
      setError(err.message || 'An error occurred during registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
              className="w-full px-4 py-2 mt-1 border rounded-lg"
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
              className="w-full px-4 py-2 mt-1 border rounded-lg"
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
              className="w-full px-4 py-2 mt-1 border rounded-lg"
            />
          </div>
        </div>
      );
    }

    if (formData.role === 'logistics') {
      return (
        <div className="space-y-4 mt-4">
          <div>
            <label className="block text-gray-600">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 border rounded-lg"
            >
              <option value="">Select Type</option>
              <option value="NGO">NGO</option>
              <option value="Local Volunteer">Local Volunteer</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-600">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 border rounded-lg"
            />
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl p-8 space-y-6 bg-white shadow-lg rounded-lg my-8 mx-4">
        <h2 className="text-2xl font-bold text-center text-orange-600">
          Sign Up as {formData.role ? formData.role.charAt(0).toUpperCase() + formData.role.slice(1) : ''}
        </h2>
        
        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-lg text-center">
            {error}
          </div>
        )}
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-600">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 mt-1 border rounded-lg"
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
                  className="w-full px-4 py-2 mt-1 border rounded-lg"
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
                  className="w-full px-4 py-2 mt-1 border rounded-lg"
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
                  className="w-full px-4 py-2 mt-1 border rounded-lg"
                />
              </div>
            </div>

            <div className="space-y-4 mt-2">
              <div>
                <label className="block text-gray-600">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg"
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
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>
          </div>

          {renderRoleSpecificFields()}

          <button type="submit" className="w-full py-3 text-white bg-orange-600 rounded-lg" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
