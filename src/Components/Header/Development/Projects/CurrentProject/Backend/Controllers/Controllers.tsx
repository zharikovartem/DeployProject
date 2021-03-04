import { Button } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { ControllersPropsType } from './ControllersContainer'

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
        // console.log(props)
        // props.createModel({
        //     ...vals,
        //     backend_id: props.backendId
        // })
    }

    console.log(props.controllersList)

    if (props.controllersList.length > 0) {
        return (
            <div>
                <div className="w-100 d-flex flex-row-reverse">
                    <Button className="mr-4 ml-auto mb-3" type="primary" onClick={addController}>Add Controller</Button>
                </div>

                {props.controllersList.map((item: any) => {
                    return (
                        <div key={item.name} >{item.name}</div>
                    )
                })}

                <Modal title="Create new Controller" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <Formik
                        // initialValues={initialModalValues}
                        initialValues={{}}
                        onSubmit={handleSubmit}
                        enableReinitialize={true}
                    >
                        {/* {ControllersForm} */}
                    </Formik>
                </Modal>
            </div>
        )
    } else {
        return <div>No Data</div>
    }
}

export default Controllers