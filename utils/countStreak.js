const Progress = require('../models/Progress');

const countStreak = async (userId) => {
    try{
        const progress = await Progress.findOne({
            where : {user_id : userId},
            order : [['id','DESC']],
        });
        let streak = 0;
        for(let i=0;i<progress.length;i++){
            if(progress[i].first_attempt) streak++;
            else break;
        }
        return streak;
    }
    catch(err){
        console.error('Error counting streak:', err);
        return 0;
    }
};

module.exports = countStreak;