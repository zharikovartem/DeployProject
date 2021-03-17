import { Button, List, Modal } from 'antd'
import { Formik } from 'formik'
import React, { useState, useEffect } from 'react'
import { ControllerMethodsType, rest_typeType } from '../../../../../../api/ControllerMethodsAPI'
import { ModelsType } from '../../../../../../api/projectAPI'
import { ControllerMethodsPropsType } from './ControllerMethodsContainer'
import ControllerMethodsCode from './ControllerMethodsForm/ControllerMethodsCode'
import ControllerMethodsForm, { RequestType } from './ControllerMethodsForm/ControllerMethodsForm'

export type initialValuesType = {
    modelsList: Array<ModelsType>,
    controllerMethodsList: Array<ControllerMethodsType>,
    body_actions?: string
    name: string,
    rest_type?: rest_typeType,
    request?: Array<RequestType>,
    response?: any,
    id?: number
}

const ControllerMethods: React.FC<ControllerMethodsPropsType> = (props) => {

    let emptyInitialValues: initialValuesType = {
        modelsList: props.modelsList,
        name: '',
        controllerMethodsList: props.controllerMethodsList
    }

    const [methodData, setMethodData] = useState<ControllerMethodsType | null>(null)
    const [initialValues, setinitialValues] = useState<initialValuesType>(emptyInitialValues)
    const [modalTitle, setModalTitle] = useState<string>('Controller Method form')

    useEffect(() => {
        if (props.controllerMethodsList.length === 0) {
            console.log('getControllerMethodsList in useEffect')
            props.getControllerMethodsList()
        }
    }, [])

    // console.log('props.controllerMethodsList', props.controllerMethodsList)
        
    useEffect(() => {
        setinitialValues({
            ...initialValues,
            controllerMethodsList: props.controllerMethodsList
        })
        // emptyInitialValues.controllerMethodsList = props.controllerMethodsList
    }, [props.controllerMethodsList])

    const [isModalVisible, setIsModalVisible] = useState(false)

    const showMethod = (id: number) => {
        const target = props.controllerMethodsList.filter( (item) => item.id === id)[0]
        console.log('target of method', target)
        setModalTitle('Edit Controller Method '+ target.name)
        setMethodData({
            body_actions: target.body_actions,
            controller_id: target.controller_id,
            id: id,
            isMiddleware: false,
            name: target.name,
            request: target.request,
            response: target.response,
            rest_type: target.rest_type
        })
        setIsModalVisible(true)
        setinitialValues({
            ...initialValues,
            name: target.name,
            request: target.request ? JSON.parse(target.request) : [],
            response: target.response ? JSON.parse(target.response) : undefined,
            body_actions: target.body_actions,
            rest_type: target.rest_type,
            id: target.id
        })
    }

    const addMethod = () => {
        setinitialValues(emptyInitialValues)
        setModalTitle('Controller Method form')
        setIsModalVisible(true)
    }

    const onOk = () => {
        console.log('onOk')
        setIsModalVisible(false)
    }

    const onHandleSubmit = (values: initialValuesType) => {
        console.log(values)

        const controllerMethods: ControllerMethodsType = {
            body_actions: values.body_actions? values.body_actions : '',
            controller_id: 123,
            id: values.id ? values.id : 0,
            isMiddleware: false,
            name: values.name,
            request: JSON.stringify(values.request),
            response: JSON.stringify(values.response),
            rest_type: values.rest_type ? values.rest_type : null
        }

        console.log(controllerMethods)

        setMethodData(controllerMethods)

        if(values.id) {
            console.log('UPDATE: ', controllerMethods)
            props.updateControllerMethodsList(controllerMethods, values.id)
        } else {
            console.log('CREATE: ', controllerMethods)
            props.createControllerMethodsList(controllerMethods)
        }
    }

    console.log('initialValues: ', initialValues)

    return (
        <>
            <div className="w-100 d-flex flex-row-reverse">
                <Button type="primary" onClick={addMethod}>Add Method</Button>
            </div>

            {props.controllerMethodsList.length !== 0 ?
                <>
                    <List
                        className="mt-2"
                        header={<div>Controller Methods List:</div>}
                        // footer={<div>Footer</div>}
                        bordered
                        dataSource={props.controllerMethodsList}
                        renderItem={item => (
                            <List.Item
                                actions={[<a key="list-loadmore-edit" onClick={()=>{showMethod(item.id)}}>edit</a>, <a key="list-loadmore-more">code</a>]}
                            >
                                {/* {item.name} */}
                                <div className="row w-100">
                                    <div className="col-6">{item.name}</div>
                                    <div className="col-3">{item.rest_type}</div>
                                </div>
                            </List.Item>
                        )}
                    />
                </>
                :
                null
            }

            <Modal title={modalTitle} visible={isModalVisible} onOk={onOk} onCancel={() => { setIsModalVisible(false) }} width={1000}>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onHandleSubmit}
                    enableReinitialize={true}
                >
                    {ControllerMethodsForm}
                </Formik>

                <ControllerMethodsCode methodData={methodData} controllerData={props.controllerData}/>

            </Modal>
        </>
    )
}

export default ControllerMethods