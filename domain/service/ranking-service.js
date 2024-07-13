const dataAccess = require('../../infrastructure/data-access/mongodb');
const { UserRankingDTO } = require('../dto/ranking-dto');

async function createRankingWithPrizes(userPoints, bubbleId = null, leagueId = null) {
    const sortedPoints = Object.entries(userPoints)
        .map(([userId, points]) => ({
            userId,
            totalPoints: points.gamePoints + points.playerPoints,
            gamePoints: points.gamePoints,
            playerPoints: points.playerPoints
        }))
        .sort((a, b) => b.totalPoints - a.totalPoints);

    const leaguePrize = await dataAccess.getLeaguePrize(bubbleId, leagueId);
    const prizes = distributePrizes(leaguePrize, sortedPoints);

    let rank = 1;
    let previousPoints = null;
    let tieCount = 0;

    return sortedPoints.map((entry, index) => {
        if (previousPoints === entry.totalPoints) {
            tieCount++;
        } else {
            rank += tieCount;
            tieCount = 1;
        }
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

    while (prizeIndex < prizeDistribution.length && prizeIndex < sortedPoints.length) {
        let tieCount = 1;
        let tieSum = prizeDistribution[prizeIndex];

        while (prizeIndex + tieCount < prizeDistribution.length && prizeIndex + tieCount < sortedPoints.length &&
            sortedPoints[prizeIndex].totalPoints === sortedPoints[prizeIndex + tieCount].totalPoints) {
            tieSum += prizeDistribution[prizeIndex + tieCount];
            tieCount++;
        }

        const prizeAmount = tieSum / tieCount;
        for (let i = 0; i < tieCount; i++) {
            prizes[prizeIndex + i] = prizeAmount;
        }

        prizeIndex += tieCount;
    }

    return prizes;
}

module.exports = { createRankingWithPrizes, distributePrizes };