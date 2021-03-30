import { Dispatch } from 'redux'
import { ProviderAPI,  ProviderType } from '../api/ProviderAPI'
import { vocabularyAPI, VocabularyType, WordType } from './../api/vocabularyAPI'
import { UserType } from './authReducer'
import { BaseThunkType, InferActionsTypes } from './store'

export type InitialStateType = {
    providersList: Array<ProviderType>
}

let initialState: InitialStateType = {
    providersList: []
}

const providerReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/PROVIDER/SET_PROVIDER_LIST':
            return{
                ...state,
                providersList: action.providersList
            }

        default:
            return state
    }
}

export const actions = {
    setProvidersList: (providersList: Array<ProviderType>) => ({type: 'SN/PROVIDER/SET_PROVIDER_LIST', providersList} as const),
}

export const getProvidersList = (): ThunkType => {
    return async (dispatch, getState) => {
        let response = await ProviderAPI.getProvidersList()
        dispatch( actions.setProvidersList(response.data.providersList) )
    }
}

export const createNewProvider = (values: any): ThunkType => {
    return async (dispatch, getState) => {
        let response = await ProviderAPI.createNewProvider(values)
        dispatch( actions.setProvidersList(response.data.providersList) )
    }
}

export const updateProvider = (values: any, providerId: number): ThunkType => {
    return async (dispatch, getState) => {
        let response = await ProviderAPI.updateProvider(values, providerId)
        dispatch( actions.setProvidersList(response.data.providersList) )
    }
}

export default providerReducer

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
export type DispatchType = Dispatch<ActionsTypes>