const { v4: uuidv4 } = require("uuid");
const Question = require("../models/Question");
const Progress = require("../models/Progress");
const {nextQuestion} = require("../controllers/questionController")

const updateProgress = async (req, res) => {
  try {
    const { user_id, question_id, user_answer } = req.body;

    console.log("Received Data:", req.body); // Debugging log

    // Validate required fields
    if (!user_id || !question_id || !user_answer) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Ensure question_id is a valid number
    const parsedQuestionId = parseInt(question_id, 10);
    if (isNaN(parsedQuestionId)) {
      return res.status(400).json({ error: "Invalid question_id format" });
    }

    console.log("Parsed question_id:", parsedQuestionId); // Debugging log

    // Fetch the question
    const question = await Question.findByPk(parsedQuestionId);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    // Check if the answer is correct
    const is_correct = question.answer === user_answer;

    // Check if progress exists for this user
    let progress = await Progress.findOne({ where: { user_id } });

    if (!progress) {
        progress = await Progress.create({
            user_id,
            question_id: question_id,   // Explicitly include question_id
            current_question_id: question_id,           
            marks: 0,
            streak: 0,
            lifelines_used: 0,
            first_attempt: true,
            second_attempt: false,
      });
    }

    let { marks, streak, lifelines_used, first_attempt, second_attempt } = progress;

    // If it's a new question, reset attempts
    if (progress.current_question_id !== parsedQuestionId) {
      first_attempt = true;
      second_attempt = false;
    }

    // Handle attempts and scoring logic
    if (first_attempt) {
      if (is_correct) {
        marks += 5;
        streak += 1;
      } else {
        marks -= 2;
        streak = 0;
      }
      first_attempt = false;
      second_attempt = true;
    } else if (second_attempt) {
      if (is_correct) {
        marks += 2;
        streak += 1;
      } else {
        marks -= 2;
        streak = 0;
      }
      second_attempt = false;
    }

    // Update progress
    await progress.update({
      first_attempt,
      second_attempt,
      marks,
      streak,
      lifelines_used,
      current_question_id: nextQuestion.question_id,
    });

    return res.status(200).json({
      message: "Progress updated",
      is_correct,
      marks,
      streak,
    });
  } catch (error) {
    console.error("Error in updateProgress:", error);
    return res.status(500).json({ error: "An error occurred while updating progress" });
  }
};

module.exports = { updateProgress };
