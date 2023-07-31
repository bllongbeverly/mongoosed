const mongoose = require('mongoose');
const User = require('./models/user'); 


const mongoURI = 'YOUR_MONGODB_CONNECTION_STRING'; 
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const usersData = [
  { name: 'JDoe', email: 'j.doe@example.com' },
  { name: 'JSmith', email: 'j.smith@example.com' },
  
];


async function seed() {
  try {
    
    await User.deleteMany();

    
    const createdUsers = await User.insertMany(usersData);

    console.log('Seed data inserted:');
    console.log('Users:', createdUsers);

    B
    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding data:', error);
    mongoose.disconnect();
  }
}

seed();
