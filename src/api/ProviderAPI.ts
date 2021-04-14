import {getToken, instance} from './api'

export type ProviderType = {
    name: string,
    descriptions: string,
    id: number,
    contacts?: Array<ContactType>
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






export type ContactType = {
    id?: number,
    name: string,
    phone: string,
    status: 'new' | 'old',
    Skype: any,
    Viber: any,
    Telegram: any,
    WhatsApp: any,
    providers_id?: number
}


export const ContactAPI = {
    getContactList() {
        getToken()
        return instance.get<GetProvidersListResponeType>(`contacts`)
        .then(response => {
            console.log('getProvidersList: ', response)
            return response.status === 200 ? response : null
        })
        .catch(err => {
            if (err.response) {
                console.log('getContactListERROR: ',err.response)
                return err.response
            } else if (err.request) {
            } else {
            }
            return null
        })
    },
    createNewContact(values: any) {
        getToken()
        return instance.post<any>(`contacts`, values)
        .then(response => {
            console.log('createNewProvider: ', response)
            return response.status === 200 ? response : null
        })
        .catch(err => {
            if (err.response) {
                console.log('createNewProvider ERROR: ',err.response)
                return err.response
            } else if (err.request) {
            } else {
            }
            return null
        })
    },
    updateContact(values: any, providerId: number) {
        getToken()
        return instance.put<any>(`contacts/${providerId}`, values)
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
    deleteContact(providerId: number) {

    }
}