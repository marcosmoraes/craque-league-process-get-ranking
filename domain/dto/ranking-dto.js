class UserRankingDTO {
    constructor(userId, totalPoints, gamePoints, playerPoints, rank, prize) {
        this.userId = userId;
        this.totalPoints = totalPoints;
        this.gamePoints = gamePoints;
        this.playerPoints = playerPoints;
        this.rank = rank;
        this.prize = prize;
    }
}

class RankingDTO {
    constructor(userPoints) {
        this.userPoints = userPoints;
    }
}

module.exports = { UserRankingDTO, RankingDTO };
