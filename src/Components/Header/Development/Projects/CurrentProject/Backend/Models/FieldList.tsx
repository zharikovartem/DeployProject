import { Button } from 'antd'
import React from 'react'

type FieldListPropsType = {
    fields: Array<any>
    openModalToAddField: (target: any | null)=>void,
    deleteField:(fieldId: number)=>void
}

const FieldList: React.FC<FieldListPropsType> = (props) => {
    return(
        <div key="fieldList">
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
    isNew: boolean
    openModalToAddField: (target: any | null)=>void,
    deleteField:(fieldId: number)=>void
    fieldId: number
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