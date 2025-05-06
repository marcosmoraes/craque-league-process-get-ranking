const { calculateUserPointsFromDBByLeague, calculateUserPointsFromDB } = require('./calculate-points-service');
const { createRankingWithPrizes, aggregateUserPoints } = require('./ranking-service');
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

async function getUserRankingByBubbleIds(bubbleIds) {
    let aggregatedUserPoints = {};

    // Soma os pontos dos usuários em todos os bubbleIds
    for (const bubbleId of bubbleIds) {
        const userPoints = await calculateUserPointsFromDB(bubbleId); // Pega os pontos dos usuários por bubbleId
        aggregatedUserPoints = await aggregateUserPoints(aggregatedUserPoints, userPoints); // Soma os pontos dos usuários
    }

    const ranking = await createRankingWithPrizes(aggregatedUserPoints); // Gera o ranking final com base nos pontos somados
    return new RankingDTO(ranking);
}

module.exports = { getUserPointsByBubbleId, getUserPointsByLeagueId, getUserRankingByBubbleIds };