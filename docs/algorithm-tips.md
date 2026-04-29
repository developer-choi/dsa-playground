# Algorithm Tips

- **중앙값 공식**: `Math.floor((start + end) / 2)` — Binary Search, Quick Sort 등에서 사용

- **Auxiliary Space 줄이기**: 배열 대신 index/count 변수 사용. 굳이 배열을 통해 계산할 필요 없이 변수로 대체하면 공간 절약.

- **Math.max() 주의**: 빈 배열 들어가면 `-Infinity`가 나옴

- **`Math.max(...arr)` / spread 인자 펼치기 함정**: 배열 길이가 크면 `RangeError: Maximum call stack size exceeded` 발생 가능. spread는 원소를 각각 함수 인자로 펼치는데, JS 엔진의 인자 개수 한계(V8 6.5만~수십만, JSC 약 6.5만)에 걸림. 시간복잡도는 동일하지만 인터페이스 레벨 제약. 큰 배열은 `arr.reduce((a, b) => Math.max(a, b), -Infinity)`로 대체. 같은 함정: `Math.min(...arr)`, `arr.push(...big)`, `fn.apply(null, big)`. 멘탈 모델: **"배열을 인자로 펼치는 모든 연산은 N이 크면 위험"**.

- **reverse() 구현**: 스왑을 통해 절반만 순회해서 구현 가능

- **Linear Search 목표**:
  1. 선형순환을 1번만 하는 것 (2회 이상 순회하지 않도록)
  2. 절반만 순회하면 더 좋음
  3. 기왕이면 Auxiliary Space 쓰지 않기

- **순회 1회로 max + 후보 동시 수집**: "max 구하기 → 같은 값 필터링" 두 번 순회를 한 번으로 합치는 패턴. 새 max 발견 시 **후보 배열을 새 배열로 리셋**, 동률이면 push. 핵심은 "새 최대 등장 = 기존 후보 무효화" 라는 발상.
  ```ts
  let maxCount = -Infinity;
  let candidates: string[] = [];
  for (const item of items) {
    if (item.value > maxCount) {
      maxCount = item.value;
      candidates = [item.id];   // 새 max → 후보 리셋
    } else if (item.value === maxCount) {
      candidates.push(item.id); // 동률 → 후보 추가
    }
  }
  ```

- **Binary Search 범위 설정 팁**: 최소·최대값 결정할 때 연산을 해서라도 최대한 구체적으로 잡을 필요가 없다. 그 구간 안에 정답이 포함만 되면 된다는 마인드로 하면 됨. "log n"은 정말 엄청나게 빠르기 때문.
