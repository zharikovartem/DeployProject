import { Dispatch } from 'redux'
import { ProviderAPI,  ProviderType, ContactAPI, ContactType } from '../api/ProviderAPI'
import { BaseThunkType, InferActionsTypes } from './store'

export type InitialStateType = {
    contactList: Array<ContactType>
}

let initialState: InitialStateType = {
    contactList: []
}

const contactReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/CONTACTS/SET_CONTACT_LIST':
            return{
                ...state,
                contactList: action.contactList
            }

        default:
            return state
    }
}

export const actions = {
    setContactList: (contactList: Array<ContactType>) => ({type: 'SN/CONTACTS/SET_CONTACT_LIST', contactList} as const),
}

export const getContactList = (): ThunkType => {
    return async (dispatch, getState) => {
        let response = await ContactAPI.getContactList()
        dispatch( actions.setContactList(response.data.providersList) )
    }
}

export const createNewContact = (values: any): ThunkType => {
    return async (dispatch, getState) => {
        let response = await ContactAPI.createNewContact(values)
        dispatch( actions.setContactList(response.data.providersList) )
    }
}

export const updateContact = (values: any, providerId: number): ThunkType => {
    return async (dispatch, getState) => {
        let response = await ContactAPI.updateContact(values, providerId)
        dispatch( actions.setContactList(response.data.providersList) )
    }
}

export default contactReducer

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
export type DispatchType = Dispatch<ActionsTypes>