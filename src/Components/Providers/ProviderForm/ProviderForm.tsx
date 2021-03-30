import { Form, Field, FormikProps } from 'formik'
import React, { ReactNode, useState, useEffect } from 'react'
import Contact from '../../../utils/components/Contact/Contact'
import { AntCheckbox, AntInput, AntSelect, AntTextArea } from '../../../utils/Formik/CreateAntField'
import { validateRequired } from '../../../utils/Formik/ValidateFields'
// import { validateRequired } from '../../../../../../utils/Formik/ValidateFields'
// import {SelectOptionType} from '../../../../../../Types/types'

export type initialvaluesType = {
    name: string,
    descriptions: string,
    id?: number
}
const ProviderForm: ((props: FormikProps<{}>) => ReactNode) = (props) => {
    return (
        <Form
            className="form-container"
            onSubmit={props.handleSubmit}
        >
            <Field
                component={AntInput}
                name="name"
                type="text"
                label="Provider name"
                validate={validateRequired}
                hasFeedback
            />

            <Field
                component={AntTextArea}
                name="descriptions"
                type="textArea"
                label="Descriptions"
                hasFeedback
            />

            <Contact />

            <div className="submit-container">
                <button className="ant-btn ant-btn-primary" type="submit">
                    Save
                </button>
            </div>

        </Form>
    )
}

export default ProviderForm