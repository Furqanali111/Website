const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3000;

// Connect to MongoDB Atlas
const uri = "mongodb+srv://furqan121:kingarthur121@atlascluster.iwusgth.mongodb.net/feedback?retryWrites=true&w=majority";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas!'))
.catch(err => console.error('Error connecting to MongoDB Atlas:', err.message));

// Define the feedback schema
const feedbackSchema = new mongoose.Schema({
    name: String,
    email: String,
    feedback: String
});

// Create a Mongoose model based on the schema
const Feedback = mongoose.model('feedback', feedbackSchema);

// Middleware for parsing JSON request bodies
app.use(bodyParser.json());

// Use cors middleware to enable CORS
app.use(cors());

// Route for handling feedback submissions
app.post('/feedback', async (req, res) => {
    console.log("call")
    try {
        const newFeedback = new Feedback(req.body);
        await newFeedback.save();
        res.json({ message: 'Feedback added successfully!' });
    } catch (error) {
        console.error('Error while saving feedback:', error.message);
        res.status(500).json({ message: 'Error while saving feedback. Please try again.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
