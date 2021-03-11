import { Button, List, Modal } from 'antd'
import { Formik } from 'formik'
import React, { useState, useEffect } from 'react'
import { ControllerMethodsType } from '../../../../../../api/ControllerMethodsAPI'
import { ControllerMethodsPropsType } from './ControllerMethodsContainer'
import ControllerMethodsForm from './ControllerMethodsForm'
import ControllerMethodsItem from './ControllerMethodsItem/ControllerMethodsItem'

const ControllerMethods: React.FC<ControllerMethodsPropsType> = (props) => {
    useEffect(() => {
        if (props.controllerMethodsList.length === 0) {
            props.getControllerMethodsList()
        }
    }, [])

    useEffect(() => {
        console.log(props)
    }, [props.controllerMethodsList])

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
                                actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">code</a>]}
                            >
                                {/* {item.name} */}
                                <div className="row w-100">
                                    <div className="col-6">{item.name}</div>
                                    <div className="col-3">{item.rest_type}</div>
                                </div>
                            </List.Item>
                        )}
                    />
                    {/* {
                        props.controllerMethodsList.map((item: ControllerMethodsType) => {
                            return (
                                <ControllerMethodsItem item={item} />
                            )
                        })
                    } */}
                </>
                :
                null
            }

            <Modal title="Controller Method form" visible={isModalVisible} onOk={onOk} onCancel={() => { setIsModalVisible(false) }} width={1000}>
                <Formik
                    // initialValues={initialFormValues}
                    initialValues={{}}
                    onSubmit={onHandleSubmit}
                    enableReinitialize={true}
                >
                    {ControllerMethodsForm}
                </Formik>
            </Modal>
        </>
    )
}

export default ControllerMethods