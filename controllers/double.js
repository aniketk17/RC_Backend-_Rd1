const Progress = require('../models/Progress');
const countStreak = require('../utils/countStreak');

const double = async (req, res) => {
  const { userId, questionId } = req.body;

  try {
    const streak = await countStreak(userId);
    if (streak < 5) return res.status(400).json({ success: false, message: 'Streak too low to use Double Marks' });

    const progress = await Progress.findOne({ where: { user_id: userId, question_id: questionId } });

    if (!progress) return res.status(404).json({ success: false, message: 'Question progress not found' });

    await Progress.update(
      { marks: progress.marks * 2 }, // Double marks
      { where: { user_id: userId, question_id: questionId } }
    );

    await Progress.update({ streak: 0 }, { where: { user_id: userId } });

    return res.json({ success: true, message: 'Double Marks used. Points for this question doubled.' });
  } catch (error) {
    console.error('Error using double marks:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = double;
