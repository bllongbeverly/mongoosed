const Router = require('express').Router();
const { User} = require('../../models'); 

Router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
});


Router.post('/', async (req, res) => {
  try {
    const { username, email } = req.body;

    const user = new User({ username, email });
await user.save();
res.json(user);

  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


Router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;

    const user = await User.findByIdAndUpdate(id, { username, email }, { new: true });
res.json(user);

  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to delete a user
Router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Thought.findByIdAndDelete(id);

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = Router;
