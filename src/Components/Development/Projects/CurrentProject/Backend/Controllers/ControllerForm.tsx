import { Form, Field, FormikProps } from 'formik'
import React, { ReactNode, useState, useEffect } from 'react'
import { AntCheckbox, AntInput, AntSelect } from '../../../../../../utils/Formik/CreateAntField'
import { validateRequired } from '../../../../../../utils/Formik/ValidateFields'
import {SelectOptionType} from '../../../../../../Types/types'

const ControllerForm: ((props: FormikProps<{}>) => ReactNode) = (props) => {
    return (
        <Form
            className="form-container"
            onSubmit={props.handleSubmit}
        >
            <Field
                component={AntInput}
                name="name"
                type="text"
                label="Controller name"
                validate={validateRequired}
                hasFeedback
            />
            <Field
                component={AntInput}
                name="folder"
                type="text"
                label="Model folder"
            />

            {/* <Field
                component={AntSelect}
                name="models"
                type="select"
                label="Including Models"
                mode="multiple"
                selectOptions={modelsListOptions}
                // onSelect = {onSelect}
            /> */}

            <div className="submit-container">
                <button className="ant-btn ant-btn-primary" type="submit">
                    Save
                </button>
            </div>
        </Form>
    )
}

export default ControllerForm

const modelsListOptions = [
    {
        name: 'Old',
        value: 1
    },
    {
        name: 'New',
        value: 2
    },
    {
        name: 'Load From SRC',
        value: 3
    },
]