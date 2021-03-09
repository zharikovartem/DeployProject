import { Button, Collapse } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import { Field, Form, Formik, FormikProps } from 'formik'
import React, { ReactNode, useEffect, useState } from 'react'
import { ControllersPropsType } from './ControllersContainer'
import ControllerForm from './ControllerForm'
import { AntCheckbox, AntSelect } from '../../../../../../utils/Formik/CreateAntField'

const { Panel } = Collapse

const Controllers: React.FC<ControllersPropsType> = (props) => {
    useEffect(() => {
        props.getControllersList(props.backendId)
    }, [])

    useEffect(() => {
    }, [props.controllersList])

    const [isModalVisible, setIsModalVisible] = useState(false)

    const addController = () => {
        setIsModalVisible(true)
    }

    const handleOk = () => { setIsModalVisible(!isModalVisible) }
    const handleCancel = () => { setIsModalVisible(!isModalVisible) }

    const handleSubmit = (vals: any) => {
        console.log(vals)
        console.log(props)

        props.createController({
            ...vals,
            backend_id: props.backendId
        })
    }

    console.log(props.controllersList)

    if (props.controllersList.length > 0) {
        return (
            <div>
                <div className="w-100 d-flex flex-row-reverse">
                    <Button className="mr-4 ml-auto mb-3" type="primary" onClick={addController}>Add Controller</Button>
                </div>

                <Collapse defaultActiveKey={[]}>
                {props.controllersList.map((item: any) => {
                    return (
                        // <div key={item.name} >
                        <Panel 
                            header={item.name} 
                            key={item.id ? item.id.toString() : 'null'}
                            extra={[<div>any</div>]}
                        >
                            <ControllerItem item={item}/>
                        </Panel>
                        // </div>
                    )
                })}
                </Collapse>

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
    } else {
        return <div>No Data</div>
    }
}

export default Controllers

const ControllerItem:React.FC<any> = (props) => {
    return(
    <div >
        <h4>{props.item.name}</h4>
        <Collapse defaultActiveKey={[]} ghost>
            <Panel header="Instanses" key="instanse">
                <Formik
                    // initialValues={initialModalValues}
                    initialValues={{}}
                    onSubmit={()=>{}}
                    enableReinitialize={true}
                >
                    {ControllerInstansesForm}
                </Formik>
                
            </Panel>
            <Panel header="Methods" key="methods">

            </Panel>
            <Panel header="Code" key="code">

            </Panel>
        </Collapse>
    </div>
    )
}

const ControllerInstansesForm: ((props: FormikProps<{}>) => ReactNode) = (props) => {
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
                selectOptions={modelsListOptions}
                // onSelect = {onSelect}
            />

            <li>Models include</li>

        </Form>
    )
}

const modelsListOptions = [
    {
        name: 'model1',
        value: 1
    },
    {
        name: 'model2',
        value: 2
    },
    {
        name: 'model3',
        value: 3
    },
]