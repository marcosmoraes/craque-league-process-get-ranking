const { calculateUserPointsFromDB } = require('./calculate-points-service'); // Adjust the path as needed
const { createBetsPlacaresModel } = require('../model/bet-placares-model');
const { createBetPlayersModel } = require('../model/bet-players-model');

jest.mock('../model/bet-placares-model');
jest.mock('../model/bet-players-model');

describe('calculateUserPointsFromDB', () => {
    let BetsPlacaresMock;
    let BetPlayersMock;

    beforeEach(() => {
        BetsPlacaresMock = {
            aggregate: jest.fn()
        };
        BetPlayersMock = {
            aggregate: jest.fn()
        };
        createBetsPlacaresModel.mockResolvedValue(BetsPlacaresMock);
        createBetPlayersModel.mockResolvedValue(BetPlayersMock);
    });

    test('should calculate user points correctly when there are points from both bets and players', async () => {
        BetsPlacaresMock.aggregate.mockResolvedValue([
            { _id: 'user1', totalDePontos: 10 },
            { _id: 'user2', totalDePontos: 20 }
        ]);

        BetPlayersMock.aggregate.mockResolvedValue([
            { _id: 'user1', totalDePontos: 5 },
            { _id: 'user2', totalDePontos: 15 }
        ]);

        const result = await calculateUserPointsFromDB('testBubbleId');

        expect(result).toEqual({
            user1: { gamePoints: 10, playerPoints: 5 },
            user2: { gamePoints: 20, playerPoints: 15 }
        });
    });

    test('should handle cases where there are no points from bets', async () => {
        BetsPlacaresMock.aggregate.mockResolvedValue([]);
        BetPlayersMock.aggregate.mockResolvedValue([
            { _id: 'user1', totalDePontos: 5 },
            { _id: 'user2', totalDePontos: 15 }
        ]);

        const result = await calculateUserPointsFromDB('testBubbleId');

        expect(result).toEqual({
            user1: { gamePoints: 0, playerPoints: 5 },
            user2: { gamePoints: 0, playerPoints: 15 }
        });
    });

    test('should handle cases where there are no points from players', async () => {
        BetsPlacaresMock.aggregate.mockResolvedValue([
            { _id: 'user1', totalDePontos: 10 },
            { _id: 'user2', totalDePontos: 20 }
        ]);
        BetPlayersMock.aggregate.mockResolvedValue([]);

        const result = await calculateUserPointsFromDB('testBubbleId');

        expect(result).toEqual({
            user1: { gamePoints: 10, playerPoints: 0 },
            user2: { gamePoints: 20, playerPoints: 0 }
        });
    });

    test('should return an empty object when there are no points from both bets and players', async () => {
        BetsPlacaresMock.aggregate.mockResolvedValue([]);
        BetPlayersMock.aggregate.mockResolvedValue([]);

        const result = await calculateUserPointsFromDB('testBubbleId');

        expect(result).toEqual({});
    });

    test('should handle cases where bubbleId is not provided', async () => {
        await expect(calculateUserPointsFromDB()).rejects.toThrow();
    });
});
