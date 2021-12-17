export function sentenceHasWord(sentence, word) {
    return sentence.findIndex(p => p.toLowerCase() === word) !== -1
}

export function sentencesHaveWord(sentences, word) {
    for (const sentence of sentences) {
        if (sentenceHasWord(sentence, word)) {
            return true
        }
    }

    return false
}

