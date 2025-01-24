import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const AddHomeForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form Data:", data); // Log the form data to verify submission

    const formData = new FormData();

    // Append form fields to formData
    formData.append("location", data.location);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("contactPersonName", data.contactPersonName); // Updated field name
    formData.append("contactPersonPhone", data.contactPersonPhone); // Updated field name
    formData.append("contactPersonEmail", data.contactPersonEmail); // Updated field name
    formData.append("status", data.status);
    formData.append("availability", data.availability === "true"); // Convert to boolean

    // Check if homeImage is present
    if (data.homeImage && data.homeImage[0]) {
      formData.append("homeImage", data.homeImage[0]);
    } else {
      console.error("No image selected");
    }

    try {
      const response = await axios.post("http://localhost:3000/users/api/addhome", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Home added successfully!");
      console.log("Server Response:", response.data);
    } catch (error) {
      console.error("Error adding home:", error);
      alert("Failed to add home. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Add New Home</h2>

        {/* Location */}
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            id="location"
            type="text"
            {...register("location", { required: "Location is required" })}
          />
          {errors.location && <p className="error-text">{errors.location.message}</p>}
        </div>

        {/* Price */}
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            id="price"
            type="number"
            {...register("price", { required: "Price is required" })}
          />
          {errors.price && <p className="error-text">{errors.price.message}</p>}
        </div>

        {/* Category */}
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            id="category"
            type="text"
            {...register("category", { required: "Category is required" })}
          />
          {errors.category && <p className="error-text">{errors.category.message}</p>}
        </div>

        {/* Contact Person Name */}
        <div className="form-group">
          <label htmlFor="contactPersonName">Contact Person Name:</label>
          <input
            id="contactPersonName"
            type="text"
            {...register("contactPersonName", { required: "Contact name is required" })}
          />
          {errors.contactPersonName && (
            <p className="error-text">{errors.contactPersonName.message}</p>
          )}
        </div>

        {/* Contact Person Phone */}
        <div className="form-group">
          <label htmlFor="contactPersonPhone">Contact Person Phone:</label>
          <input
            id="contactPersonPhone"
            type="text"
            {...register("contactPersonPhone", { required: "Contact phone is required" })}
          />
          {errors.contactPersonPhone && (
            <p className="error-text">{errors.contactPersonPhone.message}</p>
          )}
        </div>

        {/* Contact Person Email */}
        <div className="form-group">
          <label htmlFor="contactPersonEmail">Contact Person Email:</label>
          <input
            id="contactPersonEmail"
            type="email"
            {...register("contactPersonEmail", { required: "Contact email is required" })}
          />
          {errors.contactPersonEmail && (
            <p className="error-text">{errors.contactPersonEmail.message}</p>
          )}
        </div>

        {/* Status */}
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select id="status" {...register("status", { required: "Status is required" })}>
            <option value="available">Available</option>
            <option value="rented">Rented</option>
          </select>
          {errors.status && <p className="error-text">{errors.status.message}</p>}
        </div>

        {/* Availability */}
        <div className="form-group">
          <label htmlFor="availability">Availability:</label>
          <select id="availability" {...register("availability")}>
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
        </div>

        {/* Home Image */}
        <div className="form-group">
          <label htmlFor="homeImage">Home Image:</label>
          <input
            id="homeImage"
            type="file"
            {...register("homeImage", { required: "Home image is required" })}
          />
          {errors.homeImage && <p className="error-text">{errors.homeImage.message}</p>}
        </div>

        <button type="submit" className="submit-button">Add Home</button>
      </form>
    </div>
  );
};

export default AddHomeForm;
