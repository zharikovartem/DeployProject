import { UserType } from '../redux/authReducer'
import {instance, getToken} from './api'

export type VocabularyType = {
    eng_value: string,
    eng_sound: string | null,
    rus_value: string,
    part_of_speech: string,
    id: number,
    status: string | null
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
    word_number: string
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

export const vocabularyAPI = {
    getVocabularyPart(part: number) {
        getToken()
        return instance.get<GetVocabularyPartType>(`getVocabularyPart/`+part)
        .then(response => {
            console.log('getVocabularyPart: ', response)
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
    checkTestResult(values: any, wordId: number) {
        console.log('wordId: ', wordId)
        getToken()
        return instance.post<any>(`checkTestResult/${wordId}`, values)
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
}