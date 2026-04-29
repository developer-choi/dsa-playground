# 음식 주문 분석

출처: 기업 코딩테스트

## 문제 설명

유저가 주문한 음식 데이터를 이용해 음식을 가장 다양하게 주문한 유저는 누구인지 알아보려 합니다. 유저는 주문한 음식 중 같은 음식을 여러 번 주문할 수 있습니다. 예를 들어 음식 주문 데이터가 다음과 같은 경우

["alex pizza pasta", "alex pizza pizza", "bob noodle sandwich pasta", "bob steak noodle"]

"alex"는 "pizza", "pasta" 2가지 메뉴를 주문했습니다.
"bob"은 "pasta", "noodle", "sandwich", "steak" 4가지를 주문했습니다.
따라서 이 유저가 주문한 음식의 종류는 4개가 가장 많습니다.

유저가 주문한 음식 데이터를 담은 배열 orders가 매개변수로 주어질 때, 가장 많은 종류의 음식을 주문한 유저의 아이디를 배열에 담아 return 하도록 solution 함수를 완성해주세요. 단, 그런 유저가 여러 명이 있을 경우 해당 유저들의 아이디를 알파벳순으로 정렬한 배열을 return 하면 됩니다.

## 제한사항

- 1 ≤ orders의 길이 ≤ 200,000
- orders의 원소는 음식 주문 데이터가 "유저ID 음식1 음식2 ..." 순서로 들어있습니다.
- 유저는 한 번에 최대 5개까지 음식을 주문할 수 있습니다.
- 유저 ID와 음식 이름은 공백(스페이스 바) 하나로 구분해서 주어집니다.
- 유저 ID와 음식 이름은 길이가 1 이상 10 이하인 문자열이며, 알파벳 소문자로만 이루어져 있습니다.

## 입출력 예

| orders | result |
|--------|--------|
| ["alex pizza pasta", "alex pizza pizza", "bob noodle sandwich pasta", "bob steak noodle"] | ["bob"] |
| ["alex pizza pasta steak", "bob noodle sandwich pasta", "chol pizza sandwich pizza", "alex pizza pasta steak"] | ["alex", "bob"] |

### 예제 설명

예제 1: 문제의 예시와 같습니다.

예제 2: "alex"와 "bob"은 세 종류를 주문했으며, "chol"는 두 종류를 주문했습니다. 따라서 오름차순으로 정렬하여 ["alex", "bob"]을 return하면 됩니다.
