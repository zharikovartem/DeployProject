import { Button, Collapse, Empty  } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import { Field, FieldArray, Form, Formik, FormikProps } from 'formik'
import React, { ReactNode, useEffect, useState } from 'react'
import { FieldType, ModelsType } from '../../../../../../../api/projectAPI'
import { AntInput, AntSelect } from '../../../../../../../utils/Formik/CreateAntField'
import { validateRequired } from '../../../../../../../utils/Formik/ValidateFields'
import { ModelsPropsType } from './ModelsContainer'

const { Panel } = Collapse

const Models: React.FC<ModelsPropsType> = (props) => {
    useEffect( ()=>{
        props.getModelsList(1)
    }, [])

    console.log(props)

    return(
        <>
        <div className="w-100 d-flex flex-row-reverse">
            <Button className="mr-4 ml-auto mb-3" type="primary">Add</Button>
        </div>

        <Collapse defaultActiveKey={[]} >

            {
                props.modelsList.map(item => {
                    return(
                        <Panel header={item.name} key={item.id}>
                            <ModelFormItem modelItem={item}/>
                        </Panel>
                    )
                })
            }

        </Collapse>
        </>
    )
}

export default Models

type ModelFormItemPropsType = {
    modelItem: ModelsType
}

const ModelFormItem: React.FC<ModelFormItemPropsType> = (props) => {
    const handleSubmit = (val:any) => {
        console.log(val)
    }
    // console.log(props.modelItem)
    let fields: Array<FieldType>
    if (Array.isArray(props.modelItem.fields)) {
        fields = props.modelItem.fields
    } else {
        fields = JSON.parse(props.modelItem.fields)
    }
    
    console.log(fields)

    type fieldsDataType = {[name: string]: string}
    let fieldsdata = []
    let fieldInit:fieldsDataType = {}
    if (fields) {
        for (let index = 0; index < fields.length; index++) {
            const field = fields[index];
            console.log(field)
            fieldsdata.push(field)
            fieldInit['field_'+field.name] = field.type
        }
    }
    

    console.log(fieldsdata)

    console.log(fields)
    return(
        <Formik
            initialValues={ {...props.modelItem, fields: fieldsdata, ...fieldInit} }
            // initialValues={initialValues}
            onSubmit={handleSubmit}
        >
            {ModelForm}
        </Formik>
    )
}

