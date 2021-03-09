import { Button } from 'antd'
import React from 'react'
import { FieldListPropsType } from './FieldListContainer'

// type FieldListPropsType = {
//     fields: Array<any>
//     openModalToAddField: (target: any | null)=>void,
//     deleteField:(fieldId: number)=>void
// }

const FieldList: React.FC<FieldListPropsType> = (props) => {

    const showCode = () => {
        console.log(props)
        props.setShowCodeModal(true, 'model', props.fields, props.targetName)
    }

    return(
        <div key="fieldList">
            <div className="w-100 d-flex flex-row mt-2 mb-2">
                <Button type="primary" className="mr-1 ml-auto" onClick={()=>{console.log('check')}} >Check</Button>
                <Button type="primary" className="mr-4 ml-1" onClick={showCode} >Code</Button>
            </div>
        {
            props.fields.map( (item: any) => {
                return(
                    <div key={item.name}>
                    <FieldRow 
                        fieldName={item.name}
                        fieldType={item.type}
                        isNulleble={item.isNulleble}
                        isPrimary={item.isPrimary}
                        isNew={false}
                        openModalToAddField={props.openModalToAddField}
                        fieldId={item.id}
                        deleteField={props.deleteField}
                        fieldParam={item.fieldParam}
                    />
                    </div>
                ) 
            })
        }
        </div>
    )
}

export default FieldList

type FieldRowPropsType = {
    fieldName: string | undefined,
    fieldType: string | undefined,
    isNulleble?: boolean,
    isPrimary?: boolean,
    isNew: boolean,
    fieldId: number,
    fieldParam: string

    openModalToAddField: (target: any | null)=>void,
    deleteField:(fieldId: number)=>void
}

const FieldRow: React.FC<FieldRowPropsType> = (props) => {

    const deleteField = (fieldId: number) => {
        props.deleteField(fieldId)
    }
    const rowBG = props.isPrimary ? 'bg-light' : null

    return(
        <div className={'row py-2 border '+rowBG}>
            <div className="col">{props.fieldName}</div>
            <div className="col">{props.fieldType}</div>
            <div className="col">{props.isNulleble ? 'null' : null}</div>
            <div className="col">
                <Button type="ghost" className="ml-2" size="small" onClick={()=>{props.openModalToAddField({...props})}}>Edit</Button>
                <Button type="primary" size="small" className="ml-2" onClick={()=>{ deleteField(props.fieldId) }}>Delete</Button>
            </div>
        </div>
    )
}