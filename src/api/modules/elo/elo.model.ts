export interface EloRatingInput {
  rating1: number;
  rating2: number;
  score1: number;
  score2: number;
  k: number;
}

export interface TeamfightMeanInput {
  team: {
    id: string;
    score: number;
    participations: {
      player: {
        rating: number;
      };
    }[];
  };
}
