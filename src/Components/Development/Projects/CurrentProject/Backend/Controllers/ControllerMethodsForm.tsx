import { Form, Field, FormikProps } from 'formik'
import React, { ReactNode, useState, useEffect } from 'react'
import { AntCheckbox, AntInput, AntSelect } from '../../../../../../utils/Formik/CreateAntField'
import { validateRequired } from '../../../../../../utils/Formik/ValidateFields'
import {SelectOptionType} from '../../../../../../Types/types'
import { Button, Checkbox } from 'antd'

const ControllerMethodsForm: ((props: FormikProps<{}>) => ReactNode) = (props) => {
    const [request, setRequest] = useState<Array<string>>([])
    const [isRequest, setIsRequest] = useState(false)
    const [isResponse, setIsResponse] = useState(false)

    
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
        newRequest.push('param '+ (request.length+1) + ':' )
        setRequest(newRequest)
    }

    const onDeleteRequest = () => {
        let newRequest = [...request]
        newRequest.pop()
        setRequest(newRequest)
        if (newRequest.length === 0) {
            setIsRequest(false)
        }
    }

    const onResponse = () => {
        setIsResponse(!isResponse)
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
                hasFeedback
            />
            <Field
                component={AntSelect}
                name="rest_type"
                type="select"
                label="REST Type"
                selectOptions={RestTypeOtions}
            /> 
            
            {/* <Field
                component={AntCheckbox}
                name="isNulleble"
                type="checkbox"
                label="isNulleble"
                submitCount={props.submitCount}
            /> */}

            <div className="ant-row ant-form-item ">
                <div className="ant-col ant-form-item-label pr-2">Request:</div>
                <div className="ant-col ant-form-item-control">
                    <Checkbox onChange={onRequest} checked={isRequest}></Checkbox>
                </div>
            </div>

            {request.length>0 ? 
                request.map( (item: any) => {
                    return (
                    <div key={item}>
                        {item}
                        
                    </div>
                    )
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
                    <Checkbox onChange={()=>{}} checked={isResponse}></Checkbox>
                </div>
            </div>

            <Field
                component={AntCheckbox}
                name="isMiddleware"
                type="checkbox"
                label="isMiddleware"
                submitCount={props.submitCount}
            />

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