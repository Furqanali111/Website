
const mongoose = require('mongoose');
// Define the schema for feedback
const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  feedback: String
});

// Create a Mongoose model based on the schema
const Feedback = mongoose.model('Feedback', feedbackSchema);

// Connection URL with the database name included
const uri = "mongodb+srv://furqan121:kingarthur121@atlascluster.iwusgth.mongodb.net/feedback?retryWrites=true&w=majority";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

const form = document.querySelector('.contact-form');

// Function to handle form submission
async function handleSubmit(event) {
    event.preventDefault();   
    const name1 = document.getElementById('name').value;
    const email1 = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const newFeedback = new Feedback({
        name: name1,
        email: email1,
        feedback: message
    });

    // Save the feedback document to the database
    try {
        await newFeedback.save();
        alert('Feedback added successfully!');
    } catch (error) {
        console.error('Error:', error.message);
        alert('Failed to add feedback. Please try again.');
    }
}
form.addEventListener('submit23', handleSubmit);
  