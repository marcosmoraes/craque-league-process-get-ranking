// __tests__/createRanking.test.js
const { createRanking } = require('./ranking-service');

describe('createRanking', () => {
    test('should return a ranking sorted by total points in descending order', () => {
        const userPoints = {
            user1: { gamePoints: 10, playerPoints: 5 },
            user2: { gamePoints: 20, playerPoints: 10 },
            user3: { gamePoints: 15, playerPoints: 5 }
        };

        const result = createRanking(userPoints);

        expect(result).toEqual([
            { userId: 'user2', totalPoints: 30, gamePoints: 20, playerPoints: 10 },
            { userId: 'user3', totalPoints: 20, gamePoints: 15, playerPoints: 5 },
            { userId: 'user1', totalPoints: 15, gamePoints: 10, playerPoints: 5 }
        ]);
    });

    test('should handle cases with zero points', () => {
        const userPoints = {
            user1: { gamePoints: 0, playerPoints: 0 },
            user2: { gamePoints: 0, playerPoints: 0 },
            user3: { gamePoints: 0, playerPoints: 0 }
        };

        const result = createRanking(userPoints);

        expect(result).toEqual([
            { userId: 'user1', totalPoints: 0, gamePoints: 0, playerPoints: 0 },
            { userId: 'user2', totalPoints: 0, gamePoints: 0, playerPoints: 0 },
            { userId: 'user3', totalPoints: 0, gamePoints: 0, playerPoints: 0 }
        ]);
    });

    test('should handle cases with negative points', () => {
        const userPoints = {
            user1: { gamePoints: -10, playerPoints: -5 },
            user2: { gamePoints: -20, playerPoints: -10 },
            user3: { gamePoints: -15, playerPoints: -5 }
        };

        const result = createRanking(userPoints);

        expect(result).toEqual([
            { userId: 'user1', totalPoints: -15, gamePoints: -10, playerPoints: -5 },
            { userId: 'user3', totalPoints: -20, gamePoints: -15, playerPoints: -5 },
            { userId: 'user2', totalPoints: -30, gamePoints: -20, playerPoints: -10 }
        ]);
    });

    test('should handle an empty userPoints object', () => {
        const userPoints = {};

        const result = createRanking(userPoints);

        expect(result).toEqual([]);
    });

    test('should handle cases with only one user', () => {
        const userPoints = {
            user1: { gamePoints: 10, playerPoints: 5 }
        };

        const result = createRanking(userPoints);

        expect(result).toEqual([
            { userId: 'user1', totalPoints: 15, gamePoints: 10, playerPoints: 5 }
        ]);
    });
});
