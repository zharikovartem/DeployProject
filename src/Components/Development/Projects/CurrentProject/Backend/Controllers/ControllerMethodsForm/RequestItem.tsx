import { Input, TreeSelect } from 'antd'
import { TreeNode } from 'rc-tree-select'
import React, { useState, useEffect } from 'react'
import { RequestType } from './ControllerMethodsForm'

type RequestItemPropsType = {
    item: RequestType,
    initialValues: any,
    onRowChange: (id: number, type: string, name: string)=>void
}

const RequestItem: React.FC<RequestItemPropsType> = (props) => {
    const [value, setValue] = useState<RequestType>(props.item)

    useEffect( () => {
        setValue(props.item)
    },[props.initialValues])

    const onRequestTypeChange = (typeValue: string, labelList: React.ReactNode[], extra: any) => {
        setValue({...value, type: typeValue})
        if (typeValue) {
            props.onRowChange(props.item.id, typeValue, props.item.name)
        } else {
            props.onRowChange(props.item.id, '', props.item.name)
        }
        
    }

    const onRequestNameChange = (event: any) => {
        setValue({...value, name: event.target.value})
        props.onRowChange(props.item.id, props.item.type, event.target.value)
    }

    return (
        <div key={props.item.id} className="row mt-1">
            <div className="ant-col ant-form-item-label mt-2">
                {props.item.label}
            </div>

            <div className="col-4">
                <TreeSelect
                    className=" ml-2 TreeSelect_Request_Type"
                    style={{ width: '100%' }}
                    showSearch
                    value={value.type}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="Reqest type"
                    allowClear
                    showCheckedStrategy={'SHOW_PARENT'}
                    onChange={onRequestTypeChange}
                >
                    <TreeNode selectable={false} per_id={props.item.id} value="model" title="Model">
                        {
                            // @ts-ignore
                            props.initialValues.modelsList.map((model: ModelsType) => {
                                return (
                                    <TreeNode per_id={props.item.id} value={model.name} title={model.name}></TreeNode>
                                )
                            })

                        }
                    </TreeNode>
                    <TreeNode per_id={props.item.id} value="Request" title="Request"></TreeNode>
                    <TreeNode selectable={false} per_id={props.item.id} value="list" title="List"></TreeNode>
                </TreeSelect>
            </div>
            <div className="col-4">
                <Input className="w-100 ml-2" value={value.name} name={props.item.id.toString()} onChange={onRequestNameChange} placeholder="Param name" />
            </div>

        </div>
    )
}

export default RequestItem