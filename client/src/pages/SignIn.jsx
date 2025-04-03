import { useState } from "react";
import { Link } from "react-router-dom";

function AuthPage({ isSignUp }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    ...(isSignUp && { name: "" }),
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isSignUp ? "Sign up data:" : "Sign in data:", formData);
    // Add your authentication logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center"
    style={{
      backgroundImage: `linear-gradient(rgba(255, 250, 240, 0.4), rgba(255, 250, 240, 0.6)), url('https://www.hamraahfoundation.org/data/2018/05/book-distribution-4-1024x682.jpg')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center" style={{ color: "#ff7f00" }}>
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>
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
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <p className="text-center text-gray-600">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <Link
            to={isSignUp ? "/signin" : "/signup"}
            className="hover:underline"
            style={{ color: "#ff7f00" }}
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;