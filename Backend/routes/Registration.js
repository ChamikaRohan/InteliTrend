const express = require('express');
const Registration = require('../models/Registrations');
const authMiddleware = require('../middleware/auth');
const router = express.Router();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { MongoClient, GridFSBucket } = require('mongodb');
const path = require('path');
const { ObjectId } = require('mongodb');
const { Console } = require('console');
const fs = require('fs');

// Define storage location and filename for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const token = req.headers.authorization.split(' ')[1];
    const type = req.headers.type; // Extract the Type header value
    const decoded = jwt.verify(token, 'your secret here');
    const userId = decoded.userId;
    const nsubfolder = `uploads/${userId}`;
    const subfolder = `${nsubfolder}/${type}`;
    fs.mkdirSync(subfolder, { recursive: true });
    cb(null, subfolder);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

// Initialize multer with the defined storage settings
const upload = multer({ storage: storage });

// Define the POST route for file upload
router.post('/upload', upload.single('file'), async (req, res) => {
  
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // Do something with the uploaded file, such as saving it to a database or displaying it on a webpage

  try {
    const token = req.headers.authorization.split(' ')[1];
    const type = req.headers.type; // Extract the Type header value
    // Verify the JWT token
    const decoded = jwt.verify(token, 'your secret here');
    const userId = decoded.userId;
    // Save the file to the local disk
    const filePath = `uploads/${userId}/${type}/${req.file.filename}`;
    await fs.promises.rename(req.file.path, filePath);

    // Send a success response back to the client
    return res.status(200).json({
      success: true,
      message: 'File uploaded successfully.',
      filePath: filePath,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Server error while saving file.',
      error: error,
    });
  }
});


router.get('/photos', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    // Verify the JWT token
    const decoded = jwt.verify(token, 'your secret here');
    const userId = decoded.userId;
    // Get the list of files in the user's subdirectory
    const subfolder = `uploads/${userId}`;
    const files = await fs.promises.readdir(subfolder);

    // Send the list of files back to the client
    return res.status(200).json({
      success: true,
      message: 'Photos retrieved successfully.',
      files: files,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Server error while retrieving photos.',
      error: error,
    });
  }
});


// Route to handle POST requests to create a new registration document in the database
router.post('/register', async (req, res) => {
  try {
    const { title, firstName, lastName, nic, email, dateOfBirth, mobileNumber, password } = req.body;

    // Create a new registration document using the Registration model
    const registration = new Registration({
      title,
      firstName,
      lastName,
      nic,
      email,
      dateOfBirth,
      mobileNumber,
      password
    });

    // Save the new registration document to the database
    const savedRegistration = await registration.save();

    // Respond with the saved registration document as JSON
    res.json(savedRegistration);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


// Route to handle POST requests to authenticate a user
router.post('/auth', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user with the specified NIC and password
    const user = await Registration.findOne({ email, password });

    // If no user is found, respond with an error message
    if (!user) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    // If the user is found, respond with a success message
    const token = jwt.sign({ userId: user._id }, 'your secret here');

    console.log(`Token: ${token}`);
    res.json({ token, msg: 'Authenticated successfully' });
    

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});



// Route to handle GET requests to retrieve user data
router.get('/profile', async (req, res) => {
  try {
    // Get the JWT token from the request header
    const token = req.headers.authorization.split(' ')[1];

    // Verify the JWT token
    const decoded = jwt.verify(token, 'your secret here');

    // Get the user data based on the email in the JWT token
    const user = await Registration.findOne({ _id: decoded.userId });

    // If no user is found, respond with an error message
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // If the user is found, respond with the user data
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


module.exports = router;
