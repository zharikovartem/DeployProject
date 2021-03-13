import { Form, Field, FormikProps } from 'formik'
import React, { ReactNode, useState, useEffect } from 'react'
import { AntCheckbox, AntInput, AntSelect } from '../../../../../../../utils/Formik/CreateAntField'
import { validateRequired } from '../../../../../../../utils/Formik/ValidateFields'
import {SelectOptionType} from '../../../../../../../Types/types'
import { Button, Checkbox, Input, TreeSelect } from 'antd'
import { ModelsType } from '../../../../../../../api/projectAPI'
import RequestItem from './RequestItem'
import ResponseItem from './ResponseItem'

export type RequestType = {
    label: string,
    type: string,
    name: string,
    id: number
}

export type ResponreItemsType = {
    key: string,
    variable: string,
}

export type ResponseType = {
    type: 'Response' | 'method' | '',
    methodId?: number,
    responreitems?: Array<ResponreItemsType>
}

const ControllerMethodsForm: ((props: FormikProps<{}>) => ReactNode) = (props) => {
    // @ts-ignore
    const [request, setRequest] = useState<Array<RequestType>>(props.initialValues.request !== undefined ? props.initialValues.request : [])
    // @ts-ignore
    const [isRequest, setIsRequest] = useState(props.initialValues.request && props.initialValues.request.length !== 0 ? true : false)

    const [response, setResponse] = useState<ResponseType | undefined>()
    const [isResponse, setIsResponse] = useState(false)

    const [body_actions, setBody_actions] = useState()
    const [isBody_actions, setIsBody_actions] = useState(false)
    
    const [value, setValue] = useState(undefined)

    useEffect( () => {
        // @ts-ignore
        setRequest(props.initialValues.request !== undefined ? props.initialValues.request : [])
        // @ts-ignore
        setIsRequest(props.initialValues.request && props.initialValues.request.length !== 0 ? true : false)
    },[props.initialValues])

    const onRequest = (val: any) => {
        console.log(val.target.checked)
        console.log(request)

        if (val.target.checked) {
            if (request!==undefined && request.length === 0) {

            }
        }

        if (request!==undefined && request.length === 0) {
            console.log('onAddRequest')
            onAddRequest()
        } else {
            console.log('setRequest')
            setRequest([])
        }
        setIsRequest(!isRequest)
    }

    const onAddRequest = () => {
        console.log(request)
        let newRequest = [...request]

        newRequest.push({
            label: 'param '+ (request.length+1),
            type: '',
            name: '',
            id: request.length
        })
        setRequest(newRequest)
        props.setValues({...props.values, request: newRequest})
    }

    const onDeleteRequest = () => {
        let newRequest = [...request]
        newRequest.pop()
        setRequest(newRequest)
        if (newRequest.length === 0) {
            setIsRequest(false)
        }
        props.setValues({...props.values, request: newRequest})
    }

    const onResponse = () => {
        setIsResponse(!isResponse)
        console.log('response: ', response)
        if (!response) {
            setResponse({
                type: ''
            })
        } else {
            setResponse(undefined)
        }
    }

    const onBodyActions = () => {
        setIsBody_actions(!isBody_actions)
    }

    const onAddResponse = () => {

    }

    const onRowChange = (id: number, type: string, name: string) => {
        let requestCopy = [...request]

        for (let index = 0; index < request.length; index++) {
            const element = request[index];
            if (element.id === id) {
                requestCopy[index] = {...element, name: name, type: type}
            }
        }
        setRequest(requestCopy)
        props.setValues({...props.values, request: requestCopy})
    }

    const setResponseValues = (responseValues: ResponseType) => {
        console.log('setResponseValues:', responseValues)
        props.setValues({...props.values, response: responseValues})
    }

    console.log('props.initialValues: ',props.initialValues)
    console.log(response)

    if (response !== undefined && response.type !== undefined) {
        console.log('show response')
    }

    return (
        <Form
            className="form-container"
            onSubmit={props.handleSubmit}
        >
            <Field
                component={AntInput}
                name="name"
                type="text"
                label="Method name"
                validate={validateRequired}
                submitCount={props.submitCount}
                hasFeedback
            />
            <Field
                component={AntSelect}
                name="rest_type"
                type="select"
                label="REST Type"
                selectOptions={RestTypeOtions}
            /> 

            <div className="ant-row ant-form-item ">
                <div className="ant-col ant-form-item-label pr-2">Request:</div>
                <div className="ant-col ant-form-item-control">
                    <Checkbox onChange={onRequest} checked={isRequest}></Checkbox>
                </div>
            </div>

            {request && request.length>0 ? 
                request.map( (item: RequestType) => {
                    return <RequestItem key={item.id} item={item} initialValues={props.initialValues} onRowChange={onRowChange}/>
                })
            :
                null
            }
            {request && request.length>=1 ? 
            <div className="my-2">
                <Button className="mr-3" type="primary" size="small" onClick={onAddRequest}>Add</Button> 
                <Button className="mr-3" type="primary" size="small" onClick={onDeleteRequest}>del</Button>
            </div>
            : null}

            <div className="ant-row ant-form-item">
                <div className="ant-col ant-form-item-label pr-2">body_actions:</div>
                <div className="ant-col ant-form-item-control">
                    <Checkbox onChange={onBodyActions} checked={isBody_actions}></Checkbox>
                </div>
            </div>

            <div className="ant-row ant-form-item ">
                <div className="ant-col ant-form-item-label pr-2">Response:</div>
                <div className="ant-col ant-form-item-control">
                    <Checkbox onChange={onResponse} checked={isResponse}></Checkbox>
                </div>
            </div>

            {response !== undefined && response.type !== undefined ? 
                <ResponseItem 
                    responseInit={response} 
                    initialValues={props.initialValues}
                    setResponseValues={setResponseValues}
                />
            :
            null
            }

            <Field
                component={AntCheckbox}
                name="isMiddleware"
                type="checkbox"
                label="isMiddleware"
                submitCount={props.submitCount}
            />

            <div className="submit-container">
                <button className="ant-btn ant-btn-primary" type="submit">
                    Save
                </button>
            </div>

        </Form>
    )
}

export default ControllerMethodsForm

const RestTypeOtions = [
    {
        name: 'GET',
        value: 'get'
    },
    {
        name: 'POST',
        value: 'post'
    },
    {
        name: 'PUT',
        value: 'put'
    },
    {
        name: 'DELETE',
        value: 'delete'
    },
]