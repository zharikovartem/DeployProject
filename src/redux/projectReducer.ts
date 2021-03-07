import { BaseThunkType, InferActionsTypes } from "./store"
import { projectAPI, backendAPI, BackendType, modelsAPI, getModelsListResponseType, ModelsType, controllersAPI, getControllersListResponseType } from './../api/projectAPI'
import { Dispatch } from "react"

type backendDataType = {
    created_at: string,
    deleted_at: string,
    updated_at: string,
    id: number,
    name: string,
}

export type ProjectItemType = {
    backend_id: number,
    created_at: string,
    deleted_at: string,
    frontend_id: number,
    id: number,
    name: string,
    updated_at: string,
    backendData?: backendDataType
}

export type InitialStateType = {
    projectList: Array<ProjectItemType>,
    isProjectLoaded: boolean,
    modelsList: Array<ModelsType>,
    controllersList: Array<any>
}

let initialState:InitialStateType = {
    projectList: [],
    isProjectLoaded: false,
    modelsList: [],
    controllersList: []
}

const projectReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/PROJECT/SET_CONTROLLERS_LIST':
            return ({...state, controllersList: action.controllersList})

        case 'SN/PROJECT/SET_MODELS_LIST':
            return ({...state, modelsList: action.modelsList})

        case 'SN/PROJECT/SET_PROJECT_LIST':
            return { ...state, projectList: action.projectList }

        case 'SN/PROJECT/SET_IS_LOADED':
            return {...state, isProjectLoaded: action.isLoaded}

        case 'SN/PROJECT/SET_BACKEND_DATA':
            // selector
            return {...state, projectList: state.projectList.map( item => {
                if (action.projectId === item.id) {
                    item.backendData = action.backendData
                    return item
                } else {
                    return item
                }
            })}


        default:
            return state
    }
}

export const actions = {
    setProjectList: (projectList: Array<any>) => ({ type: 'SN/PROJECT/SET_PROJECT_LIST', projectList } as const),
    setIsLoaded: (isLoaded: boolean) => ({type: 'SN/PROJECT/SET_IS_LOADED', isLoaded} as const),
    setBackendData: (projectId: number ,backendData: backendDataType) => ({type: 'SN/PROJECT/SET_BACKEND_DATA', backendData, projectId} as const),
    setModelsList: (modelsList: Array<ModelsType>) => ({type: 'SN/PROJECT/SET_MODELS_LIST', modelsList} as const),
    setControllersList: (controllersList: Array<any>) => ({type: 'SN/PROJECT/SET_CONTROLLERS_LIST', controllersList} as const),
}

export const getProjectList = (): ThunkType => {
    return async (dispatch, getState) => {
        const response = await projectAPI.getProjects()
        if (response !== undefined && response !== null) {
            dispatch(actions.setIsLoaded(true))
            dispatch(actions.setProjectList(response.data.projects))
        } else {
            // add error message
        }
    }
}

export const getBackendData = (projectId: number): ThunkType => {
    return async (dispatch, getState) => {
        const response = await projectAPI.getBackendData(projectId)
        if (response !== undefined && response !== null) {
            dispatch(actions.setBackendData(projectId, response.data.Backend[0]))
            // dispatch(actions.setProjectList(response.data.projects))
        } else {
            // add error message
        }
    }
}

export const updateBackend = (values: BackendType, backendId: number): ThunkType => {
    return async (dispatch, getState) => {
        const response = await backendAPI.updateBackend(values, backendId)
        console.log(response)
    }
}

export const getModelsList = (backendId: number):ThunkType => {
    return async (dispatch, getState) => {
        const response: getModelsListResponseType = await modelsAPI.getModelsList(backendId)
        console.log(response.data.models)
        dispatch(actions.setModelsList(response.data.models))
    }
}

export const updateModel = (values: ModelsType, modelId: number):ThunkType => {
    return async (dispatch, getState) => {
        const response: any = await modelsAPI.updateModel(values, modelId)
        console.log(response)
        dispatch(actions.setModelsList(response.data.models))
    }
}

export const createModel = (values: ModelsType):ThunkType => {
    return async (dispatch, getState) => {
        const response: any = await modelsAPI.createModel(values)
        console.log(response)
        dispatch(actions.setModelsList(response.data.models))
    }
}

export const getControllersList = (backendId: number):ThunkType => {
    return async (dispatch, getState) => {
        const response: getControllersListResponseType = await controllersAPI.getControllersList(backendId)
        console.log(response.data)
        dispatch(actions.setControllersList(response.data.controllers))
    }
}

export const createController = (values: any):ThunkType => {
    return async (dispatch, getState) => {
        const response: any = await controllersAPI.createController(values)
        console.log(response)
        dispatch(actions.setControllersList(response.data.controllers))
    }
}

export default projectReducer

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
export type DispatchType = Dispatch<ActionsTypes>