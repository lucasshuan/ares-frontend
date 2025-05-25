import { EloRatingInput } from "./elo.model";

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

  kFactor(matchesPlayedCount: number, teamPlayersCount: number) {
    const mult = teamPlayersCount === 1 ? 2 : 1;
    return (800 / matchesPlayedCount) * mult;
  }
}

export const eloService = new EloService();
