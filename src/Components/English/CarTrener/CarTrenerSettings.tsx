import React, { ReactNode, useState } from 'react'
import { Form, Field, FormikProps } from "formik"
import { AntInput} from '../../../utils/Formik/CreateAntField'
import { validateRequired } from '../../../utils/Formik/ValidateFields'
import { Switch } from 'antd'

const CarTrenerSettingsForm: ((props: FormikProps<{}>) => ReactNode) = (props) => {
    const [checkType, setCheckType] = useState<'say'|'check'|'write'>('check')

    const onCheckTypeChange = (checkType: 'say'|'check'|'write') => {
        setCheckType(checkType)
        console.log(checkType)
        // props.values.checkType = checkType
        props.setValues({
            ...props.values,
            checkType
        })
        props.submitForm()
    }
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

                    <Switch key="1" className="mx-1" checkedChildren="check" unCheckedChildren="check" 
                        checked={checkType === 'check' ? true : false}
                        onChange={()=>{onCheckTypeChange('check')}}
                    />,
                    <Switch key="2" className="mx-1" checkedChildren="say" unCheckedChildren="say"
                        checked={checkType === 'say' ? true : false}
                        onChange={()=>{onCheckTypeChange('say')}}
                    />,
                    <Switch key="3" className="mx-1" checkedChildren="write" unCheckedChildren="write"
                        checked={checkType === 'write' ? true : false}
                        onChange={()=>{onCheckTypeChange('write')}}
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