import { UserType } from '../redux/authReducer'
import {instance, getToken} from './api'

export type VocabularyType = {
    eng_value: string,
    eng_sound: string | null,
    rus_value: string,

}

type GetVocabularyPartType = {
    vocabularyList: Array<VocabularyType>
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
    }
}