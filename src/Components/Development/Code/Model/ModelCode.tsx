import React from 'react'
import {ModelCodePropsType} from './ModelCodeContainer'

const ModelCode: React.FC<ModelCodePropsType> = (props) => {

    console.log(props)

    

    // str[0].toUpperCase() + str.slice(1)
    return(
        <div>
            <li>SoftDeletes</li>
            <li>DB</li>
            <li>namespace</li>

            <h5>ModelCode:</h5>

            <code>{'<?php'}</code>
            <br/><br/>
            <code>{'namespace App;'}</code>
            <br/><br/>
            <code>{'use Illuminate\\Database\\Eloquent\\Model;'}</code><br/>
            <code>{'use Illuminate\\Database\\Eloquent\\SoftDeletes;'}</code><br/>
            <code>{'use Illuminate\\Support\\Facades\\DB;'}</code><br/>
            <br/>
            <code>{'class '+props.codeTargetName[0].toUpperCase()+props.codeTargetName.slice(1)+' extends Model'}</code><br/>
            
            <code>{'{'}</code><br/>

            <code>{tab(1,'use SoftDeletes;')}</code><br/>

            <Fillable codeRowsArray={props.codeRowsArray}/>

            <Hidden codeRowsArray={props.codeRowsArray}/>

            <code>{'}'}</code><br/>

            {props.codeRowsArray.map( (item: any) => {
                return(
                    <div>
                        {item.name}
                    </div>
                )
            })}

            <br/><br/>
            <li>Migrate</li>
        </div>
    )
}

export default ModelCode

type FillableType = {
    codeRowsArray: Array<any>
}

const Fillable: React.FC<any> = (props) => {
    const fields: Array<any> = props.codeRowsArray.filter( (item: any) => item.fieldParam === 'fillable')
    if (fields.length > 0) {
        return(
            <>
            <br/>
            <code>{tab(1,'protected $fillable = [')}</code><br/>
            
            {fields.map( (item: any) => {
                return(
                    <>
                    <>&nbsp;&nbsp;&nbsp;&nbsp;</>
                    <>&nbsp;&nbsp;&nbsp;&nbsp;</>
                    <>&nbsp;&nbsp;&nbsp;&nbsp;</>
                    <>&nbsp;&nbsp;&nbsp;&nbsp;</>
                    <code>{'"'+item.name+'", '}</code><br/></>
                )
            })}
            
            <code>{tab(1,'];')}</code><br/>
            </>
        )
    } else {
        return <></>
    }
}

const Hidden: React.FC<any> = (props) => {
    const fields: Array<any> = props.codeRowsArray.filter( (item: any) => item.fieldParam === 'hidden')
    if (fields.length > 0) {
        return(
            <>
            <br/>
            <code>{tab(1,'protected $hidden = [')}</code><br/>
            
            {fields.map( (item: any) => {
                return(
                    <>
                    <>&nbsp;&nbsp;&nbsp;&nbsp;</>
                    <>&nbsp;&nbsp;&nbsp;&nbsp;</>
                    <>&nbsp;&nbsp;&nbsp;&nbsp;</>
                    <>&nbsp;&nbsp;&nbsp;&nbsp;</>
                    <code>{'"'+item.name+'", '}</code><br/></>
                )
            })}
            
            <code>{tab(1,'];')}</code><br/>
            </>
        )
    } else {
        return <></>
    }
}

const tab = (count: number, text?: string) => {
    return <>
    <>&nbsp;&nbsp;&nbsp;&nbsp;</>
    {text}</>
}
