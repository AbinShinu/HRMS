import React from "react";
import "./form.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FormComponent = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  let navigate = useNavigate();

  const onSubmit = (data) => {
    console.log("Form Data:", data); // Ensure this is logged when form is submitted
    alert("Registration successful");

    // Send data to backend via POST request
    axios.post('http://localhost:3000/users/signup', data)
      .then(response => {
        console.log(response.data); // Log the response from the server
        alert("Added successfully");
        navigate('/login');
      })
      .catch(error => {
        console.error("Error occurred:", error); // Log any error that occurs during the request
      });
  }

  return (
    <div className="form-container">
      <body className="login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Sign UP</h2>
        
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="error-text">{errors.name.message}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && <p className="error-text">{errors.username.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <p className="error-text">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Password must be at least 8 characters" }
            })}
          />
          {errors.password && <p className="error-text">{errors.password.message}</p>}
        </div>

        <button type="submit" className="submit-button">Sign UP</button>
      </form>
      </body>
    </div>
  );
};

export default FormComponent;
