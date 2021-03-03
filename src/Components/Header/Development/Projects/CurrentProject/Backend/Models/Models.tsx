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

    // console.log(props)

    return(
        <>
        <div className="w-100 d-flex flex-row-reverse">
            <Button className="mr-4 ml-auto mb-3" type="primary">Add Model</Button>
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
    const handleSubmit = (formValues:any) => {
        console.log('formValues: ', formValues)
    }

    let fields: Array<FieldType>
    if (Array.isArray(props.modelItem.fields)) {
        fields = props.modelItem.fields
    } else {
        fields = JSON.parse(props.modelItem.fields)
    }

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

    // const getFieldListArray = ():Array<JSX.Element | undefined> => {
    //     console.log('getFieldListArray', initialFieldValues)
    //     let fieldArray: Array<JSX.Element | undefined> = []
    //     const object = {...initialFieldValues}
    //     for (const key in object) {
    //         if (Object.prototype.hasOwnProperty.call(object, key)) {
    //             // @ts-ignore
    //             const element: any = object[key];
    //             if (Array.isArray(element) && element.length>0) {
    //                 for (let i = 0; i < element.length; i++) {
    //                     const field = element[i];
    //                     console.log(field)
    //                     fieldArray.push(
    //                         <FieldRow 
    //                             fieldName={field.name} 
    //                             fieldType={field.type} 
    //                             isNew={false}
    //                             openModalToAddField={openModalToAddField}
    //                             fieldId={field.id ? field.id : null}
    //                         />
    //                     )
    //                 }
    //             }
    //         }
    //     }
    //     return fieldArray
    // }

    // const [fieldsList, setFieldsList] = useState<Array<any>>(getFieldListArray())
    const [isModalVisible, setIsModalVisible] = useState(false)

    const handleOk = () => {
        console.log('handleOk')
        // addField()
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
                // console.log(item)
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
                props.handleSubmit()
            }
        } else {
            console.log('NEW FIELD')
            // @ts-ignore
            let newFields = initialFieldValues.fields
            newFields.push({
                description: "",
                // @ts-ignore
                id: props.initialValues.fields.length+1,
                name: modalFieldFormValues.newFieldName,
                primary: false,
                type: modalFieldFormValues.newFieldType
            })
            setInitialValues2( {...props.initialValues, fields: newFields} )

            console.log('NEED DML!!!!', props)
            props.handleSubmit()
        }
        actions.resetForm()
    }

    // const addField = (fildValues: InitialModalValuesType) => {
    //     // console.log('addField', fildValues)
    //     let fieldsListCopy = [...fieldsList]
    //     let newFieldKeyCopy = newFieldKey
    //     setNewFieldKey(Number(newFieldKeyCopy)+1)
    //     fieldsListCopy.push(
    //         <FieldRow 
    //             fieldName={fildValues.newFieldName}
    //             fieldType={fildValues.newFieldType}
    //             isNew={false}
    //             openModalToAddField={openModalToAddField}
    //             fieldId={fildValues.id ? fildValues.id : null}
    //         />
    //     )
    //     setFieldsList(fieldsListCopy)
    // }

    // if (fieldsList && fieldsList.length === 0) {
    //     setFieldsList([<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />])
    // }

    // console.log('fieldsList', fieldsList)

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
                // props.initialValues.fields ? props.initialValues.fields : []
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