# 음식 주문 분석

출처: 기업 코딩테스트

## 문제 설명

각 유저의 음식 주문 기록이 주어질 때, 가장 많은 종류의 음식을 주문한 유저 목록을 알파벳 오름차순으로 반환한다.

각 주문은 "유저ID 음식1 음식2 ..." 형태의 문자열이며, 같은 유저가 같은 음식을 여러 번 주문해도 종류는 1개로 센다.

## 제한사항

- orders의 길이는 1 이상 200,000 이하
- 유저ID와 음식 이름은 소문자 알파벳으로 이루어진 1자 이상 10자 이하 문자열
- 한 번 주문에 최대 5개의 음식을 포함할 수 있다

## 입출력 예

| orders | result |
|--------|--------|
| ["alex pizza pasta", "alex pizza pizza", "bob noodle sandwich pasta", "chol pizza sandwich pizza", "alex pizza pasta steak"] | ["alex", "bob"] |
| ["alex pizza pasta", "alex pizza pizza", "chol pizza sandwich pizza", "bob noodle sandwich pasta", "bob steak"] | ["bob"] |

### 예제 설명

예제 1: alex는 pizza, pasta, steak 총 3종류, bob은 noodle, sandwich, pasta 총 3종류, chol은 pizza, sandwich 총 2종류 → alex와 bob이 공동 최다. 알파벳 오름차순으로 ["alex", "bob"].

예제 2: alex는 pizza, pasta 총 2종류, chol은 pizza, sandwich 총 2종류, bob은 noodle, sandwich, pasta, steak 총 4종류 → bob이 최다. ["bob"].
