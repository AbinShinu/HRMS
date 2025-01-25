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
    console.log("Form Data:", data);

    const formData = new FormData();

    // Prepare the form fields
    formData.append("location", data.location);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("contactPersonName", data.contactPersonName);
    formData.append("contactPersonPhone", data.contactPersonPhone);
    formData.append("contactPersonEmail", data.contactPersonEmail);
    formData.append("status", data.status);

    try {
      // Check if a file is selected
      if (data.homeImage && data.homeImage[0]) {
        const imageFile = data.homeImage[0];

        // Upload the image to the backend
        const uploadFormData = new FormData();
        uploadFormData.append("image1", imageFile);

        const uploadResponse = await axios.post(
          "http://localhost:3000/users/api/upload", // Adjust the endpoint as needed
          uploadFormData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        const imageUrl = uploadResponse.data.imageUrl;
        //console.log("Uploaded Image URL:", imageUrl);

        // Append the uploaded image URL to the main formData
        formData.append("homeImageUrl", imageUrl);
      } else {
        console.error("No image selected");
        return;
      }

      // Submit the form data to your backend
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
          <select
            id="category"
            {...register("category", { required: "Category is required" })}
          >
            <option value="">Select a category</option>
            <option value="villa">Villa</option>
            <option value="apartment">Apartment</option>
            <option value="studio apartment">Studio Apartment</option>
            <option value="bungalow">Bungalow</option>
            <option value="others">Others</option>
          </select>
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

        {/* Home Image */}
        <div className="form-group">
          <label htmlFor="homeImage">Home Image:</label>
          <input
            id="homeImage"
            type="file"
            name="image1"
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
