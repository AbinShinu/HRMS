const Home = require("..models/Home.js")

const addHome = async (req, res) => {
    try {
      // Validate if a home with the same location and contact person already exists
      const existingHome = await Home.findOne({
        location: req.body.location,
        'contactPerson.name': req.body.contactPerson?.name,
      });
  
      if (existingHome) {
        return res.status(400).json({ error: 'A home with this location and contact person already exists' });
      }
  
      // Prepare the home object
      const homeItem = {
        location: req.body.location,
        price: req.body.price,
        category: req.body.category,
        contactPerson: req.body.contactPerson,
        status: req.body.status || 'available', // Default status is 'available'
        availability: req.body.availability ?? true, // Default availability is true
        applicants: req.body.applicants || [], // Default applicants is an empty array
      };
  
      // Create a new home instance
      const home = new Home(homeItem);
  
      // Save the home to the database
      const savedHome = await home.save();
  
      // Respond with the newly created home
      res.status(201).json(savedHome);
    } catch (error) {
      console.error('Error adding home:', error);
      res.status(500).json({ error: error.message });
    }
  };

  module.exports(addHome);