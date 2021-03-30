import { NewTaskDataType, TaskType } from '../Types/types'
import {getToken, instance} from './api'

export type ProviderType = {
    name: string,
    descriptions: string,
    id: number
}

type GetProvidersListResponeType = {
    providersList: Array<ProviderType>
}

export const ProviderAPI = {
    getProvidersList() {
        return instance.get<GetProvidersListResponeType>(`providers`)
        .then(response => {
            console.log('getProvidersList: ', response)
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
    },
    createNewProvider(values: any) {
        return instance.post<any>(`providers`, values)
        .then(response => {
            console.log('createNewProvider: ', response)
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
    updateProvider(values: any, providerId: number) {
        getToken()
        return instance.put<any>(`providers/${providerId}`, values)
        .then(response => {
            console.log('updateProvider', response)
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
    },
    deleteProvider(providerId: number) {

    }
}