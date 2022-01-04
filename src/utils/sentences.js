import replacer from '../data/replace.json';

export function matches(part, word) {
  if (!part) return false;

  if (part.toLowerCase() === word) {
    return true;
  }

  if (part.toLocaleString() === replacer[word]) {
    return true;
  }

  return false;
}

export function sentenceHasWord(sentence, word) {
  return sentence.findIndex(p => matches(p, word)) !== -1;
}

export function sentencesHaveWord(sentences, word) {
  for (const sentence of sentences) {
    if (sentenceHasWord(sentence, word)) {
      return true;
    }
  }

  return false;
}
