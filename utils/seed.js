const mongoose = require('mongoose');
const User = require('../models/user');
const Thought = require('../models/thought');

const mongoURI = 'mongodb://127.0.0.1:27017'; 


mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function seed() {
  try {
    await User.deleteMany();
    await Thought.deleteMany();

    // Create users
    const usersData = [
      { username: 'jdoe', name: 'John Doe', email: 'j.doe@example.com' },
      { username: 'jsmith', name: 'Jane Smith', email: 'j.smith@example.com' },
    ];

    const createdUsers = await User.insertMany(usersData);

    // Create thoughts
    const thoughtsData = [
      {
        thoughtText: 'This is the first thought.',
        username: 'jdoe',
      },
      {
        thoughtText: 'Another thought by jdoe.',
        username: 'jdoe',
      },
    ];

    const createdThoughts = await Thought.insertMany(thoughtsData);

    // Add reactions to thoughts
    const reactionsData = [
      {
        reactionBody: 'Agree!',
        username: 'jsmith',
      },
      {
        reactionBody: 'Interesting.',
        username: 'jdoe',
      },
    ];

    for (const [index, reaction] of reactionsData.entries()) {
      createdThoughts[index].reactions.push(reaction);
    }

    await Promise.all(createdThoughts.map(thought => thought.save()));

    // Add friends to users
    const [user1, user2] = createdUsers;

    user1.friends.push(user2._id);
    user2.friends.push(user1._id);

    await Promise.all([user1.save(), user2.save()]);

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
