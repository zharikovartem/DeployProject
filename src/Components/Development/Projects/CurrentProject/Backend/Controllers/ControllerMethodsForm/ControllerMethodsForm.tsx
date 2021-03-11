import { Form, Field, FormikProps } from 'formik'
import React, { ReactNode, useState, useEffect } from 'react'
import { AntCheckbox, AntInput, AntSelect } from '../../../../../../../utils/Formik/CreateAntField'
import { validateRequired } from '../../../../../../../utils/Formik/ValidateFields'
import {SelectOptionType} from '../../../../../../../Types/types'
import { Button, Checkbox, Input, TreeSelect } from 'antd'
import { ModelsType } from '../../../../../../../api/projectAPI'
import RequestItem from './RequestItem'

export type RequestType = {
    label: string,
    type: string,
    name: string,
    id: number
}

const ControllerMethodsForm: ((props: FormikProps<{}>) => ReactNode) = (props) => {
    // @ts-ignore
    const [request, setRequest] = useState<Array<RequestType>>(props.initialValues.request)
    const [isRequest, setIsRequest] = useState(false)
    const [response, setResponse] = useState<Array<string>>([])
    const [isResponse, setIsResponse] = useState(false)
    const [value, setValue] = useState(undefined)

    useEffect( () => {
        // @ts-ignore
        setRequest(props.initialValues.request)
    },[props.initialValues])

    const onRequest = (val: any) => {
        console.log(val)
        if (request.length === 0) {
            onAddRequest()
        } else {
            setRequest([])
        }
        setIsRequest(!isRequest)
    }

    const onAddRequest = () => {
        let newRequest = [...request]
        // newRequest.push('param '+ (request.length+1) + ':' )
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

    console.log(props.initialValues)

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

            {request.length>0 ? 
                request.map( (item: RequestType) => {
                    return <RequestItem item={item} initialValues={props.initialValues} onRowChange={onRowChange}/>
                })
            :
                null
            }
            {request.length>=1 ? 
            <div className="my-2">
                <Button className="mr-3" type="primary" size="small" onClick={onAddRequest}>Add</Button> 
                <Button className="mr-3" type="primary" size="small" onClick={onDeleteRequest}>del</Button>
            </div>
            : null}

            <div className="ant-row ant-form-item ">
                <div className="ant-col ant-form-item-label pr-2">Response:</div>
                <div className="ant-col ant-form-item-control">
                    <Checkbox onChange={onResponse} checked={isResponse}></Checkbox>
                </div>
            </div>

            <div className="ant-row ant-form-item ">
                <div className="ant-col ant-form-item-label pr-2">body_actions:</div>
                <div className="ant-col ant-form-item-control">
                    <Checkbox onChange={()=>{}} checked={false}></Checkbox>
                </div>
            </div>

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