import { Field, Form, FormikProps } from "formik"
import React, { ReactNode, useState } from "react"
import { AntInput } from "../../../../../../../utils/Formik/CreateAntField"
import { validateRequired } from "../../../../../../../utils/Formik/ValidateFields"


const InstansesForm: ((props: FormikProps<{}>) => ReactNode) = (props) => {
    const [isDataChanged, setIsDataChanged] = useState(false)

    const onChange = (val:any) => {
        setIsDataChanged(true)
    }
    return(
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
                name="url"
                type="text"
                label="URL"
                submitCount={props.submitCount}
                onChange={onChange}
            />
            <Field
                component={AntInput}
                name="ip"
                type="text"
                label="IP"
                submitCount={props.submitCount}
                onChange={onChange}
            />
            <Field
                component={AntInput}
                name="login"
                type="text"
                label="Login"
                submitCount={props.submitCount}
                onChange={onChange}
            />
            <Field
                component={AntInput}
                name="password"
                type="text"
                label="Password"
                submitCount={props.submitCount}
                onChange={onChange}
            />
            <Field
                component={AntInput}
                name="folder"
                type="text"
                label="folder on server"
                submitCount={props.submitCount}
                onChange={onChange}
            />
            {isDataChanged ?
            <div className="submit-container">
                <button className="ant-btn ant-btn-primary" type="submit">
                    Save
                </button>
            </div>
            : null}
        </Form>
    )
}

export default InstansesForm