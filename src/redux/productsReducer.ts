import { BaseThunkType, InferActionsTypes } from "./store"
// import { projectAPI, backendAPI, BackendType, modelsAPI, getModelsListResponseType, ModelsType, controllersAPI, getControllersListResponseType, ControllersType } from './../api/projectAPI'
import {productsAPI, ProductType} from './../api/productsAPI'
import { Dispatch } from "react"
import { ControllerMethodsType, controllerMethodsAPI, GetControllerMethodsResponseType} from "../api/ControllerMethodsAPI"
import { AxiosResponse } from "axios"

export type InitialStateType = {
    productCatigoryList: Array<ProductType>
}

let initialState:InitialStateType = {
    productCatigoryList: []
}

const productReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/PRODUCT/SET_PRODUCT_CATEGORY_LIST':
            return ({...state, productCatigoryList: action.productCatigoryList })

        default:
            return state
    }
}

export const actions = {
    setProductList: (productCatigoryList: Array<ProductType>) => ({ type: 'SN/PRODUCT/SET_PRODUCT_CATEGORY_LIST', productCatigoryList } as const),
}

export const startCatalogParsing = (): ThunkType => {
    return async (dispatch, getState) => {
        const response = await productsAPI.startCatalogParsing()
        // if (response !== undefined && response !== null) {
        //     dispatch(actions.setIsLoaded(true))
        //     dispatch(actions.setProjectList(response.data.projects))
        // } else {
        //     // add error message
        // }
    }
}

export const getProductCategoryList = (): ThunkType => {
    return async (dispatch, getState) => {
        const response = await productsAPI.getProductCategoryList()
        dispatch(actions.setProductList(response.data))
    }
}

export const startCatalogItem = (catalogItemName: string): ThunkType => {
    return async (dispatch, getState) => {
        const response = await productsAPI.startCatalogItem(catalogItemName)
        // dispatch(actions.setProductList(response.data))
    }
}

export const startProductParamParsing = (catalogItemName: string): ThunkType => {
    return async (dispatch, getState) => {
        const response = await productsAPI.startProductParamParsing(catalogItemName)
        // dispatch(actions.setProductList(response.data))
    }
}

export const getProductDescriptions = (catalogItemName: string): ThunkType => {
    return async (dispatch, getState) => {
        const response = await productsAPI.getProductDescriptions(catalogItemName)
        // dispatch(actions.setProductList(response.data))
    }
}

export default productReducer

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
export type DispatchType = Dispatch<ActionsTypes>