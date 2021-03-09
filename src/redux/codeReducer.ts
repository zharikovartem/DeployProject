import { BaseThunkType, InferActionsTypes } from "./store"
import { projectAPI, backendAPI, BackendType, modelsAPI, getModelsListResponseType, ModelsType, controllersAPI, getControllersListResponseType } from './../api/projectAPI'
import { Dispatch } from "react"

export type codeTypeList = 'model'| 'controller'

export type InitialStateType = {
    isModalVisible: boolean,
    codeRowsArray: Array<any>,
    codeType: codeTypeList,
    codeTargetName: string,
    codeData?: any // данные для формирования
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
            return {...state, isModalVisible: action.isShow, codeRowsArray: action.codeRowsArray, }
            // return {...state, isModalVisible: action.isShow, codeRowsArray: action.codeRowsArray, codeTargetName: action.codeTargetName}
    
        case 'SN/CODE/SET_CODE_TARGET':
            console.log(action.codeTargetName)
            console.log(action.codeData)
            return {...state, codeTargetName: action.codeTargetName, codeData: action.codeData}

        default:
            return state
    }
}

export const actions = {
    setShowCodeModal: (
        isShow: boolean, 
        codeType: codeTypeList, 
        codeRowsArray: Array<any>, 
        codeTargetName: string,
        codeData: Array<any>
        ) => ({ type: 'SN/CODE/SET_SHOW_CODE_MODAL', isShow, codeType, codeRowsArray, codeTargetName, codeData} as const),
    setCodeTarget: (codeTargetName: string, codeData: any) => ({ type: 'SN/CODE/SET_CODE_TARGET', codeTargetName, codeData} as const),
}

export default codeReducer

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
export type DispatchType = Dispatch<ActionsTypes>