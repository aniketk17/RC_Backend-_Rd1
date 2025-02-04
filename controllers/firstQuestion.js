const Question = require('../models/Question');
const Progress = require('../models/Progress');
const { startTimer, getTimeLeft } = require('../utils/timer');

const firstQuestion = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = req.user;

    startTimer(userId);

    const questions = await Question.findAll({ where: { isJunior: user.isSenior ? false : true } });
    const shuffledQuestions = questions.sort(() => Math.random() - 0.5);

    if (!shuffledQuestions.length) return res.status(404).json({ message: 'No questions found' });

    await Progress.create({ user_id: userId, current_question_id: shuffledQuestions[0].id });

    return res.json({ question: shuffledQuestions[0], timeLeft: getTimeLeft(userId) });
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = firstQuestion;
