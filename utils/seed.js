const mongoose = require('mongoose');
const User = require('./models/user'); 

// Connect to MongoDB
const mongoURI = 'YOUR_MONGODB_CONNECTION_STRING'; 
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample user data
const usersData = [
  { name: 'John Doe', email: 'john.doe@example.com' },
  { name: 'Jane Smith', email: 'jane.smith@example.com' },
  // Add more sample users here as needed
];

// Seed function
async function seed() {
  try {
    // Remove existing data from the User collection
    await User.deleteMany();

    // Insert sample users into the User collection
    const createdUsers = await User.insertMany(usersData);

    console.log('Seed data inserted:');
    console.log('Users:', createdUsers);

    // Disconnect from MongoDB
    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding data:', error);
    mongoose.disconnect();
  }
}

seed();
