import replacer from '../data/replace.json'


console.log(replacer)

export function matches(part, word) {
    if (!part)
        return false;

    if (part.toLowerCase() === word) {
        return true;
    }

    if (part.toLocaleString() === replacer[word]) {
        console.log("replacer found")
        return true
    }

    return false;
    return part && (part.toLowerCase() === word || part.toLowerCase() === replacer[word])
}

export function sentenceHasWord(sentence, word) {
    return sentence.findIndex(p => matches(p, word)) !== -1
}

export function sentencesHaveWord(sentences, word) {
    for (const sentence of sentences) {
        if (sentenceHasWord(sentence, word)) {
            return true
        }
    }

    return false
}

