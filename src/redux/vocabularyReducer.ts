
import { Dispatch } from 'redux'
import { vocabularyAPI, VocabularyType, WordType } from './../api/vocabularyAPI'
import { UserType } from './authReducer'
import { BaseThunkType, InferActionsTypes } from './store'

export type InitialStateType = {
    vocabularyList: Array<WordType>,
    part: number,
    count: number,
    toLern: Array<WordType>,
    learningTarget?: WordType
}

let initialState: InitialStateType = {
    vocabularyList: [],
    part: 1,
    count: 0,
    toLern: [],
}

const vocabularyReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'VOCABULARY/SET_TO_LERN':
            return{
                ...state,
                toLern: action.toLern
            }
        case 'SN/VOCABULARY/SET_VOCABULARY_LIST':
            // console.log(action.vocabularyList[0])
            return { 
                ...state, 
                vocabularyList: action.vocabularyList, 
                part: action.part, 
                count: action.count,
                // toLern: action.toLern,
                learningTarget: action.vocabularyList[0]
            }

        case 'SN/VOCABULARY/SET_LEARNING_TARGET':
            // console.log(action.learningTarget ? action.learningTarget.id : null)
            return{
                ...state,
                learningTarget: action.learningTarget
            }

        case 'SN/VOCABULARY/SET_VOCABULARY_LIST2':
            return{
                ...state,
                vocabularyList: action.vocabularyList, 
            }

        default:
            return state
    }
}

export const actions = {
    setVocabularyList: (vocabularyList: Array<WordType>, part: number, count: number, toLern: Array<VocabularyType>) => 
    ({ type: 'SN/VOCABULARY/SET_VOCABULARY_LIST', vocabularyList, part, count, toLern } as const),
    setLerningTarget: (learningTarget: WordType) => ({type: 'SN/VOCABULARY/SET_LEARNING_TARGET', learningTarget} as const),
    setVocabularyList2: (vocabularyList: Array<WordType>) => 
    ({ type: 'SN/VOCABULARY/SET_VOCABULARY_LIST2', vocabularyList } as const),
    setToLern: (toLern: Array<WordType>) =>({type: 'VOCABULARY/SET_TO_LERN', toLern} as const),
}

export const getVocabularyList = (part: number): ThunkType => {
    return async (dispatch, getState) => {
        let response = await vocabularyAPI.getVocabularyPart(part)
        dispatch( actions.setVocabularyList(response.data.englishWords, Number(response.data.part), Number(response.data.count), response.data.toLern) )
    }
}

export const updateVocabulary = (values: any, vocabularyId: number): ThunkType => {
    return async (dispatch, getState) => {
        let response = await vocabularyAPI.updateVocabulary(values, vocabularyId)
        console.log(response)
    }
}

export const checkTestResult = (values: any, wordId: number): ThunkType => {
    return async (dispatch, getState) => {
        let response = await vocabularyAPI.checkTestResult(values, wordId)
    }
}

export const getWordsToLern = ():ThunkType => {
    return async (dispatch, getState) => {
        let response = await vocabularyAPI.getWordsToLern()
        dispatch(actions.setToLern(response.data.toLearn))
    }
}

export const skipWord = (wordId: number):ThunkType => {
    return async (dispatch, getState) => {
        let response = await vocabularyAPI.skipWord(wordId)
        console.log(response)
    }
}

export default vocabularyReducer

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
export type DispatchType = Dispatch<ActionsTypes>