const timers = new Map(); 

const startTimer = (userId, duration = 2400) => { 
  if (timers.has(userId)) return;

  const endTime = Date.now() + duration * 1000;
  timers.set(userId, endTime);
};

const getTimeLeft = (userId) => {
  const endTime = timers.get(userId);
  return endTime ? Math.max(0, Math.floor((endTime - Date.now()) / 1000)) : 0;
};

const addTime = (userId, seconds) => {
  if (timers.has(userId)) {
    timers.set(userId, timers.get(userId) + seconds * 1000);
  }
};

const stopTimer = (userId) => {
  timers.delete(userId);
};


module.exports = { startTimer, getTimeLeft, addTime, stopTimer };