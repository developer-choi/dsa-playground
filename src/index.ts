function getCount(arr: number[]) {
  let totalCount: number[] = [];

  for (let i = 0; i < arr.length; i++) {
    let count = 0;

    for (let j = i; j < arr.length; j++) {
      const original = arr[j];
      const target = arr[i];

      if (j !== i && (original % target === 0 || target % original === 0)) {
        count++;
      }
    }

    totalCount.push(count);
  }

  return totalCount.reduce((a, b) => a + b);
}

function rankVideos(videos) {
  return videos.map((video, order) => ({...video, order})).sort((a, b) => b.views - a.views).map((video, rank) => ({...video, rank: rank + 1})).sort((a, b) => a.order - b.order);
}