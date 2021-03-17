import { Form, Field, FormikProps } from 'formik'
import React, { ReactNode, useState, useEffect } from 'react'
import { AntCheckbox, AntInput, AntSelect } from '../../../../../../../utils/Formik/CreateAntField'
import { validateRequired } from '../../../../../../../utils/Formik/ValidateFields'
import {SelectOptionType} from '../../../../../../../Types/types'
import { Button, Checkbox, Input, TreeSelect } from 'antd'
import { ModelsType } from '../../../../../../../api/projectAPI'
import RequestItem from './RequestItem'
import ResponseItem from './ResponseItem'
import TextArea from 'antd/lib/input/TextArea'

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
    methodName?: string,
    responseItems?: Array<ResponreItemsType>
}

const ControllerMethodsForm: ((props: FormikProps<{}>) => ReactNode) = (props) => {
    // @ts-ignore
    const [request, setRequest] = useState<Array<RequestType>>(props.initialValues.request !== undefined ? props.initialValues.request : [])
    // @ts-ignore
    const [isRequest, setIsRequest] = useState(props.initialValues.request && props.initialValues.request.length !== 0 ? true : false)

    // @ts-ignore
    const [response, setResponse] = useState<ResponseType | undefined>(props.initialValues.response)
    // @ts-ignore
    const [isResponse, setIsResponse] = useState(props.initialValues.response? true : false)
    // console.log(isResponse)

    // @ts-ignore
    const [body_actions, setBody_actions] = useState<string>(props.initialValues.body_actions)
    // @ts-ignore
    const [isBody_actions, setIsBody_actions] = useState(props.initialValues.body_actions ? true : false)
    
    const [value, setValue] = useState(undefined)

    useEffect( () => {
        // @ts-ignore
        // console.log('!!!!!!!!!!!!useEffect ControllerMethodsForm', props.initialValues.response.responseItems)
        // @ts-ignore
        setRequest(props.initialValues.request !== undefined ? props.initialValues.request : [])
        // @ts-ignore
        setIsRequest(props.initialValues.request && props.initialValues.request.length !== 0 ? true : false)
        // @ts-ignore
        setResponse(props.initialValues.response ? props.initialValues.response : undefined)
        // @ts-ignore
        setBody_actions(props.initialValues.body_actions ? props.initialValues.body_actions : '')
        // @ts-ignore
        setIsBody_actions(props.initialValues.body_actions ? true : false)
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
        // console.log(request)
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
        // console.log('setResponseValues:', responseValues)
        props.setValues({...props.values, response: responseValues})
    }

    console.log('props.initialValues: ',props.initialValues)
    // console.log(response)

    // if (response !== undefined && response.type !== undefined) {
    //     console.log('show response')
    // }

    const onKeyDown = (v: any) => {
        if (v.keyCode === 9) {
            v.preventDefault()

            const before = body_actions.substr(0, v.target.selectionEnd)
            const after = body_actions.substr(v.target.selectionEnd)

            setBody_actions(before+'    '+after)
            props.setValues({...props.values, body_actions: v.target.value})

            const newStart = v.target.selectionStart+4
            const newEnd = v.target.selectionEnd+4

            setTimeout( ()=> {
                v.target.selectionStart = newStart
                v.target.selectionEnd = newEnd
            }, 0)
            
        }
    }

    const onBodyChange = (v: any) => {
        setBody_actions(v.target.value)
        props.setValues({...props.values, body_actions: v.target.value})
    }

    // console.log(response)

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

            {isBody_actions ? 
                <TextArea 
                    onKeyDown={onKeyDown} 
                    // onBlur={onBlur} 
                    rows={4} 
                    value={body_actions}
                    onChange={onBodyChange}
                />
            : null }




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