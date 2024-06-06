const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ligaDbConnection } = require('../../infrastructure/database/connect-database');

async function createUserPointsModel() {
    const dbConnection = await ligaDbConnection();

    const userPointsSchema = new Schema({
        bubbleId: { type: String, index: true },
        userId: { type: String, index: true },
        points: { type: Number, required: true }
    });

    return dbConnection.model('UserPoints', userPointsSchema, 'user-points');
}

module.exports = { createUserPointsModel };
