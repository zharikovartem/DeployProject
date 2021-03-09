import { Form, Field, FormikProps } from 'formik'
import React, { ReactNode, useState, useEffect } from 'react'
import { AntCheckbox, AntInput, AntSelect } from '../../../../../../utils/Formik/CreateAntField'
import { validateRequired } from '../../../../../../utils/Formik/ValidateFields'
import { SelectOptionType } from '../../../../../../Types/types'
import { Radio } from 'antd'
// import { AntInput, AntSelect, AntTextArea, AntTimePicker } from '../../../utils/Formik/CreateAntField'
// import { validateRequired } from '../../../utils/Formik/ValidateFields'
// import ProjectForm from './Project/ProjectForm'


const FieldForm: ((props: FormikProps<{}>) => ReactNode) = (props) => {
    // @ts-ignore
    const [radioValue, setRadioValue] = useState(props.initialValues.fieldParam)

    useEffect( ()=> {
        // @ts-ignore
        setRadioValue(props.initialValues.fieldParam)
    },[props.initialValues])

    const onRadioChange = (e: any) => {
        setRadioValue(e.target.value)
        props.setValues({ ...props.values, fieldParam: e.target.value })
        console.log('Добавили значение fieldParam: ',e.target.value)
    }
    const newFieldTypepOtions: Array<SelectOptionType> = [
        {
            name: 'BOOLEAN',
            value: 'boolean'
        },
        {
            name: 'BIGINT',
            value: 'bigint'
        },
        {
            name: 'VARCHAR',
            value: 'varchar'
        },
        {
            name: 'JSON',
            value: 'json'
        },
        {
            name: 'TIMESTAMP',
            value: 'timestamp'
        },
        {
            name: 'TEXT',
            value: 'text'
        }

    ]

    console.log(props.initialValues)
    console.log(radioValue)

    return (
        <Form
            className="form-container"
            onSubmit={props.handleSubmit}
        >
            <Field
                component={AntInput}
                name="newFieldName"
                type="text"
                label="New fieldName"
                validate={validateRequired}
                hasFeedback
            // onChange={onChangeNewFieldName}
            />
            <Field
                component={AntSelect}
                selectOptions={newFieldTypepOtions}
                name="newFieldType"
                type="select"
                label="Field type"
                submitCount={props.submitCount}
            />
            <Field
                component={AntCheckbox}
                name="isNulleble"
                type="checkbox"
                label="isNulleble"
                submitCount={props.submitCount}
            // onClick={submitBackEnd}
            // onSelect={submitBackEnd}
            />
            <Field
                component={AntCheckbox}
                name="isPrimary"
                type="checkbox"
                label="isPrimary"
                submitCount={props.submitCount}
            />

            {/* <Radio.Group onChange={onRadioChange} value={radioValue} name="fieldParam">
                <Radio value={'fillable'}>Fillable</Radio>
                <Radio value={'hidden'}>Hidden</Radio>
                <Radio value={'readOnly'}>ReadOnly</Radio>
            </Radio.Group> */}

            <div className="ant-row ant-form-item">
                <div className="ant-col ant-form-item-label">
                    <label>
                        Picked
                    </label>
                </div>
                <div className="mt-1">
                    <Radio.Group onChange={onRadioChange} value={radioValue} name="fieldParam">
                        <Radio value={'fillable'}>Fillable</Radio>
                        <Radio value={'hidden'}>Hidden</Radio>
                        <Radio value={'readOnly'}>ReadOnly</Radio>
                    </Radio.Group>
                </div>
                
            {/* <div role="group" aria-labelledby="my-radio-group">
                    <label>
                        <Field type="radio" name="picked" value="One" label="one" />
                        One
                    </label>
                    <label>
                        <Field type="radio" name="picked" value="Two" />
                        Two
                    </label>
                </div>*/}
            </div> 

            <div className="submit-container" >
                <button className="ant-btn ant-btn-primary" type="submit">
                    Save
                </button>
            </div>
        </Form>
    )
}

export default FieldForm