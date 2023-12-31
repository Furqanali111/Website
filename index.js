
document.addEventListener('DOMContentLoaded', () => {
    const mongoose = require ('mongoose');
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

    // Connect to MongoDB Atlas
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Connected to MongoDB Atlas!');
    }).catch((err) => {
        console.error('Error connecting to MongoDB Atlas:', err.message);
    });

    const form = document.querySelector('.contact_form');

    async function handleSubmit(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        try {
            // Create a new feedback document
            const newFeedback = new Feedback({
                name,
                email,
                feedback: message
            });

            // Save the feedback document to the database
            await newFeedback.save();
            console.log('Feedback added successfully!');
            alert('Feedback added successfully!');
            form.reset(); // Reset the form after successful submission
        } catch (error) {
            console.error('Error while saving feedback:', error.message);
            alert('Error while saving feedback. Please try again.');
        }
    }

    form.addEventListener('submit', handleSubmit);
});
