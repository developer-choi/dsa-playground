export function groupWords(words: string[]): string[][] {
  const map = new Map<string, string[]>();

  for (const word of words) {
    const key = getKey(word);
    const group = map.get(key);

    if (group) {
      group.push(word);
    } else {
      map.set(key, [word]);
    }
  }

  return [...map.values()];
}

/**
 * @example ('bcabca') ==> 'abc'
 */
function getKey(word: string): string {
  return [...new Set(word)].toSorted().join('');
}

const EXAMPLE = ['looped', 'poodle', 'lambs', 'balms', 'flow', 'wolf', 'tab', 'bat', 'may', 'amy', 'yam', 'student', 'students', 'studentssess', 'dog', 'god', 'cat', 'act'];
console.log(groupWords(EXAMPLE));
