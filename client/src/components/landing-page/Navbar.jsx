import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <>
      <div>
        <div className="navbar bg-base-100 fixed shadow-sm z-50">
          <div className="navbar-start">
            <NavLink to="/" className="btn btn-ghost text-xl font-bold text-orange-500">
              Books4All
            </NavLink>
          </div>
          <div className="navbar-center hidden lg:flex">
            {/* Removed Home link */}
          </div>
          <div className="navbar-end">
            <NavLink
              to="/signin"
              className="rounded-md bg-orange-500 text-white hover:bg-orange-700 btn mr-2"
            >
              Sign In
            </NavLink>
            <NavLink
              to="/signup"
              className="rounded-md bg-orange-500 text-white hover:bg-orange-700 btn"
            >
              Sign Up
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
