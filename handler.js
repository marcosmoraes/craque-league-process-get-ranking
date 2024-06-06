const { getUserPointsByBubbleId } = require('./domain/service/user-points-service');

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
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' })
        };
    }
};
