import {getToken, instance} from './api'

export type ProjectResponseType = {
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
            console.log('projectAPI.getProjects:', response)
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
            console.log('projectAPI.getBackendData:', response)
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
        fieldParam?: string
}

export type ModelsType = {
    backend_id?: number,
    created_at?: string,
    deleted_at?: string,
    updated_at?: string,
    fields: string //| Array<FieldType>,
    id: number,
    name: string,
    db: boolean,
    soft_delete: boolean
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
            console.log('modelsAPI.getModelsList', response)
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

export type ControllersType = {
    id: number,
    name: string,
    folder: string,
    model_id: Array<number>,
    backend_id: number,
    isResource: boolean,
    models: Array<ModelsType>
}

export type getControllersListResponseType = {
    // data: {
        controllers: Array<ControllersType>
    // }
}

export const controllersAPI = {
    getControllersList(backendId: number) {
        getToken()
        return instance.get<getControllersListResponseType>(`currentControllers/`+backendId)
        .then(response => {
            console.log('controllersAPI.getControllersList', response)
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
        return instance.post<getControllersListResponseType>(`controllers`, values)
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
    },
    updateController(values: ControllersType, controllerId: number) {
        console.log(values)
        console.log('controllerId', controllerId)
        return instance.put<getControllersListResponseType>(`controllers/${controllerId}`, values)
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
}