import { Field, Form, FormikProps } from "formik"
import React, { ReactNode, useState } from "react"
import { AntInput } from "../../../../../../utils/Formik/CreateAntField"
import { validateRequired } from "../../../../../../utils/Formik/ValidateFields"


const InstansesFrontendForm: ((props: FormikProps<{}>) => ReactNode) = (props) => {
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

            <li>src tree</li>

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

export default InstansesFrontendForm