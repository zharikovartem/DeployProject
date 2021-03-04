import {getToken, instance} from './api'

type ProjectResponseType = {
    projects: [
        {
            backend_id: number,
            created_at: string,
            deleted_at: string,
            frontend_id: number,
            id: number,
            name: string,
            updated_at: string,
        }
    ]
}

export type BackendType = {
    created_at?: string,
    deleted_at?: string,
    updated_at?: string,
    id?: number,
    name: string,
    url: string,
    ip: string,
    login: string,
    password: string,
    folder: string,
}

export type getBackendDataResponseType = {
    Backend: Array<BackendType>
}

export const projectAPI = {
    getProjects() {
        getToken()
        return instance.get<ProjectResponseType>(`project`)
        .then(response => {
            console.log(response)
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
    getBackendData(projectId: number) {
        getToken()
        return instance.get<getBackendDataResponseType>(`project/`+projectId)
        .then(response => {
            console.log(response)
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
    }
    
}

export const backendAPI = {
    updateBackend(values: BackendType, backendId: number) {
        getToken()
        return instance.put<BackendType>(`backend/${backendId}`, values)
        .then(response => {
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
    }
}

export type FieldType = {
        name: string,
        type: string,
        isPrimary: boolean,
        description: string,
        isNulleble: boolean,
}

export type ModelsType = {
    backend_id?: number,
    created_at?: string,
    deleted_at?: string,
    updated_at?: string,
    fields: string //| Array<FieldType>,
    id?: number,
    name: string,
}

export type getModelsListResponseType = {
    data: {
        models: Array<ModelsType>
    }
}

export const modelsAPI = {
    getModelsList(backendId: number) {
        getToken()
        return instance.get<getModelsListResponseType>(`models/`+backendId)
        .then(response => {
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
    updateModel(values: ModelsType, modelId: number) {
        console.log(values)
        console.log('modelId', modelId)
        return instance.put<getModelsListResponseType>(`models/${modelId}`, values)
        .then(response => {
            console.log(response)
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
    createModel(values: ModelsType) {
        return instance.post<getModelsListResponseType>(`models`, values)
        .then(response => {
            console.log(response)
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
    }
}

export type getControllersListResponseType = {
    data: {
        controllers: Array<any>
    }
}

export const controllersAPI = {
    getControllersList(backendId: number) {
        getToken()
        return instance.get<getControllersListResponseType>(`controllers/`+backendId)
        .then(response => {
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
    createController(values: any) {

    }
}