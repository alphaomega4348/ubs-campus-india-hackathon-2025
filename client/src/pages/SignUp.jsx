import { useState } from 'react';
import { Link } from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    address: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    console.log('Sign up data:', formData);
    // Add your registration logic here
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
          Sign Up
        </h2>
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

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3 text-white rounded-lg hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#ff7f00" }}
            >
              Sign Up
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

