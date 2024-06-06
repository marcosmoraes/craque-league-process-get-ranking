function createRanking(userPoints) {
    const ranking = Object.keys(userPoints).map(userId => ({
        userId,
        totalPoints: userPoints[userId].gamePoints + userPoints[userId].playerPoints,
        gamePoints: userPoints[userId].gamePoints,
        playerPoints: userPoints[userId].playerPoints
    }));

    return ranking.sort((a, b) => b.totalPoints - a.totalPoints);
}

module.exports = { createRanking };