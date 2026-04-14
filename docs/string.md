## 숫자를 문자열로 변환할 때 leading zero 소실

숫자 ⇒ 문자열로 만들 때 주의해야하는건, 001 ⇒ 1 이라는 것.

참고: https://github.com/developer-choi/dsa-playground/commit/d2c41c7895fa02eec1b5fa938f77e6b0ad77dfb9

## 문자열 → 숫자 변환 시 leading zero 소실

문자열 ⇒ 숫자로 변환할 때도 마찬가지: `"0001"` → `1`, `"000"` → `0`.

## `Number()`로 숫자 여부 체크할 때 예외 주의

`Number(x)`가 NaN인지로 숫자 여부를 판별하는 건 예외가 많다.
