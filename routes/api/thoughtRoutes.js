const express = require('express');
const Router = express.Router();
const { Thought, User } = require('../../models'); 


Router.get('/', async (req, res) => {
try {
    const thought = await Thought.find();
    res.json(thought);
} catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
}
});

Router.post('/', async (req, res) => {
 try {
  const { username, email } = req.body;

  const thought = new Thought({ thoughtText, username });
  await thought.save();
  res.json(thought);
  
} catch (err) {
    res.status(500).json({ error: 'Server error' });
}
});


Router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;

    const thought = await Thought.findByIdAndUpdate(id, { thoughtText, username }, { new: true });
res.json(thought);

  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

Router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Thought.findByIdAndDelete(id);

    res.json({ message: 'thought deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = Router;
