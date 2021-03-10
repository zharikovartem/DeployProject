import { Button, Modal } from 'antd'
import { Formik } from 'formik'
import React, {useState, useEffect} from 'react'
import { ControllerMethodsPropsType } from './ControllerMethodsContainer'
import ControllerMethodsForm from './ControllerMethodsForm'

const ControllerMethods: React.FC<ControllerMethodsPropsType> = (props) => {
    useEffect( () => {
        if (props.controllerMethodsList.length === 0) {
            props.getControllerMethodsList()
        }
    },[])

    useEffect( () => {
        console.log(props)
    },[props.controllerMethodsList])

    const [isModalVisible, setIsModalVisible] = useState(false)
    const addMethod = () => {
        setIsModalVisible(true)
    }

    const onOk = () => {
        console.log('onOk')
        setIsModalVisible(false)
    }

    const onHandleSubmit = (values: any) => {
        console.log(values)
    }

    return(
        <div className="w-100 d-flex flex-row-reverse">
            <Button type="primary" onClick={addMethod}>Add Method</Button>

            {props.controllerMethodsList.length !== 0 ?
            props.controllerMethodsList.map( item=>{
                return(
                    <div>{item.name}</div>
                )
            })
            :
            null
            }

            <Modal title="Basic Modal" visible={isModalVisible} onOk={onOk} onCancel={()=>{setIsModalVisible(false)}}>
            <Formik
                    // initialValues={initialFormValues}
                    initialValues={{}}
                    onSubmit={onHandleSubmit}
                    enableReinitialize={true}
                >
                    {ControllerMethodsForm}
                </Formik>
            </Modal>
        </div>
    )
}

export default ControllerMethods