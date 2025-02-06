const Progress = require('../models/Progress');
const User = require('../models/UserModel');

const handleEdgeCases = async (req, res, next) => {
    try {
        const { user_id, lifeline_type } = req.body;

        const progress = await Progress.findOne({ where: { user_id } });
        if (!progress) return res.status(404).json({ error: "Progress not found." });

        const user = await User.findOne({ where: { id: user_id } });
        if (!user) return res.status(404).json({ error: "User not found." });

        const remainingTime = req.timer || 0;

        if (progress.lifeline_counter > 0 && progress.current_question_id === progress.question_id) {
            return res.status(400).json({ error: "Only one lifeline can be used per question." });
        }

        if (progress.used_lifelines && progress.used_lifelines.includes(lifeline_type)) {
            return res.status(400).json({ error: `You have already used ${lifeline_type} lifeline.` });
        }

        if (remainingTime <= 0) {
            return res.status(400).json({ error: "Time is up. Cannot use lifelines." });
        }

        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized. Please log in again." });
        }

        next();
    } catch (error) {
        console.error("Lifeline edge case error:", error);
        res.status(500).json({ error: "Server error while handling lifeline edge cases." });
    }
};

module.exports = handleEdgeCases;
