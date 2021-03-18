import { Button, Collapse, Empty } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import { Field, Form, Formik, FormikProps } from 'formik'
import React, { ReactNode, useEffect, useState } from 'react'
import { ControllersPropsType } from './ControllersContainer'
import ControllerForm from './ControllerForm'
import { AntCheckbox, AntSelect } from '../../../../../../utils/Formik/CreateAntField'
import { ControllersType, ModelsType } from '../../../../../../api/projectAPI'
import {SelectOptionType} from './../../../../../../Types/types'
import { initialValues } from '../../../../../ToDo/ToDoMobile'
import Item from 'antd/lib/list/Item'
import ControllerMethods from './ControllerMethodsContainer'
import FullControllerMethodCode from './FullControllerMethodCode/FullControllerMethodCodeContainer'

const { Panel } = Collapse

const Controllers: React.FC<ControllersPropsType> = (props) => {
    useEffect(() => {
        props.getControllersList(props.backendId)

        if (props.modelsList.length === 0) {
            // console.log('getModelsList')
            props.getModelsList(props.backendId)
        }

    }, [])

    useEffect(() => {
    }, [props.controllersList])

    const [isModalVisible, setIsModalVisible] = useState(false)

    if (props.modelsList.length > 0) {
        const modelsListOptions = props.modelsList.map( (item: ModelsType) => {
            return ( {
                name: item.name,
                value: item.id
            } )
        })
    }
    

    const addController = () => {
        setIsModalVisible(true)
    }

    const handleOk = () => { setIsModalVisible(!isModalVisible) }
    const handleCancel = () => { setIsModalVisible(!isModalVisible) }

    const handleSubmit = (vals: any) => {
        // console.log(vals)
        // console.log(props)

        props.createController({
            ...vals,
            backend_id: props.backendId
        })
    }

    // console.log(props)

    // if (props.controllersList.length > 0) {
        return (
            <div>
                <div className="w-100 d-flex flex-row-reverse">
                    <Button className="mr-4 ml-auto mb-3" type="primary" onClick={addController}>Add Controller</Button>
                </div>

                {
                    props.controllersList.length > 0 ?
                    <Collapse defaultActiveKey={[]}>
                        {props.controllersList.map((item: ControllersType) => {
                            return (
                                <Panel 
                                    key={item.name}
                                    header={item.name} 
                                    // extra={[<div key={'any_'+item.name}>any</div>]}
                                >
                                    <ControllerItem item={item} modelsList={props.modelsList} updateController={props.updateController}/>
                                </Panel>
                            )
                        })}
                    </Collapse>
                    : <Empty />
                }

                <Modal title="Create new Controller" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <Formik
                        // initialValues={initialModalValues}
                        initialValues={{}}
                        onSubmit={handleSubmit}
                        enableReinitialize={true}
                    >
                        {ControllerForm}
                    </Formik>
                </Modal>
            </div>
        )
    // } 
    // else {
    //     return(
    //         <>
    //             <div className="w-100 d-flex flex-row-reverse">
    //                 <Button className="mr-4 ml-auto mb-3" type="primary" onClick={addController}>Add Controller</Button>
    //             </div>
    //             <div>No Data</div>
    //         </>
    //     ) 
    // }
}

export default Controllers

type ControllerItemType = {
    item: ControllersType,
    modelsList: Array<ModelsType>,
    updateController: (values: ControllersType, controllerId: number) => void
}

const ControllerItem:React.FC<ControllerItemType> = (props) => {
    console.log('ControllerItem props', props)

    type initialFormValuesType = {
        isResurce: boolean,
        modelsOptions: Array<SelectOptionType>,
        models: Array<number>
    }

    const getOptions = ():Array<SelectOptionType> => {
        let options:Array<SelectOptionType> = []
        for (let index = 0; index < props.modelsList.length; index++) {
            const element = props.modelsList[index];
            options.push({
                name: element.name,
                value: element.id ? Number(element.id) : 0
            })
        }
        return options
    }

    const initialFormValues: initialFormValuesType = {
        isResurce: props.item.isResource,
        modelsOptions: getOptions(),
        models: props.item.models.length>0 ? props.item.models.map( (i: ModelsType) => i.id ) : []
    }

    // console.log(props)

    const onControllerInstanseSubmit = (values: any) => {
        // console.log(values)

        props.updateController({
            models: values.models,
            backend_id: props.item.backend_id,
            folder: props.item.folder,
            id: props.item.id,
            isResource: values.isResurce,
            model_id: props.item.model_id,
            name: props.item.name,
        }, props.item.id)
    }

    return(
    <div key={props.item.name}>
        <h4>{props.item.name}</h4>
        <Collapse defaultActiveKey={[]} ghost>
            <Panel header="Instanses" key="instanse">
                <Formik
                    initialValues={initialFormValues}
                    // initialValues={{}}
                    onSubmit={onControllerInstanseSubmit}
                    enableReinitialize={true}
                >
                    {ControllerInstansesForm}
                </Formik>
                
            </Panel>
            <Panel header="Methods" key="methods">
                <ControllerMethods controllerData={props.item}/>
            </Panel>
            <Panel header="Full code" key="code">
                <FullControllerMethodCode controllerData={props.item}/>
            </Panel>
            <Panel header="Actions to create" key="actions">
                {
                    props.item.models[0] ?
                    <h5>php artisan make:model {props.item.models[0].name} -mcr</h5>
                    : <h5>No Model</h5>
                }
                <br/>
                {
                     props.item.models[0] ?
                     <>
                    <h5>php artisan make:controller {props.item.name} --resource</h5>
                    <h5>php artisan make:model {props.item.models[0].name} --migration</h5>
                    </>
                    : <h5>No Model</h5>
                }
            </Panel>
        </Collapse>
    </div>
    )
}

const ControllerInstansesForm: ((props: FormikProps<{}>) => ReactNode) = (props) => {

    // console.log(props.initialValues)

    return (
        <Form
            className="form-container"
            onSubmit={props.handleSubmit}
        >
            <Field
                component={AntCheckbox}
                name="isResurce"
                type="checkbox"
                label="isResurce"
                submitCount={props.submitCount}
                // onClick={submitBackEnd}
                // onSelect={submitBackEnd}
            />

            <Field
                component={AntSelect}
                name="models"
                type="select"
                label="Including Models"
                mode="multiple"
                selectOptions={
                    // @ts-ignore
                    props.initialValues.modelsOptions
                }
                // onSelect = {onSelect}
            />

            <div className="submit-container">
                <button className="ant-btn ant-btn-primary" type="submit">
                    Save
                </button>
            </div>

        </Form>
    )
}


