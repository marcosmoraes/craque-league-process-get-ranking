const { createBetsPlacaresModel } = require('../model/bet-placares-model');
const { createBetPlayersModel } = require('../model/bet-players-model');

async function calculateUserPointsFromDB(bubbleId) {
    const BetsPlacares = await createBetsPlacaresModel();
    const BetPlayers = await createBetPlayersModel();

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

async function calculateUserPointsFromDBByLeague(leagueId) {
    const BetsPlacares = await createBetsPlacaresModel();
    const BetPlayers = await createBetPlayersModel();

    // Obter todos os bubbleIds para o leagueId especificado
    const bubbleIds = await BetsPlacares.distinct('bubbleId', { 'league.id': leagueId, pontosCalculados: true });

    // Consultas para obter pontos agrupados por userId e bubbleId
    const betsPlacaresPoints = await BetsPlacares.aggregate([
        { $match: { 'league.id': leagueId, pontosCalculados: true } },
        { $group: { _id: "$userId", totalDePontos: { $sum: "$totalDePontos" } } }
    ]);

    const betsPlayersPoints = await BetPlayers.aggregate([
        { $match: { bubbleId: { $in: bubbleIds }, pontosCalculados: true } },
        { $group: { _id: "$userId", totalDePontos: { $sum: "$totalDePontos" } } }
    ]);

    const userPoints = {};

    // Somar pontos de BetsPlacares
    betsPlacaresPoints.forEach(bet => {
        const userId = bet._id;
        if (!userPoints[userId]) {
            userPoints[userId] = { gamePoints: 0, playerPoints: 0 };
        }
        userPoints[userId].gamePoints += bet.totalDePontos || 0;
    });

    // Somar pontos de BetPlayers
    betsPlayersPoints.forEach(bet => {
        const userId = bet._id;
        if (!userPoints[userId]) {
            userPoints[userId] = { gamePoints: 0, playerPoints: 0 };
        }
        userPoints[userId].playerPoints += bet.totalDePontos || 0;
    });

    console.log('Total de usuários distintos:', Object.keys(userPoints).length);
    return userPoints;
}


module.exports = { calculateUserPointsFromDB, calculateUserPointsFromDBByLeague };