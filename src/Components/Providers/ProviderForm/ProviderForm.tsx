import { Form, Field, FormikProps } from 'formik'
import React, { ReactNode } from 'react'
import Contact from '../../../utils/components/Contact/ContactContainer'
import { AntInput, AntTextArea } from '../../../utils/Formik/CreateAntField'
import { validateRequired } from '../../../utils/Formik/ValidateFields'
import {ContactType} from './../../../api/ProviderAPI'

export type initialvaluesType = {
    name: string,
    descriptions: string,
    id?: number
    contacts?: Array<ContactType>
}
const ProviderForm: ((props: FormikProps<initialvaluesType>) => ReactNode) = (props) => {
    console.log('initialValues:', props.initialValues)
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

            <Contact 
                contacts={props.initialValues.contacts !== undefined ? props.initialValues.contacts : []} 
                parentId={ props.initialValues.id}
                canAdd={props.initialValues.id ? true : false}
            />

            <div className="submit-container">
                <button className="ant-btn ant-btn-primary" type="submit">
                    Save
                </button>
            </div>

        </Form>
    )
}

export default ProviderForm