export {};

// https://school.programmers.co.kr/learn/courses/30/lessons/17686
function solution(fileNames: string[]) {
  return fileNames.sort((a, b) => {
    const aResult = parseFileName(a);
    const bResult = parseFileName(b);

    if (aResult.head === bResult.head) {
      if (aResult.center === bResult.center) {
        return 0;
      } else {
        const aCenter = Number(aResult.center);
        const bCenter = Number(bResult.center);
        return aCenter - bCenter;
      }
    }

    if (aResult.head > bResult.head) {
      return 1;
    } else {
      return -1;
    }
  });
}

function parseFileName(filename: string): {head: string, center: string, tail: string} {
  const heads: string[] = [];
  const centers: string[] = [];
  const tails: string[] = [];
  let parsingStep: 'head' | 'center' | 'tail' = 'head';

  for (let char of filename) {
    if (parsingStep === 'head' && isNumber(char)) {
      parsingStep = 'center';
    }

    if (parsingStep === 'center' && !isNumber(char)) {
      parsingStep = 'tail';
    }

    switch (parsingStep) {
      case 'head':
        heads.push(char);
        break;
      case 'center':
        centers.push(char);
        break;
      case 'tail':
        tails.push(char);
        break;
    }
  }

  return {
    head: heads.join('').toLowerCase(),
    center: centers.join(''),
    tail: tails.join('')
  };
}

function isNumber(char: string) {
  return NUMERIC_CHARS.includes(char);
}

const NUMERIC_CHARS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

/*************************************************************************************************************
 * 입출력 예시 (문제)
 *************************************************************************************************************/
console.log(solution(['img12.png', 'img10.png', 'img02.png', 'img1.png', 'IMG01.GIF', 'img2.JPG']));
console.log(solution(['F-5 Freedom Fighter', 'B-50 Superfortress', 'A-10 Thunderbolt II', 'F-14 Tomcat']));
