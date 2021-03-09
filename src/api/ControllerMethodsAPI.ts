import {getToken, instance} from './api'

export type ControllerMethodsType = {
    id: number,
    controller_id: number,
    name: string,
    request: string,
    response: string,
    rest_type: 'get'|'post'|'put'|'delete',
    isMiddleware: boolean,
    body_actions: string,
}

export type GetControllerMethodsResponseType = {
    controllerMethods: Array<ControllerMethodsType>,
}

export const controllerMethodsAPI = {
    getControllerMethods() {
        getToken()
        return instance.get<GetControllerMethodsResponseType>(`controllerMethods`)
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