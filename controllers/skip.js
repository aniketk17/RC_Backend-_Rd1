const Progress = require('../models/Progress');
const countStreak = require('../utils/countStreak');

const skip = async (req, res) => {
  const { userId, prevQuestionId } = req.body;

  try {
    const streak = await countStreak(userId);
    if (streak < 3) return res.status(400).json({ success: false, message: 'Streak too low to use Skip' });

    await Progress.update(
      { marks: 3 }, //Marks for the skipped question to be decided later
      { where: { user_id: userId, question_id: prevQuestionId } }
    );

    await Progress.update(
      { streak: 0 }, // Reset streak
      { where: { user_id: userId } }
    );

    return res.json({ success: true, message: 'Skip used. Full marks for previous question awarded.' });
  } catch (error) {
    console.error('Error using skip:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = skip;
