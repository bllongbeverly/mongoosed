const mongoose = require('mongoose');
const User = require('../models/user');
const Thought = require('../models/thought');

const mongoURI = 'mongodb://127.0.0.1:27017'; 

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const usersData = [
  { username: 'jdoe', name: 'JDoe', email: 'j.doe@example.com' },
  { username: 'jsmith', name: 'JSmith', email: 'j.smith@example.com' },
];

const thoughtsData = [
  {
    thoughtText: 'This is the first thought.',
    username: 'jdoe',
    reactions: [
      {
        reactionBody: 'Agree!',
        username: 'jsmith',
      },
      {
        reactionBody: 'Interesting.',
        username: 'jdoe',
      },
    ],
  },
  {
    thoughtText: 'Another thought by jdoe.',
    username: 'jdoe',
    reactions: [
      {
        reactionBody: 'Cool!',
        username: 'jsmith',
      },
    ],
  },
  {
    thoughtText: 'Thought from jsmith.',
    username: 'jsmith',
    reactions: [],
  },
  {
    thoughtText: 'Yet another thought by jdoe.',
    username: 'jdoe',
    reactions: [
      {
        reactionBody: 'I agree.',
        username: 'jsmith',
      },
    ],
  },
];

async function seed() {
  try {
    await User.deleteMany();
    await Thought.deleteMany();

    const createdUsers = await User.insertMany(usersData);
    const createdThoughts = await Thought.insertMany(thoughtsData);

    console.log('Seed data inserted:');
    console.log('Users:', createdUsers);
    console.log('Thoughts:', createdThoughts);

    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding data:', error);
    mongoose.disconnect();
  }
}

seed();
