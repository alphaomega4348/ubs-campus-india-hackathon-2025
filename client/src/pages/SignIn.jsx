import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AuthPage({ isSignUp }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "", // New role field
    ...(isSignUp && { name: "" }),
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.role) {
      setError("Please select a role.");
      return;
    }

    setLoading(true);

    let apiUrl;
    if (formData.role === "donor") {
      apiUrl = "http://localhost:5001/api/donar/donors/login";
    } else if (formData.role === "school") {
      apiUrl = "http://localhost:5001/api/school/schools/login";
    }

    if (!isSignUp) {
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem(`${formData.role}Token`, data.token);
          console.log("Login successful:", data);

          // Redirect based on role
          navigate(formData.role === "donor" ? "/donor/dashboard" : "/school/dashboard");
        } else {
          setError(data.message || "Login failed. Please check your credentials.");
        }
      } catch (err) {
        setError("An error occurred. Please try again later.");
        console.error("Login error:", err);
      }
    } else {
      // Placeholder for signup API call
      console.log("Sign up data:", formData);
    }

    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 250, 240, 0.4), rgba(255, 250, 240, 0.6)), url('https://www.hamraahfoundation.org/data/2018/05/book-distribution-4-1024x682.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center" style={{ color: "#ff7f00" }}>
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {isSignUp && (
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
          )}

          {/* Role Selection */}
          <div>
            <label className="block text-gray-600">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-orange-300"
              style={{ borderColor: "#ddd", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
            >
              <option value="">Select a role</option>
              <option value="donor">Donor</option>
              <option value="school">School</option>
            </select>
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

          <button
            type="submit"
            className="w-full py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#ff7f00" }}
            disabled={loading}
          >
            {loading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <p className="text-center text-gray-600">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <Link to={isSignUp ? "/signin" : "/signup"} className="hover:underline" style={{ color: "#ff7f00" }}>
            {isSignUp ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;
