import React from "react";
import { useForm } from "react-hook-form";
import './form.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate(); // To navigate to another page

  const onSubmit = (data) => {
    console.log("Form Data: ", data);
    axios
      .post("http://localhost:3000/users/login", data) // Ensure correct API endpoint
      .then((response) => {
        alert("Login Successful");
        console.log("Server Response", response.data);

        // Get the user role from the response
        const userRole = response.data.user.role; // Assuming 'role' is returned

        // Redirect based on user role
        if (userRole === "admin") {
          navigate("/Admindashboard"); // Redirect to Admin Dashboard
        } else if (userRole === "tenant") {
          navigate("/Home2"); // Redirect to Home2 for tenants
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Login failed. Please try again.");
      });
  };

  // Navigate to the signup page
  const goToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="login-container">
      <body className="login">
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              {...register("email", {
                required: "Email is required",
              })}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              {...register("password", {
                required: "Password is required",
              })}
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
            />
            {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
          </div>
          <div className="button-group">
            <button type="submit" className="login-button">Login</button>
          </div>

          <div className="signup-link">
            Create an Account
            <button onClick={goToSignup} className="signup-button">Sign Up</button>
          </div>
        </form>
      </body>
    </div>
  );
};

export default LoginForm;
