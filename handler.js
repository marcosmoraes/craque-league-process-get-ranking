const { getUserPointsByBubbleId, getUserPointsByLeagueId, getUserRankingByBubbleIds } = require('./domain/service/user-points-service');
const { logProcessingState } = require('./utils/log-processing-state'); 

module.exports.getUserPoints = async (event) => {
    try {
        const { bubbleId } = JSON.parse(event.body);
        if (!bubbleId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'bubbleId is required' })
            };
        }

        const userPoints = await getUserPointsByBubbleId(bubbleId);
        
        return {
            statusCode: 200,
            body: JSON.stringify({ userPoints })            
        };
    } catch (error) {
        console.error('Error getting user points:', error);
        await logProcessingState(bubbleId, 'get-ranking-getUserPointsByBubbleId', 'error', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' })
        };
    }
};

module.exports.getUserPointsByLeague = async (event) => {
    try {
        const { leagueId } = JSON.parse(event.body);
        if (!leagueId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'leagueId is required' })
            };
        }

        const userPoints = await getUserPointsByLeagueId(leagueId);

        return {
            statusCode: 200,
            body: JSON.stringify({ userPoints })
        };
    } catch (error) {
        console.error('Error getting user points by league:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' })
        };
    }
};

module.exports.getUserRankingByBubbleIds = async (event) => {
    try {
        const { bubbleIds } = JSON.parse(event.body);
        if (!bubbleIds || !Array.isArray(bubbleIds)) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'bubbleIds array is required' })
            };
        }

        // Calcula o ranking final baseado em todos os bubbleIds
        const rankings = await getUserRankingByBubbleIds(bubbleIds);

        return {
            statusCode: 200,
            body: JSON.stringify({ rankings })
        };
    } catch (error) {
        console.error('Error getting rankings by bubbleIds:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' })
        };
    }
};
