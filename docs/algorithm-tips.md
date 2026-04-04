# Algorithm Tips

- **중앙값 공식**: `Math.floor((start + end) / 2)` — Binary Search, Quick Sort 등에서 사용

- **Auxiliary Space 줄이기**: 배열 대신 index/count 변수 사용. 굳이 배열을 통해 계산할 필요 없이 변수로 대체하면 공간 절약.

- **Math.max() 주의**: 빈 배열 들어가면 `-Infinity`가 나옴

- **reverse() 구현**: 스왑을 통해 절반만 순회해서 구현 가능

- **Linear Search 목표**:
  1. 선형순환을 1번만 하는 것 (2회 이상 순회하지 않도록)
  2. 절반만 순회하면 더 좋음
  3. 기왕이면 Auxiliary Space 쓰지 않기

- **Binary Search 범위 설정 팁**: 최소·최대값 결정할 때 연산을 해서라도 최대한 구체적으로 잡을 필요가 없다. 그 구간 안에 정답이 포함만 되면 된다는 마인드로 하면 됨. "log n"은 정말 엄청나게 빠르기 때문.
