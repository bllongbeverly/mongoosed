const express = require('express');
const router = express.Router();
const { thought } = require('../../models'); 


router.get('/', async (req, res) => {
try {
    const thought = await User.find();
    res.json(thought);
} catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
}
});

router.post('/', async (req, res) => {
 try {
    const { name, email } = req.body;
    const thought = new Thought({ name, email });
    await thought.save();
    res.json(thought);
} catch (err) {
    res.status(500).json({ error: 'Server error' });
}
});


router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const thought = await thought.findByIdAndUpdate(id, { name, email }, { new: true });
    res.json(thought);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: 'thought deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
