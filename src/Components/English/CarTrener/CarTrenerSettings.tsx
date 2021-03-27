import React, { ReactNode } from 'react'
import { Form, Field, FormikProps } from "formik"
import { AntInput, AntCheckbox, AntInputPassword, AntInputNumber } from '../../../utils/Formik/CreateAntField'
import { validateEmail, validateRequired } from '../../../utils/Formik/ValidateFields'

const CarTrenerSettingsForm: ((props: FormikProps<{}>) => ReactNode) = (props) => {
    return (
        <Form 
            className="form-container mt-3" 
            onSubmit={props.handleSubmit}
        >
            {/* <Field
                component={AntInputNumber}
                name="name"
                type="number"
                label="Words compare count"
                validate={validateRequired}
                hasFeedback
            /> */}
            <Field
                component={AntInput}
                name="wordsCount"
                type="number"
                label="Words compare count"
                validate={validateRequired}
                hasFeedback
            />

            <ul>
                <h3>Заучивание слов</h3>
                <li>1. Выбор изсписка</li>
                <li>2. Написание слова</li>
                <li>3. Произнесение слова</li>
            </ul>
            
        </Form>
    )
}

export default CarTrenerSettingsForm