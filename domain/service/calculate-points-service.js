const { createBetsPlacaresModel } = require('../model/bet-placares-model');
const { createBetPlayersModel } = require('../model/bet-players-model');

async function calculateUserPointsFromDB(bubbleId) {
    const BetsPlacares = await createBetsPlacaresModel();
    const BetPlayers = await createBetPlayersModel();

    // Consultas paralelas
    const [betsPlacaresPoints, betsPlayersPoints] = await Promise.all([
        BetsPlacares.aggregate([
            { $match: { bubbleId, pontosCalculados: true } },
            { $group: { _id: "$userId", totalDePontos: { $sum: "$totalDePontos" } } }
        ]),
        BetPlayers.aggregate([
            { $match: { bubbleId, pontosCalculados: true } },
            { $group: { _id: "$userId", totalDePontos: { $sum: "$totalDePontos" } } }
        ])
    ]);

    const userPoints = {};

    betsPlacaresPoints.forEach(bet => {
        if (!userPoints[bet._id]) {
            userPoints[bet._id] = { gamePoints: 0, playerPoints: 0 };
        }
        userPoints[bet._id].gamePoints += bet.totalDePontos || 0;
    });

    betsPlayersPoints.forEach(bet => {
        if (!userPoints[bet._id]) {
            userPoints[bet._id] = { gamePoints: 0, playerPoints: 0 };
        }
        userPoints[bet._id].playerPoints += bet.totalDePontos || 0;
    });

    return userPoints;
}

module.exports = { calculateUserPointsFromDB };
