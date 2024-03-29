import {instance, getToken} from './api'

export type VocabularyType = {
    eng_value: string,
    eng_sound: string | null,
    rus_value: string,
    part_of_speech: string,
    id: number,
    status: string | null,
}

export type WordType = {
    conjugation: string,
    description: string,
    examples: string,
    gender: null
    id: number
    isBasic: boolean,
    isContain: boolean,
    languige: string,
    name: string,
    occurrence: number,
    part_of_speech: string | null
    relations: Array<WordType>
    word_number: string,
    pivot: {
        english_word_id: number,
        progress: string,
        status: "toLearn" | "learned",
        user_id: number,
    }
}

type GetVocabularyPartType = {
    vocabularyList: Array<VocabularyType>,
    englishWords: Array<WordType>,
    part: string,
    count: number,
    toLern: Array<VocabularyType>,
}

type UpdateVocabularyType = {
    vocabularyTarget: VocabularyType
}

export type CheckTestResultDataType = {
    result: string,
    checkMethod: 'ru_en_c'|'en_ru_c'|'ru_en_s'|'en_ru_s'|'ru_en_r'|'en_ru_r';
}

export const vocabularyAPI = {
    getVocabularyPart(part: number) {
        getToken()
        return instance.get<GetVocabularyPartType>(`getVocabularyPart/`+part)
        .then(response => {
            // console.log('getVocabularyPart: ', response)
            return response.status === 200 ? response : null
        })
        .catch(err => {
            if (err.response) {
                console.log(err.response)
                return err.response
            } else if (err.request) {
            } else {
            }
            return null
        })
    },
    updateVocabulary(values: any, vocabularyId: number) {
        getToken()
        return instance.put<UpdateVocabularyType>(`vocabulary/${vocabularyId}`, values)
        .then(response => {
            console.log(response)
            return response.status === 200 ? response : null
        })
        .catch(err => {
            if (err.response) {
                console.log(err.response)
                return err.response
            } else if (err.request) {
            } else {
            }
            return null
        })
    },
    checkTestResult(data: CheckTestResultDataType, wordId: number) {
        console.log('wordId: ', wordId)
        getToken()
        return instance.post<any>(`checkTestResult/${wordId}`, data)
        .then(response => {
            console.log('checkTestResult: ', response)
            return response.status === 200 ? response : null
        })
        .catch(err => {
            if (err.response) {
                console.log('checkTestResult ERROR: ', err.response)
                return err.response
            } else if (err.request) {
            } else {
            }
            return null
        })
    },
    //
    getWordsToLern() {
        getToken()
        return instance.get<GetVocabularyPartType>(`vocabulary`)
        .then(response => {
            console.log('getWordsToLern: ', response)
            return response.status === 200 ? response : null
        })
        .catch(err => {
            if (err.response) {
                console.log(err.response)
                return err.response
            } else if (err.request) {
            } else {
            }
            return null
        })
    },
    skipWord(wordId: number) {
        getToken()
        return instance.get<GetVocabularyPartType>(`skipWord/`+wordId)
        .then(response => {
            console.log('getWordsToLern: ', response)
            return response.status === 200 ? response : null
        })
        .catch(err => {
            if (err.response) {
                console.log(err.response)
                return err.response
            } else if (err.request) {
            } else {
            }
            return null
        })
    },
}