const ModelForm: ((props: FormikProps<{}>) => ReactNode) = (props) => {
    const [newFieldName, setNewFieldName] = useState<string>()
    const onChange = (val:any) => {
        setIsDataChanged(true)
    }

    const openModalToAddField = () => {
        setIsModalVisible(true)
    }

    const onChangeNewFieldName = (name:string, value:any) => {
        console.log(value.target.value)
        setNewFieldName(value.target.value)
    }
    const [isDataChanged, setIsDataChanged] = useState(false)

    const getFieldList = () => {
        let fieldForms: Array<any> = []
        const object = props.initialValues
        for (const key in object) {
            if (Object.prototype.hasOwnProperty.call(object, key)) {
                // @ts-ignore
                const element: any = object[key];
                // console.log(element)
                if (Array.isArray(element) && element.length>0) {
                    // console.log(key,'=>',element[0].name)
                    for (let i = 0; i < element.length; i++) {
                        const field = element[i];
                        // console.log(field)
                        fieldForms.push(
                            <div  key={field.name}>
                            <Field
                                component={AntInput}
                                name={'field_'+field.name}
                                type="text"
                                label={field.name}
                                submitCount={props.submitCount}
                                onChange={onChange}
                            />
                            </div>
                        )
                    }
                }
            }
        }
        return fieldForms
    }

    const getFieldListArray = ():Array<JSX.Element | undefined> => {
        let fieldArray: Array<JSX.Element | undefined> = []
        const object = props.initialValues
        for (const key in object) {
            if (Object.prototype.hasOwnProperty.call(object, key)) {
                // @ts-ignore
                const element: any = object[key];
                if (Array.isArray(element) && element.length>0) {
                    for (let i = 0; i < element.length; i++) {
                        const field = element[i];
                        fieldArray.push(
                            // <div key={field.name}>
                            //     <div className="row">
                            //         <div className="col">{field.name}</div>
                            //         <div className="col">actions</div>
                            //     </div>
                            // </div>
                            <FieldRow fieldName={field.name} fieldType={field.type} openModalToAddField={openModalToAddField}/>
                        )
                    }
                }
            }
        }
        return fieldArray
    }

    const [fieldsList, setFieldsList] = useState<Array<any>>(getFieldListArray())
    const [newFieldKey, setNewFieldKey] = useState<number>(1)
    const [isModalVisible, setIsModalVisible] = useState(false)

    const handleOk = (val: any) => {
        console.log('handleOk', val)
        addField()
        setIsModalVisible(false)
    }

    const handleCancel = (val: any) => {
        console.log('handleCancel', val)
        setIsModalVisible(false)
    }

    const addField = () => {
        console.log('addField')
        let fieldsListCopy = [...fieldsList]
        let newFieldKeyCopy = newFieldKey
        setNewFieldKey(Number(newFieldKeyCopy)+1)
        fieldsListCopy.push(
            // <div key={newFieldName}>
            // <Field
            //     component={AntInput}
            //     name={'field_'+newFieldName}
            //     type="text"
            //     label={newFieldName}
            //     submitCount={props.submitCount}
            //     onChange={onChange}
            // />
            // </div>
            // <div key={newFieldName}>
            //     <div className="row">
            //         <div className="col">{newFieldName}</div>
            //         <div className="col">actions</div>
            //     </div>
            // </div>
            <FieldRow fieldName={newFieldName} fieldType={newFieldName} openModalToAddField={openModalToAddField}/>
        )
        setFieldsList(fieldsListCopy)
        // console.log(fieldForms)
    }
    
    // const fields = JSON.parse(props.values.fields)
    // console.log('initialValues', props.initialValues)  

    

    if (fieldsList && fieldsList.length === 0) {
        setFieldsList([<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />])
    }

    return(
        <>
        <Form
            className="form-container mt-2"
            onSubmit={props.handleSubmit}
        >
            <Field
                component={AntInput}
                name="name"
                type="text"
                label="Name"
                validate={validateRequired}
                submitCount={props.submitCount}
                hasFeedback
                onChange={onChange}
            />
            <Field
                component={AntInput}
                name="folder"
                type="text"
                label="Folder"
                submitCount={props.submitCount}
                onChange={onChange}
            />

            <div className="w-100 d-flex flex-row mt-2 mb-2">
                <h5>Field List:</h5><Button className="mr-4 ml-auto" type="primary" onClick={openModalToAddField}>Add Field</Button>
            </div>

            {fieldsList}

            <div className="w-100 d-flex flex-row mt-2 mb-2">
                <h5>Methods:</h5><Button className="mr-4 ml-auto" type="primary">Add method</Button>
            </div>
            
            {isDataChanged ?
            <div className="submit-container">
                <button className="ant-btn ant-btn-primary" type="submit">
                    Save
                </button>
            </div>
            : null}
        </Form>

        <Modal title="New Field Form" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            {/* <input type="text"></input> */}
            <Field
                component={AntInput}
                name="newFieldName"
                type="text"
                label="New fieldName"
                validate={validateRequired}
                hasFeedback
                onChange={onChangeNewFieldName}
            />
            <Field
                component={AntSelect}
                selectOptions={[]}
                name="fieldType"
                type="select"
                label="Field type"
                submitCount={props.submitCount}
            />
        </Modal>

        </>
    )
}

type FieldRowPropsType = {
    fieldName: string | undefined,
    fieldType: string | undefined,
    isNulleble?: boolean,
    onFieldEdit?: (val:any)=>void,
    openModalToAddField: ()=>void
}
const FieldRow: React.FC<FieldRowPropsType> = (props) => {
    return(
        <div key={props.fieldName} className="row py-2 border">
            <div className="col">{props.fieldName}</div>
            <div className="col">{props.fieldType}</div>
            <div className="col">isNulleble</div>
            <div className="col">
                <Button type="ghost" size="small" onClick={props.openModalToAddField}>Edit</Button>
            </div>
        </div>
    )
}