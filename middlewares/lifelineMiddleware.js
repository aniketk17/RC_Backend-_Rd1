const Progress = require('../models/Progress'); 
const User = require('../models/UserModel');

const validateLifeline = async (req, res, next) => {
    try {
        const { user_id, lifeline_type } = req.body;
        
        const progress = await Progress.findOne({ where: { user_id } });
        if (!progress) return res.status(404).json({ error: "Progress not found." });

        const user = await User.findOne({ where: { id: user_id } });
        if (!user) return res.status(404).json({ error: "User not found." });

        const remainingTime = req.timer || 0;

        if (progress.lifeline_counter >= 3) {
            return res.status(400).json({ error: "All lifelines have already been used." });
        }

        if (remainingTime <= 0) {
            return res.status(400).json({ error: "Time is up. Cannot use lifelines." });
        }

        switch (lifeline_type) {
            case "skip":
                if (progress.streak < 3) {
                    return res.status(400).json({ error: "A streak of 3 is required to use Skip." });
                }
                if (!progress.question_id) {
                    return res.status(400).json({ error: "You must answer at least one question before using Skip." });
                }
                break;

            case "freeze":
                if (progress.streak < 4) {
                    return res.status(400).json({ error: "A streak of 4 is required to use Freeze Time." });
                }
                if (remainingTime === 0) {
                    return res.status(400).json({ error: "Time is already over. Cannot freeze time now." });
                }
                break;

            case "double":
                if (progress.streak < 5) {
                    return res.status(400).json({ error: "A streak of 5 is required to use Double Marks." });
                }
                if (!progress.current_question_id) {
                    return res.status(400).json({ error: "You must be answering a question to use Double Marks." });
                }
                break;

            default:
                return res.status(400).json({ error: "Invalid lifeline type." });
        }

        next(); 

    } catch (error) {
        console.error("Lifeline validation error:", error);
        res.status(500).json({ error: "Server error during lifeline validation." });
    }
};

module.exports = validateLifeline;
