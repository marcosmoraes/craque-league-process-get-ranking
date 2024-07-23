const { createRankingWithPrizes, sortUserPoints, distributePrizes, generateRanking } = require('../ranking-service');
const { UserRankingDTO } = require('../../dto/ranking-dto');

jest.mock('../../../infrastructure/data-access/mongodb', () => ({
    getLeaguePrize: jest.fn()
}));

const { getLeaguePrize } = require('../../../infrastructure/data-access/mongodb');

describe('Ranking Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should sort user points correctly', () => {
        const userPoints = {
            user1: { gamePoints: 100, playerPoints: 100 },
            user2: { gamePoints: 90, playerPoints: 90 },
            user3: { gamePoints: 80, playerPoints: 80 }
        };

        const sortedPoints = sortUserPoints(userPoints);

        expect(sortedPoints).toEqual([
            { userId: 'user1', totalPoints: 200, gamePoints: 100, playerPoints: 100 },
            { userId: 'user2', totalPoints: 180, gamePoints: 90, playerPoints: 90 },
            { userId: 'user3', totalPoints: 160, gamePoints: 80, playerPoints: 80 }
        ]);
    });

    test('should distribute prizes correctly', () => {
        const leaguePrize = {
            totalPrize: 2000,
            firstPlace: 840,
            secondPlace: 500,
            thirdPlace: 340,
            fourthPlace: 160,
            fifthPlace: 160
        };

        const sortedPoints = [
            { userId: 'user1', totalPoints: 200 },
            { userId: 'user2', totalPoints: 200 },
            { userId: 'user3', totalPoints: 200 },
            { userId: 'user4', totalPoints: 160 },
            { userId: 'user5', totalPoints: 120 },
            { userId: 'user6', totalPoints: 120 }
        ];

        const prizes = distributePrizes(leaguePrize, sortedPoints);

        expect(prizes).toEqual([560, 560, 560, 160, 80, 80]);
    });

    test('should generate ranking correctly', () => {
        const sortedPoints = [
            { userId: 'user1', totalPoints: 200, gamePoints: 100, playerPoints: 100 },
            { userId: 'user2', totalPoints: 200, gamePoints: 100, playerPoints: 100 },
            { userId: 'user3', totalPoints: 200, gamePoints: 100, playerPoints: 100 },
            { userId: 'user4', totalPoints: 160, gamePoints: 80, playerPoints: 80 },
            { userId: 'user5', totalPoints: 120, gamePoints: 60, playerPoints: 60 },
            { userId: 'user6', totalPoints: 120, gamePoints: 60, playerPoints: 60 }
        ];

        const prizes = [560, 560, 560, 160, 80, 80];

        const ranking = generateRanking(sortedPoints, prizes);

        expect(ranking).toEqual([
            new UserRankingDTO('user1', 200, 100, 100, 1, 560),
            new UserRankingDTO('user2', 200, 100, 100, 1, 560),
            new UserRankingDTO('user3', 200, 100, 100, 1, 560),
            new UserRankingDTO('user4', 160, 80, 80, 2, 160),
            new UserRankingDTO('user5', 120, 60, 60, 3, 80),
            new UserRankingDTO('user6', 120, 60, 60, 3, 80)
        ]);
    });

    test('should create ranking with prizes correctly', async () => {
        const userPoints = {
            user1: { gamePoints: 100, playerPoints: 100 },
            user2: { gamePoints: 100, playerPoints: 100 },
            user3: { gamePoints: 100, playerPoints: 100 },
            user4: { gamePoints: 80, playerPoints: 80 },
            user5: { gamePoints: 60, playerPoints: 60 },
            user6: { gamePoints: 60, playerPoints: 60 }
        };

        const leaguePrize = {
            totalPrize: 2000,
            firstPlace: 840,
            secondPlace: 500,
            thirdPlace: 340,
            fourthPlace: 160,
            fifthPlace: 160
        };

        getLeaguePrize.mockResolvedValue(leaguePrize);

        const ranking = await createRankingWithPrizes(userPoints, 'bubble1', null);

        expect(ranking).toEqual([
            new UserRankingDTO('user1', 200, 100, 100, 1, 560),
            new UserRankingDTO('user2', 200, 100, 100, 1, 560),
            new UserRankingDTO('user3', 200, 100, 100, 1, 560),
            new UserRankingDTO('user4', 160, 80, 80, 2, 160),
            new UserRankingDTO('user5', 120, 60, 60, 3, 80),
            new UserRankingDTO('user6', 120, 60, 60, 3, 80)
        ]);
    });
});
