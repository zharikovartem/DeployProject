import { Button, Input, TreeSelect } from 'antd'
import { TreeNode } from 'rc-tree-select'
import React, {useState, useEffect} from 'react'
import { ControllerMethodsType } from '../../../../../../../api/ControllerMethodsAPI'
import { ResponreItemsType } from './ControllerMethodsForm'

type ValueType = {
    type: 'Response' | 'method' | '',
    methodId?: number,
    methodName?: string,
    responseItems?: Array<ResponreItemsType>
}

type ResponseItemPropsType = {
    responseInit: ValueType
    initialValues: any,
    setResponseValues: (responseValues: ValueType)=>void
    // methodList !!!!!
}

const ResponseItem: React.FC<ResponseItemPropsType> = (props) => {
    const [value, setValue] = useState<ValueType>(props.responseInit)
    // console.log(props)

    useEffect( () => {
        setValue(props.responseInit)
    },[props.responseInit])

    const onResponseTypeChange = (typeValue: 'Response'|'method'|'', labelList: React.ReactNode[], extra: any) => {
        let newResponse: Array<ResponreItemsType> = []
        let methodId: number = 0
        let methodName: string = ''
        let type: 'Response'|'method'|'' = ''

        if(typeValue === 'Response') {
            type = typeValue
            // if(value.responseItems && value.responseItems.length === 0) {
                newResponse.push({
                    key: '',
                    variable: ''
                })
            // }
        } else {
            // console.log('GO TO METHOD!!!',typeValue)
            // console.log(props)
            methodId = props.initialValues.controllerMethodsList.filter( (item: any) => item.name === typeValue )[0].id
            methodName = props.initialValues.controllerMethodsList.filter( (item: any) => item.name === typeValue )[0].name
            // console.log(methodId)

            type = 'method'
        }

        setValue({...value, type: type, responseItems: newResponse, methodId: methodId, methodName: methodName})
        props.setResponseValues({...value, type: type, responseItems: newResponse, methodId: methodId, methodName: methodName})

        // console.log(typeValue)
        // console.log(labelList)
        // console.log(extra.triggerValue)
    }

    const onRowChange = (rowValue: string, elementNumber: number, param: 'key'|'variable') => {
        // console.log(rowValue)
        // console.log(elementNumber)
        // console.log(param)

        let responseItems: Array<ResponreItemsType> = value.responseItems ? value.responseItems : []
        if (responseItems[elementNumber]) {
            responseItems[elementNumber][param] = rowValue
        }
        setValue({
            ...value,
            responseItems: responseItems
        })
        props.setResponseValues({
            ...value,
            responseItems: responseItems
        })
    }

    const addParam = () => {
        let responseItems: Array<ResponreItemsType> = value.responseItems ? [... value.responseItems] : []
        responseItems.push({key:'', variable:''})
        setValue({...value, responseItems: responseItems })
    }

    const dellParam = () => {
        let responseItems: Array<ResponreItemsType> = value.responseItems ? [... value.responseItems] : []
        responseItems.pop()
        setValue({...value, responseItems: responseItems })
    }

    console.log('ResponseItem value: ', value)
    console.log('ResponseItem props: ', props)

    return(
        <>
        <div className="row mt-1 mb-3">
            <div className="ant-col ant-form-item-label mt-2">
                Response:
            </div>
            <div className="col-4">
                <TreeSelect
                    className=" ml-2 TreeSelect_Request_Type"
                    style={{ width: '100%' }}
                    showSearch
                    value={value.type === 'method' ?  
                    props.initialValues.controllerMethodsList.filter((controllerMethod: ControllerMethodsType)=>controllerMethod.id === value.methodId)[0].name
                    : value.type
                    }
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="Reqest type"
                    allowClear
                    showCheckedStrategy={'SHOW_PARENT'}
                    onChange={onResponseTypeChange}

                    // treeCheckable={true}
                >
                    <TreeNode
                        // selectable={false} 
                        // per_id={props.item.id} 
                        value="Response" 
                        title="Response"
                    ></TreeNode>
                    <TreeNode
                        selectable={false} 
                        // per_id={props.item.id} 
                        value="method" 
                        title="Method"
                    >
                        {
                            props.initialValues.controllerMethodsList !== undefined ?
                            // @ts-ignore
                            props.initialValues.controllerMethodsList.filter((controllerMethod: ControllerMethodsType)=>controllerMethod.name !== props.initialValues.name)
                                .map(( controllerMethod: ControllerMethodsType ) => {
                                return (
                                    <TreeNode 
                                        key={controllerMethod.name}
                                        // per_id={props.item.id} 
                                        value={controllerMethod.name} 
                                        title={controllerMethod.name}
                                    ></TreeNode>
                                )
                            })
                            : null
                        }
                    </TreeNode>
                </TreeSelect>
            </div>
            <div className="col-4">
                {value.type === 'Response' ? 
                    <>
                        <Button className="ml-2" type="primary" onClick={addParam}>Add param</Button>
                        <Button className="ml-2" type="primary" onClick={dellParam}>Del param</Button>
                    </>
                :null}
            </div>
        </div>
        {value.type === 'Response' ?
            <div className="row mt-1 mb-3">
                <ResponseRows 
                    responseRows={value.responseItems ? value.responseItems : []}
                    onRowChange={onRowChange}
                />
            </div>
        :
        null}
        {value.type === 'method' ?
            <div className="row mt-1 mb-3">
                methodId: {value.methodId}
            </div>
        :
        null}
        </>
    )
}

export default ResponseItem

type ResponseRowsPropsType = {
    responseRows: Array<ResponreItemsType>
    onRowChange: (value: string, elementNumber: number, param: 'key'|'variable')=>void
}

const ResponseRows: React.FC<ResponseRowsPropsType> = (props) => {
    // console.log(props)

    const onNameChange = (event: any) => {
        props.onRowChange(event.target.value, Number(event.target.name), 'key')
    }

    const onVariableChange = (event: any) => {
        props.onRowChange(event.target.value, Number(event.target.name), 'variable')
    }

    return(
        <>
            {props.responseRows.map( (item, index: number)=> {
                return(
                // <>
                <div key={index.toString()} className="row w-100" >
                        <div className="ant-col ant-form-item-label pr-2 mt-3">
                            param {index+1}:
                        </div>
                    <div className="col-4 mt-2">
                        <Input 
                            className="w-100 ml-2" 
                            value={item.key} 
                            name={index.toString()}  
                            onChange={onNameChange} 
                            placeholder="Param name" 
                        />
                    </div>
                    <div className="col-4 mt-2">
                        <Input 
                            className="w-100 ml-2" 
                            value={item.variable} 
                            name={index.toString()} 
                            onChange={onVariableChange} 
                            placeholder="Param variable" 
                        />
                    </div>
                </div>
                // </>
                )
            })}
        </>
    )
}