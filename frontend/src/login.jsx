import React from "react";
import { useForm } from "react-hook-form";
import './form.css'; // Reusing the CSS for styling
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log("Form Data: ", data);
  
    axios
      .post("http://localhost:3000/users/login", data) // Ensure correct API endpoint
      .then((response) => {
        //alert("Login Successful");
        console.log("Server Response", response.data);
  
        const { userId, token, user } = response.data;
  
        // Save userId and token in localStorage
        localStorage.setItem("userId", userId);
        localStorage.setItem("authToken", token); // Use the same key for retrieval
        console.log("Token in localStorage:", localStorage.getItem("authToken")); // Log the correct key
  
        // Redirect based on user role
        const userRole = user.role;
        if (userRole === "admin") {
          navigate("/Admindashboard");
        } else if (userRole === "tenant") {
          navigate("/Home2");
        }
      })
      .catch((error) => {
        console.error("Login Error", error);
  
        // Handle specific error cases
        if (error.response && error.response.data) {
          alert(error.response.data.message || "Login failed. Please try again.");
        } else {
          alert("An unexpected error occurred. Please try again later.");
        }
      });
  };
  
  const goToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="form-container">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Invalid email address",
              },
            })}
            type="email"
            id="email"
          />
          {errors.email && <p className="error-text">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 4,
                message: "Password must be at least 8 characters",
              },
            })}
            type="password"
            id="password"
           
          />
          {errors.password && <p className="error-text">{errors.password.message}</p>}
        </div>

        <button type="submit" className="submit-button">Login</button>

        <div className="signup-link">
          Create an Account
          <button
            type="button"
            onClick={goToSignup}
            className="signup-button"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
