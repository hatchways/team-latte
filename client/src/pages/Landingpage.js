import React from "react";
import { Link } from "react-router-dom";
import NewMemberInfo from "./register";
import Login from "./login";

function Landing() {
  return (
    <div>
      <h1>Landing Page</h1>
      <div>
        <Link to="/login">Log In</Link>
      </div>
      <div>
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}

export default Landing;
