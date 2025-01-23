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
    const formData = new FormData();
    
    // Append all form data to the FormData object
    formData.append("location", data.location);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("contactPerson.name", data.contactPerson.name);
    formData.append("contactPerson.phone", data.contactPerson.phone);
    formData.append("contactPerson.email", data.contactPerson.email);
    formData.append("status", data.status);
    formData.append("availability", data.availability);

    // Append the selected image file
    if (data.homeImage[0]) {
      formData.append("homeImage", data.homeImage[0]);
    }

    try {
      const response = await axios.post("http://localhost:3000/users/addhome", formData, {
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

        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            id="location"
            type="text"
            {...register("location", { required: "Location is required" })}
          />
          {errors.location && <p className="error-text">{errors.location.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            id="price"
            type="number"
            {...register("price", { required: "Price is required" })}
          />
          {errors.price && <p className="error-text">{errors.price.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            id="category"
            type="text"
            {...register("category", { required: "Category is required" })}
          />
          {errors.category && <p className="error-text">{errors.category.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="contactName">Contact Person Name:</label>
          <input
            id="contactName"
            type="text"
            {...register("contactPerson.name", { required: "Contact name is required" })}
          />
          {errors.contactPerson?.name && (
            <p className="error-text">{errors.contactPerson.name.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="contactPhone">Contact Phone:</label>
          <input
            id="contactPhone"
            type="text"
            {...register("contactPerson.phone", { required: "Contact phone is required" })}
          />
          {errors.contactPerson?.phone && (
            <p className="error-text">{errors.contactPerson.phone.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="contactEmail">Contact Email:</label>
          <input
            id="contactEmail"
            type="email"
            {...register("contactPerson.email", { required: "Contact email is required" })}
          />
          {errors.contactPerson?.email && (
            <p className="error-text">{errors.contactPerson.email.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select id="status" {...register("status", { required: "Status is required" })}>
            <option value="available">Available</option>
            <option value="rented">Rented</option>
          </select>
          {errors.status && <p className="error-text">{errors.status.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="availability">Availability:</label>
          <select id="availability" {...register("availability")}>
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
        </div>

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
