const { createRankingWithPrizes, distributePrizes } = require('../ranking-service');
const { UserRankingDTO } = require('../../dto/ranking-dto');

jest.mock('../../../infrastructure/data-access/mongodb', () => ({
    getLeaguePrize: jest.fn()
}));

const { getLeaguePrize } = require('../../../infrastructure/data-access/mongodb');

describe('Ranking Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should rank users correctly without ties', async () => {
        const userPoints = {
            user1: { gamePoints: 100, playerPoints: 100 },
            user2: { gamePoints: 90, playerPoints: 90 },
            user3: { gamePoints: 80, playerPoints: 80 }
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
            new UserRankingDTO('user1', 200, 100, 100, 1, 840),
            new UserRankingDTO('user2', 180, 90, 90, 2, 500),
            new UserRankingDTO('user3', 160, 80, 80, 3, 340)
        ]);
    });

    test('should rank users correctly with ties', async () => {
        const userPoints = {
            user1: { gamePoints: 100, playerPoints: 100 },
            user2: { gamePoints: 100, playerPoints: 100 },
            user3: { gamePoints: 80, playerPoints: 80 }
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
            new UserRankingDTO('user1', 200, 100, 100, 1, 670),
            new UserRankingDTO('user2', 200, 100, 100, 1, 670),
            new UserRankingDTO('user3', 160, 80, 80, 3, 340)
        ]);
    });

    test('should distribute prizes correctly with multiple ties', () => {
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
            { userId: 'user4', totalPoints: 160 }
        ];

        const prizes = distributePrizes(leaguePrize, sortedPoints);

        expect(prizes).toEqual([560, 560, 560, 160]);
    });
});
