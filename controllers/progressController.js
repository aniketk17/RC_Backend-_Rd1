const  Question  = require("../models/Question")
const  Progress  = require("../models/Progress");

const updateProgress = async (req, res) => {
  const { user_id, question_id, attempt, user_answer, lifeline_counter } = req.body;

  if (!user_id || !question_id || attempt === undefined || !user_answer) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Fetch the correct answer from the database
    const question = await Question.findByPk(question_id);

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    // Check if the answer is correct
    const is_correct = question.answer === user_answer;

    let progress = await Progress.findOne({ where: { user_id } });

    if (!progress) {
      progress = await Progress.create({
        user_id,
        current_question_id: question_id,
      });
    }

    let { marks, streak, lifelines_used, first_attempt, second_attempt } = progress;

    // If it's a new question, reset attempts
    if (progress.current_question_id !== question_id) {
      first_attempt = true;
      second_attempt = false;
    }

    if (attempt === 1 && first_attempt) {
      if (is_correct) {
        marks += 5;
        streak += 1;
      } else {
        marks -= 2;
        streak = 0; // Reset streak on incorrect answer
      }
      first_attempt = false;
      second_attempt = true; // Unlock second attempt
    } else if (attempt === 2 && second_attempt) {
      if (is_correct) {
        marks += 2;
        streak += 1;
      } else {
        marks -= 2;
        streak = 0; // Reset streak on incorrect answer
      }
      second_attempt = false; // No more attempts
    }

    // Update lifelines used
    // lifelines_used += lifeline_counter || 0;

    await progress.update({
      first_attempt,
      second_attempt,
      marks,
      streak,
      lifelines_used,
      current_question_id: question_id,
    });

    return res.status(200).json({
      message: "Progress updated",
      is_correct, // Return whether the answer was correct
      progress,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred while updating progress" });
  }
};

module.exports = { updateProgress };