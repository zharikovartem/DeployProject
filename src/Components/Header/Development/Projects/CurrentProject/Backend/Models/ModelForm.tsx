import { Form, Field, FormikProps } from 'formik'
import React, { ReactNode, useState, useEffect } from 'react'
import { AntCheckbox, AntInput, AntSelect } from '../../../../../../../utils/Formik/CreateAntField'
import { validateRequired } from '../../../../../../../utils/Formik/ValidateFields'
import {SelectOptionType} from './../../../../../../../Types/types'
// import { AntInput, AntSelect, AntTextArea, AntTimePicker } from '../../../utils/Formik/CreateAntField'
// import { validateRequired } from '../../../utils/Formik/ValidateFields'
// import ProjectForm from './Project/ProjectForm'


const ModalForm: ((props: FormikProps<{}>) => ReactNode) = (props) => {
    const newFieldTypepOtions: Array<SelectOptionType> = [
        {
            name: 'Boolean',
            value: 'boolean'
        }
    ]

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
                name="isNullable"
                type="checkbox"
                label="isNullable"
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
                // onClick={submitBackEnd}
                // onSelect={submitBackEnd}
            />
            <div className="submit-container">
                <button className="ant-btn ant-btn-primary" type="submit">
                    Save
                </button>
            </div>
        </Form>
    )
}

export default ModalForm