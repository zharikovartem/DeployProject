import { Button, Collapse, Empty  } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import { Field, FieldArray, Form, Formik, FormikProps } from 'formik'
import React, { ReactNode, useEffect, useState } from 'react'
import { isConditionalExpression } from 'typescript'
import { FieldType, ModelsType } from '../../../../../../../api/projectAPI'
import { AntInput, AntSelect } from '../../../../../../../utils/Formik/CreateAntField'
import { validateRequired } from '../../../../../../../utils/Formik/ValidateFields'
import FieldList from './FieldList'
import ModalForm from './ModelForm'
import { ModelsPropsType } from './ModelsContainer'

const { Panel } = Collapse

const Models: React.FC<ModelsPropsType> = (props) => {
    useEffect( ()=>{
        props.getModelsList(1)
    }, [])

    return(
        <>
        <div className="w-100 d-flex flex-row-reverse">
            <Button className="mr-4 ml-auto mb-3" type="primary">Add Model</Button>
        </div>

        <Collapse defaultActiveKey={[]} >

            {
                props.modelsList.map(item => {
                    return(
                        <Panel header={item.name} key={item.id ? item.id.toString() : 'null'}>
                            <ModelFormItem modelItem={item} updateModel={props.updateModel}/>
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
    modelItem: ModelsType,
    updateModel: (values: ModelsType, modelId: number) => void
}

const ModelFormItem: React.FC<ModelFormItemPropsType> = (props) => {
    
    let fields: Array<FieldType>
    if (Array.isArray(props.modelItem.fields)) {
        fields = props.modelItem.fields
    } else {
        fields = JSON.parse(props.modelItem.fields)
    }

    type fieldsDataType = {[name: string]: string}
    let fieldsdata: Array<FieldType> = []
    let fieldInit:fieldsDataType = {}
    if (fields) {
        for (let index = 0; index < fields.length; index++) {
            const field = fields[index];
            console.log(field)
            fieldsdata.push(field)
            fieldInit['field_'+field.name] = field.type
        }
    }

    const handleSubmit = (formValues:any) => {
        const oldValue = {...props.modelItem, fields: fieldsdata, ...fieldInit}
        console.log('formValues: ', formValues)
        // compere model
        let ismodelChange = false
        if ( oldValue.name !== formValues.name ) {
            ismodelChange = true
        }

        console.log(props.modelItem)
        const newFieldData: ModelsType = {
            // ...props.modelItem,
            fields: JSON.stringify(formValues.fields),
            name: formValues.name,
            backend_id: props.modelItem.backend_id,
            id: props.modelItem.id
        }

        console.log(newFieldData)
        props.updateModel(newFieldData, props.modelItem.id ? props.modelItem.id : 0)
    }

    return(
        <Formik
            initialValues={ {...props.modelItem, fields: fieldsdata, ...fieldInit} }
            onSubmit={handleSubmit}
        >
            {ModelForm}
        </Formik>
    )
}

const ModelForm: ((props: FormikProps<{}>) => ReactNode) = (props) => {
    const [initialFieldValues, setInitialFieldValues] = useState(props.initialValues)

    type InitialModalValuesType = {
        newFieldName: string,
        newFieldType: string,
        isNullable: boolean,
        isPrimary: boolean,
        isNew: boolean,
        id?: number
    }
    const emptyInitialModalValues: InitialModalValuesType = {
        newFieldName: '',
        newFieldType: '',
        isNullable: false,
        isPrimary: false,
        isNew: true
    }

    const [initialModalValues, setInitialModalValues] = useState<InitialModalValuesType>(emptyInitialModalValues)
    const [initialValues2 , setInitialValues2] = useState(props.initialValues)

    useEffect( ()=>{
    }, [initialModalValues])

    const onChange = (val:any) => {
        setIsDataChanged(true)
    }

    const openModalToAddField = (target: any | null, action?: any) => {
        console.log('openModalToAddField', target.isNew)
        console.log('action', action)

        if (!target.isNew) {
            console.log('ОБНУЛЯЕМ ФОРМУ', target)
            
            setInitialModalValues({
                newFieldName: target.fieldName,
                newFieldType: target.fieldType,
                isNullable: false,
                isPrimary: false,
                isNew: false,
                id: target.fieldId
            })
        } else {
            setInitialModalValues({...emptyInitialModalValues})
            console.log('СОЗДАЕМ НОВЫЙ ФИЛД', initialModalValues)
            
        }
        
        setIsModalVisible(true)
    }

    const [isDataChanged, setIsDataChanged] = useState(false)

    const [isModalVisible, setIsModalVisible] = useState(false)

    const handleOk = () => {
        console.log('handleOk')
        setIsModalVisible(false)
    }

    const handleCancel = () => {
        console.log('handleCancel')
        setInitialModalValues(emptyInitialModalValues)
        console.log(initialModalValues)
        setIsModalVisible(false)
    }

    const handleSubmit = (modalFieldFormValues:any, actions: any) => {
        console.log('handleSubmit', modalFieldFormValues)
        if (!modalFieldFormValues.isNew) {
            let isUpdate = false
            // @ts-ignore
            const newFields = initialFieldValues.fields.map( (item) => {
                if (modalFieldFormValues.id === item.id) {
                    if (item.name !== modalFieldFormValues.newFieldName || item.type !== modalFieldFormValues.newFieldType) {
                        isUpdate = true
                        return {
                            description: "",
                            id: modalFieldFormValues.id,
                            name: modalFieldFormValues.newFieldName,
                            primary: false,
                            type: modalFieldFormValues.newFieldType
                        }
                    } else {
                        return item
                    }
                }
                return item
            } )

            if (isUpdate) {
                setInitialValues2( {...props.initialValues, fields: newFields} )
                setInitialFieldValues( {...initialFieldValues, fields: newFields} )
                console.log('NEED DML!!!!', props)
                props.setValues({
                    ...props.values,
                    fields: newFields
                })
                props.handleSubmit()
            }
        } else {
            console.log('NEW FIELD')
            // @ts-ignore
            let newFields = initialFieldValues.fields
            newFields.push({
                // @ts-ignore
                id: props.initialValues.fields.length+1,
                name: modalFieldFormValues.newFieldName,
                primary: false,
                type: modalFieldFormValues.newFieldType,
                description: "",
            })
            setInitialValues2( {...props.initialValues, fields: newFields} )

            console.log('NEED DML!!!!', props)
            props.setValues({
                ...props.values,
                fields: newFields
            })
            props.handleSubmit()
        }
        actions.resetForm()
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
                <h5>Field List:</h5><Button className="mr-4 ml-auto" type="primary" onClick={()=>{openModalToAddField({isNew: true})}}>Add Field</Button>
            </div>
            
            <FieldList 
                fields={
                // @ts-ignore
                initialValues2.fields
                }
                openModalToAddField={openModalToAddField}
            />

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
            <Formik
                initialValues={initialModalValues}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {ModalForm}
            </Formik>
        </Modal>

        </>
    )
}

type FieldRowPropsType = {
    fieldName: string | undefined,
    fieldType: string | undefined,
    isNulleble?: boolean,
    isNew: boolean
    openModalToAddField: (target: any | null)=>void,
    fieldId?: number | null
}

const FieldRow: React.FC<FieldRowPropsType> = (props) => {
    return(
        <div key={props.fieldName} className="row py-2 border">
            <div className="col">{props.fieldName}</div>
            <div className="col">{props.fieldType}</div>
            <div className="col">isNulleble</div>
            <div className="col">
                <Button type="ghost" className="ml-2" size="small" onClick={()=>{props.openModalToAddField(props)}}>Edit</Button>
                <Button type="primary" size="small" className="ml-2" onClick={()=>{}}>Delete</Button>
            </div>
        </div>
    )
}