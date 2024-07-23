const dataAccess = require('../../infrastructure/data-access/mongodb');
const { UserRankingDTO } = require('../dto/ranking-dto');

async function createRankingWithPrizes(userPoints, bubbleId = null, leagueId = null) {
    const sortedPoints = sortUserPoints(userPoints);
    const leaguePrize = await dataAccess.getLeaguePrize(bubbleId, leagueId);
    const prizes = distributePrizes(leaguePrize, sortedPoints);

    return generateRanking(sortedPoints, prizes);
}

function sortUserPoints(userPoints) {
    return Object.entries(userPoints)
        .map(([userId, points]) => ({
            userId,
            totalPoints: points.gamePoints + points.playerPoints,
            gamePoints: points.gamePoints,
            playerPoints: points.playerPoints
        }))
        .sort((a, b) => b.totalPoints - a.totalPoints);
}

function distributePrizes(leaguePrize, sortedPoints) {
    if (!leaguePrize) return [];

    const prizeDistribution = [
        leaguePrize.firstPlace,
        leaguePrize.secondPlace,
        leaguePrize.thirdPlace,
        leaguePrize.fourthPlace,
        leaguePrize.fifthPlace
    ];

    let prizeIndex = 0;
    const prizes = Array(sortedPoints.length).fill(0);
    const numPrizes = prizeDistribution.length;

    for (let i = 0; i < sortedPoints.length && prizeIndex < numPrizes; i++) {
        let tieCount = 1;
        let currentPoints = sortedPoints[i].totalPoints;

        while (i + tieCount < sortedPoints.length && sortedPoints[i + tieCount].totalPoints === currentPoints) {
            tieCount++;
        }

        const prizeAmount = prizeDistribution.slice(prizeIndex, prizeIndex + tieCount).reduce((a, b) => a + b, 0) / tieCount;

        for (let j = 0; j < tieCount; j++) {
            if (prizeIndex < numPrizes) {
                prizes[i + j] = prizeAmount;
            }
        }

        prizeIndex += tieCount;
        i += tieCount - 1;
    }

    return prizes;
}

function generateRanking(sortedPoints, prizes) {
    let rank = 1;
    let previousPoints = null;
    let previousRank = 0;

    return sortedPoints.map((entry, index) => {
        if (previousPoints !== null && previousPoints !== entry.totalPoints) {
            rank = previousRank + 1;
        }
        previousRank = rank;
        previousPoints = entry.totalPoints;

        return new UserRankingDTO(
            entry.userId,
            entry.totalPoints,
            entry.gamePoints,
            entry.playerPoints,
            rank,
            prizes[index] || 0
        );
    });
}

module.exports = {
    createRankingWithPrizes,
    sortUserPoints,
    distributePrizes,
    generateRanking
};
