import { EloRatingInput, TeamfightMeanInput } from "./elo.model";

class EloService {
  probability(rating1: number, rating2: number) {
    return 1 / (1 + Math.pow(10, (rating1 - rating2) / 400));
  }

  rating({ rating1, rating2, score1, score2, k }: EloRatingInput) {
    const maxScore = Math.max(score1, score2);
    const outcome = (score1 - score2) / (2 * maxScore) + 0.5;

    const probability = this.probability(rating1, rating2);

    return rating1 + k * (outcome - probability);
  }

  teamAverageRating({ team }: TeamfightMeanInput) {
    const numMembers = team.participations.length;
    let averageRating = 0;

    team.participations.forEach((participation) => {
      averageRating += participation.player.rating;
    });

    return averageRating / numMembers;
  }

  kFactor(numMatchesPlayed: number, numTeamPlayers: number) {
    const mult = numTeamPlayers === 1 ? 2 : 1;
    return (800 / numMatchesPlayed) * mult;
  }
}

export const eloService = new EloService();
