import React, { ReactNode } from 'react'
import { Form, Field, FormikProps } from "formik"
import { AntInput, AntCheckbox, AntInputPassword, AntInputNumber } from '../../../utils/Formik/CreateAntField'
import { validateEmail, validateRequired } from '../../../utils/Formik/ValidateFields'
import { Switch } from 'antd'

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
                name="compareCount"
                type="number"
                label="Words compare count"
                validate={validateRequired}
                hasFeedback
            />
            <Field
                component={AntInput}
                name="learnCount"
                type="number"
                label="Words learn count"
                validate={validateRequired}
                hasFeedback
            />

                    <Switch key="1" className="mx-1" checkedChildren="show" unCheckedChildren="show" 
                        // checked={isShowRelations}
                        // onClick={(checked: boolean, event: Event) => {
                        //     setIsShowRelations(!isShowRelations)
                        //     event.stopPropagation();
                        // }}
                    />,
                    <Switch key="2" className="mx-1" checkedChildren="audio" unCheckedChildren="audio"
                        // onClick={(checked: boolean, event: Event) => {
                        //     setIsShowAudio(!isShowAudio)
                        //     event.stopPropagation();
                        // }}
                    />,
                    <Switch key="3" className="mx-1" checkedChildren="lern" unCheckedChildren="lern"
                        // checked = {isLern}
                        // onClick={(checked: boolean, event: Event) => {
                        //     if (checked) {
                        //         setIsShowRelations(false)
                        //     }
                        //     setIsLern(checked)
                        //     event.stopPropagation();
                        // }}
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