import React, { useState, useEffect } from 'react'
import { isMobile } from "react-device-detect"
import {
    DatePicker,
    Form,
    Input,
    TimePicker,
    Select,
    Checkbox
} from "antd"
import enUs from 'antd-mobile/lib/date-picker/locale/en_US'
import {
    List,
    InputItem,
    Checkbox as CheckboxMobile,
    TextareaItem,
    Picker,
    DatePicker as DatePickerMobile,
} from 'antd-mobile'

const FormItem = Form.Item
const Option = Select.Option
const CheckboxItem = CheckboxMobile.CheckboxItem
const { TextArea } = Input;

const CreateAntField = (AntComponent: any) => (
    {
        field,
        form,
        hasFeedback,
        label,
        selectOptions,
        submitCount,
        type,
        ...props
    }: any
) => {

    const touched = form.touched[field.name];
    const submitted = submitCount > 0;
    const hasError = form.errors[field.name];
    const submittedError = hasError && submitted;
    const touchedError = hasError && touched;

    const onInputChange = (value: any) => {
        //console.log(value)
        //console.log(props)

        if (props.onChange) {
            console.log('onChange field in create', value)
            props.onChange(field.name, value)
        }

        if (value === undefined) {
            if (type === 'select' || type === 'time') {
                //console.log('1')
                form.setFieldValue(field.name, null)
            }
        } else if(value === null) {
            //console.log('2')
            form.setFieldValue(field.name, null)
        } else if (type === 'checkbox') {
            //console.log('3')
            form.setFieldValue(field.name, value.target.checked)
        } else if (value.target) {
            //console.log('4')
            form.setFieldValue(field.name, value.target.value)
        } else {
            if (type === 'time') {
                //console.log('5')
                form.setFieldValue(field.name, value)
            } else if (Array.isArray(value)) {
                //console.log('6')
                if (props.mode && props.mode === 'multiple') {
                    form.setFieldValue(field.name, value) // Для select mode === 'multiple'
                } else {
                    form.setFieldValue(field.name, value[0])
                }
            } else {
                //console.log('7')
                form.setFieldValue(field.name, value)
            }
        }

    }

    const onChange = (value: string | React.ChangeEvent<HTMLInputElement>) => {
        if (props.onChange) {
            console.log('onChange field in create')
            props.onChange(field.name, value)
        }
        if (typeof value !== "string" && value.target.type === 'checkbox') {
            form.setFieldValue(field.name, value.target.checked)
        } else {
            form.setFieldValue(field.name, value)
        }
    }

    const onBlur = () => form.setFieldTouched(field.name, true);

    // console.log('props.: ', props)
    
    return (
        <FormItem
            label={!isMobile ? label : null}
            hasFeedback={
                (hasFeedback && submitted) || (hasFeedback && touched) ? true : false
            }
            help={submittedError || touchedError ? hasError : false}
            validateStatus={submittedError || touchedError ? "error" : "success"}
        >
            {isMobile ?
                <MobileComponent
                    {...props}
                    AntComponent={AntComponent}
                    onBlur={onBlur}
                    type={type}
                    onInputChange={onInputChange}
                    onChange={onChange}
                    label={label}
                    selectOptions={selectOptions}
                    value={field.value}
                    onOk={props.onSelect}
                />
                :
                <AntComponent
                    {...field}
                    {...props}
                    allowClear={selectOptions ? "true" : "false"}
                    onBlur={onBlur}
                    onChange={type ? onInputChange : onChange}
                    checked={field.value}
                >
                    {selectOptions &&
                        selectOptions.map((item: any) => <Option title={item.name} value={item.value} key={item.name}>{item.name}</Option>)}

                    {/* {
                        type === 'radio' ? 
                        // <label htmlFor={'1'}>
                            // {label} 
                            <>label</>
                        // </label>
                        : null
                    } */}
                </AntComponent>
            }

        </FormItem>
    )
}



type SelectOptionsType = {
    name: string,
    value: string
}

type MobileComponentType = {
    onInputChange: (value: any) => void,
    selectOptions: Array<SelectOptionsType>,
    AntComponent: any,
    onBlur: () => void,
    type: 'select' | 'date' | 'text' | 'number' | 'password' | 'time' | 'checkbox' | 'textarea',
    onChange: (value: any) => void,
    label: string,
    value: any,
    onOk: (val:any)=>void,
    disabled?: boolean,
}

const MobileComponent: React.FC<MobileComponentType> = (props) => {
    const [defaultValue, setValue] = useState(props.type === 'select' ? [props.value] : props.value)

    useEffect(() => {
        if (props.type === 'select' && !Array.isArray(props.value) ) {
            setValue([props.value])
        } else {
            setValue(props.value)
        }
    }, [props.value, props.type])

    const onInputChange = (value: any) => {
        setValue(value)
        props.onInputChange(value)
        if (props.type === 'checkbox') {
            props.onOk(value)
        }
    }

    const onPickerChange = (value:any) => {
        setValue(value)
    }

    const onOk = (value:any) => {
        setValue(value)
        if (props.onOk) {
            props.onOk(value)
        }
        
    }

    type DataType = Array<
        {
            label: string,
            value: string,
            key: string
        }
    >

    let data: DataType
    if (props.selectOptions !== null && props.selectOptions !== undefined) {
        data = props.selectOptions.map((item: SelectOptionsType) => {
            return (
                {
                    label: item.name,
                    value: item.value,
                    key: item.name
                }
            )
        })
    } else {
        data = []
    }

    const mode = props.type
    
    const autoHeight = props.type === 'textarea' ? {autoHeight: true} : null
    const onPickerChangeCheck = props.type === 'date' || 'time' ? onPickerChange : null
    const disabled = props.disabled ? {disabled: true} : null

    let onOkCheck
    if (props.AntComponent.onOk) {
        onOkCheck = onOk
    }

    if (props.disabled) {

    }   

    return (
        <List>
            <props.AntComponent
                onBlur={props.onBlur}
                type={props.type}
                mode={mode}

                defaultValue={defaultValue}
                defaultChecked={defaultValue}
                value={defaultValue}

                key={props.label}
                title={props.label}
                locale={enUs}
                {...autoHeight}
                {...disabled}

                className={props.type === 'text' ? 'pl-0' : null}
                data={data}
                cols={1}
                
                {...onOkCheck}
                {...onPickerChangeCheck}
                onChange={props.type ? onInputChange : props.onChange}
            >
                <List.Item
                    className="pl-0"
                >
                    {props.label}
                </List.Item>
            </props.AntComponent>
        </List>
    )
}


export const AntSelect = !isMobile ? CreateAntField(Select) : CreateAntField(Picker)
export const AntDatePicker = !isMobile ? CreateAntField(DatePicker) : CreateAntField(DatePickerMobile)
export const AntInput = !isMobile ? CreateAntField(Input) : CreateAntField(InputItem)
export const AntInputPassword = !isMobile ? CreateAntField(Input.Password) : CreateAntField(InputItem)
export const AntTimePicker = !isMobile ? CreateAntField(TimePicker) : CreateAntField(DatePickerMobile)
export const AntCheckbox = !isMobile ? CreateAntField(Checkbox) : CreateAntField(CheckboxItem)
export const AntTextArea = !isMobile ? CreateAntField(TextArea) : CreateAntField(TextareaItem)
