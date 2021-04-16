import { Button, List, Modal } from 'antd'
import { Formik } from 'formik'
import React, { useState, useEffect } from 'react'
import ProviderForm from './ProviderForm/ProviderForm'
import { ProvidersPropsType } from './ProvidersContainer'
import {initialvaluesType} from './ProviderForm/ProviderForm'
import { ProviderType } from '../../api/ProviderAPI'

const Providers: React.FC<ProvidersPropsType> = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const emptyInitialvalues: initialvaluesType = {
        name: '',
        descriptions: '',
        contacts: []
    }
    const [initialvalues, setInitialvalues] = useState<initialvaluesType>(emptyInitialvalues)

    useEffect( ()=> {
        if (props.providorsList !== undefined && props.providorsList.length === 0) {
            props.getProvidersList()
        }
    },[props])

    const showModal = () => {
        setInitialvalues(emptyInitialvalues)
        setIsModalVisible(true)
    }

    const onEdit = (item: ProviderType) => {
        setInitialvalues({
            name: item.name,
            descriptions: item.descriptions,
            id: item.id,
            contacts: item.contacts
        })
        setIsModalVisible(true)
    }

    const handleOk = () => {
        setIsModalVisible(false);
    }

    const handleCancel = () => {
        console.log('handleCancel ОБНУЛИЛ')
        setIsModalVisible(false);
        setInitialvalues(emptyInitialvalues)
    }

    const handleSubmit = (values: any) => {
        console.log(values)
        delete values.contacts
        if(values.id === undefined) {
            props.createNewProvider(values)
        } else {
            props.updateProvider(values, values.id)
        }
        
    }

    console.log(props)
    console.log(initialvalues)
    
    return (
        <div className="w-100">
            <div className="w-100 d-flex flex-row-reverse">
                <Button onClick={showModal} className="mt-2 ml-auto mr-2 mb-2" type="primary">New Provider</Button>
            </div>
 
            <List
                size="small"
                header={<h3>Providers List</h3>}
                bordered
                dataSource={props.providorsList}
                renderItem={item => (
                    <List.Item className="">
                        {/* <Card className="w-100 py-0" >{item.name}</Card> */}
                        <div className="border bg-white p-2 w-100">
                            <div className="row ">
                                <div className="col-6 d-flex flex-row">
                                    {item.id}). {item.name}
                                </div>
                                <div className="col-6 d-flex flex-row-reverse">
                                    <Button className="mr-2" onClick={()=>{onEdit(item)}} size="small" type="primary">Edit</Button>
                                    <Button className="mr-2" onClick={()=>{}} size="small" type="primary">Prices(0)</Button>
                                </div>
                            </div>
                            
                            {/* <div className="w-100 d-flex flex-row-reverse">
                            
                            </div> */}
                            
                        </div>
                    </List.Item>
                )}
            />

            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Formik
                    initialValues={initialvalues}
                    onSubmit={handleSubmit}
                    enableReinitialize={true}
                >
                    {ProviderForm}
                </Formik>
            </Modal>

            <li>Pagination</li>
        </div>
    )
}

export default Providers