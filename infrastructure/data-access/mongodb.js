const { createLigaModel } = require('../../domain/model/create-league-model');

async function getLeaguePrize(bubbleId, leagueId) {
    const Liga = await createLigaModel();
    const query = bubbleId ? { bubbleId } : { leagueId };
    const league = await Liga.findOne(query);
    return league ? league.leaguePrize : null;
}

module.exports = {
    getLeaguePrize
};
