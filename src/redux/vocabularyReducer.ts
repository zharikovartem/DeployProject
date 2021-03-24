
import { Dispatch } from 'redux'
import { vocabularyAPI, VocabularyType } from './../api/vocabularyAPI'
import { UserType } from './authReducer'
import { BaseThunkType, InferActionsTypes } from './store'

export type InitialStateType = {
    vocabularyList: Array<VocabularyType>,
    part: number,
    count: number,
}

let initialState: InitialStateType = {
    vocabularyList: [],
    part: 1,
    count: 0,
}

const vocabularyReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/USERS/SET_VOCABULARY_LIST':
            return { ...state, vocabularyList: action.vocabularyList, part: action.part, count: action.count}

        default:
            return state
    }
}

export const actions = {
    setVocabularyList: (vocabularyList: Array<VocabularyType>, part: number, count: number) => 
    ({ type: 'SN/USERS/SET_VOCABULARY_LIST', vocabularyList, part, count } as const),
}

export const getVocabularyList = (part: number): ThunkType => {
    return async (dispatch, getState) => {
        let response = await vocabularyAPI.getVocabularyPart(part)
        console.log(response)
        dispatch( actions.setVocabularyList(response.data.vocabularyList, Number(response.data.part), Number(response.data.count)) )
    }
}

export default vocabularyReducer

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
export type DispatchType = Dispatch<ActionsTypes>