import { Button } from 'antd'
import React from 'react'

type FieldListPropsType = {
    fields: Array<any>
    openModalToAddField: (target: any | null)=>void,
}

const FieldList: React.FC<FieldListPropsType> = (props) => {
    // console.log(props.fields)
    return(
        <>
        {
            props.fields.map( (item: any) => {
                return(
                    <FieldRow 
                        fieldName={item.name}
                        fieldType={item.type}
                        // isNulleble?: boolean,
                        isNew={false}
                        openModalToAddField={props.openModalToAddField}
                        fieldId={item.id}
                    />
                ) 
            })
        }
        </>
    )
}

export default FieldList

type FieldRowPropsType = {
    fieldName: string | undefined,
    fieldType: string | undefined,
    isNulleble?: boolean,
    isNew: boolean
    openModalToAddField: (target: any | null)=>void,
    fieldId?: number | null
}

const FieldRow: React.FC<FieldRowPropsType> = (props) => {
    return(
        <div key={props.fieldName} className="row py-2 border">
            <div className="col">{props.fieldName}</div>
            <div className="col">{props.fieldType}</div>
            <div className="col">isNulleble</div>
            <div className="col">
                <Button type="ghost" className="ml-2" size="small" onClick={()=>{props.openModalToAddField(props)}}>Edit</Button>
                <Button type="primary" size="small" className="ml-2" onClick={()=>{}}>Delete</Button>
            </div>
        </div>
    )
}