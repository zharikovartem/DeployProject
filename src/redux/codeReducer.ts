import { BaseThunkType, InferActionsTypes } from "./store"
import { projectAPI, backendAPI, BackendType, modelsAPI, getModelsListResponseType, ModelsType, controllersAPI, getControllersListResponseType } from './../api/projectAPI'
import { Dispatch } from "react"

export type codeTypeList = 'model'| 'controller'

export type InitialStateType = {
    isModalVisible: boolean,
    codeRowsArray: Array<any>,
    codeType: codeTypeList,
    codeTargetName: string,
}

let initialState:InitialStateType = {
    isModalVisible: false,
    codeRowsArray: [],
    codeType: 'model',
    codeTargetName: ''
}

const codeReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/CODE/SET_SHOW_CODE_MODAL':
            console.log('SN/CODE/SET_SHOW_CODE_MODAL')
            return {...state, isModalVisible: action.isShow, codeRowsArray: action.codeRowsArray, codeTargetName: action.codeTargetName}
    
        default:
            return state
    }
}

export const actions = {
    setShowCodeModal: (isShow: boolean, codeType: codeTypeList, codeRowsArray: Array<any>, codeTargetName: string) => ({ type: 'SN/CODE/SET_SHOW_CODE_MODAL', isShow, codeType, codeRowsArray, codeTargetName} as const),
}

export default codeReducer

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
export type DispatchType = Dispatch<ActionsTypes>