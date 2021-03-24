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

type GetVocabularyPartType = {
    vocabularyList: Array<VocabularyType>,
    part: string,
    count: number,
    toLern: Array<VocabularyType>,
}

type UpdateVocabularyType = {
    vocabularyTarget: VocabularyType
}

export const vocabularyAPI = {
    getVocabularyPart(part: number) {
        return instance.get<GetVocabularyPartType>(`getVocabularyPart/`+part)
        .then(response => {
            console.log('getVocabularyPart: ', response)
            return response.status === 200 ? response : null
        })
        .catch(err => {
            if (err.response) {
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
    }
}