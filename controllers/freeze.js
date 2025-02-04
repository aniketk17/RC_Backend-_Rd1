const Progress = require('../models/Progress');
const { addTime } = require('../utils/timer');

const freeze = async (req, res) => {
  try {
    const userId = req.user.id;
    const progress = await Progress.findOne({ where: { user_id: userId } });

    if (!progress) return res.status(400).json({ message: 'Progress not found' });
    if (progress.lifeline_counter >= 3) return res.status(400).json({ message: 'All lifelines used' });
    if (progress.streak < 4) return res.status(400).json({ message: 'Min streak of 4 required' });

    addTime(userId, 60);

    await progress.update({ lifeline_counter: progress.lifeline_counter + 1, streak: 0 });

    return res.json({ message: 'Time frozen for 60 seconds!' });
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = freeze;
