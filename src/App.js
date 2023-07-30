const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const Thought = require('./models/thought');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/thoughtsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// API Routes
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().populate('thoughts').populate('friends');
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get('/api/users/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate('thoughts')
      .populate('friends');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.put('/api/users/:userId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
    });
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.delete('/api/users/:userId', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      // Bonus: Remove user's associated thoughts
      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json(user);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post('/api/users/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friend = await User.findById(req.params.friendId);
    if (!user || !friend) {
      res.status(404).json({ message: 'User or friend not found' });
    } else {
      user.friends.push(friend);
      await user.save();
      res.json(user);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

app.delete('/api/users/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      user.friends.pull(req.params.friendId);
      await user.save();
      res.json(user);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get('/api/thoughts', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get('/api/thoughts/:thoughtId', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      res.status(404).json({ message: 'Thought not found' });
    } else {
      res.json(thought);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post('/api/thoughts', async (req, res) => {
  try {
    const thought = await Thought.create(req.body);
    const user = await User.findById(req.body.userId);
    user.thoughts.push(thought);
    await user.save();
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.put('/api/thoughts/:thoughtId', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      req.body,
      { new: true }
    );
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.delete('/api/thoughts/:thoughtId', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post('/api/thoughts/:thoughtId/reactions', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      res.status(404).json({ message: 'Thought not found' });
    } else {
      thought.reactions.push(req.body);
      await thought.save();
      res.json(thought);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

app.delete('/api/thoughts/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      res.status(404).json({ message: 'Thought not found' });
    } else {
      thought.reactions.pull({ reactionId: req.params.reactionId });
      await thought.save();
      res.json(thought);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
