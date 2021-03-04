import { Form, Field, FormikProps } from 'formik'
import React, { ReactNode, useState, useEffect } from 'react'
import { AntCheckbox, AntInput, AntSelect } from '../../../../../../../utils/Formik/CreateAntField'
import { validateRequired } from '../../../../../../../utils/Formik/ValidateFields'
import {SelectOptionType} from '../../../../../../../Types/types'
// import { AntInput, AntSelect, AntTextArea, AntTimePicker } from '../../../utils/Formik/CreateAntField'
// import { validateRequired } from '../../../utils/Formik/ValidateFields'
// import ProjectForm from './Project/ProjectForm'


const ModelForm: ((props: FormikProps<{}>) => ReactNode) = (props) => {
    return (
        <Form
            className="form-container"
            onSubmit={props.handleSubmit}
        >
            <Field
                component={AntInput}
                name="name"
                type="text"
                label="Model name"
                validate={validateRequired}
                hasFeedback
                // onChange={onChangeNewFieldName}
            />
            <Field
                component={AntInput}
                name="folder"
                type="text"
                label="Model folder"
                // validate={validateRequired}
                // hasFeedback
                // onChange={onChangeNewFieldName}
            />
            <div className="submit-container">
                <button className="ant-btn ant-btn-primary" type="submit">
                    Save1
                </button>
            </div>
        </Form>
    )
}

export default ModelForm