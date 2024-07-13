const { calculateUserPointsFromDBByLeague, calculateUserPointsFromDB } = require('./calculate-points-service');
const { createRankingWithPrizes } = require('./ranking-service');
const { RankingDTO } = require('../dto/ranking-dto');

async function getUserPointsByBubbleId(bubbleId) {
    const userPoints = await calculateUserPointsFromDB(bubbleId);
    const ranking = await createRankingWithPrizes(userPoints, bubbleId);
    return new RankingDTO(ranking);
}

async function getUserPointsByLeagueId(leagueId) {
    const userPoints = await calculateUserPointsFromDBByLeague(leagueId);
    const ranking = await createRankingWithPrizes(userPoints, null, leagueId);
    return new RankingDTO(ranking);
}

module.exports = { getUserPointsByBubbleId, getUserPointsByLeagueId };