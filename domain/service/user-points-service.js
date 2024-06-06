const { calculateUserPointsFromDB } = require('./calculate-points-service');
const { createRanking } = require('./ranking-service');

async function getUserPointsByBubbleId(bubbleId) {
    const userPoints = await calculateUserPointsFromDB(bubbleId);
    const ranking = createRanking(userPoints);
    return ranking;
}

module.exports = { getUserPointsByBubbleId };
