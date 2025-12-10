export interface VideoRank {
  views: number;
  rank: number;
}

export function bruteForceVideoRanking(views: number[]): VideoRank[] {
  return views
    .map((views, order) => ({
      views,
      order
    }))
    .sort((a, b) => b.views - a.views).map((video, rank) => ({
      ...video,
      rank: rank + 1
    }))
    .sort((a, b) => a.order - b.order)
    .map(({views, rank}) => ({views, rank}));
}
