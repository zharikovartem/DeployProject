import React from 'react'
import {ModelCodePropsType} from './ModelCodeContainer'

const ModelCode: React.FC<ModelCodePropsType> = (props) => {

    console.log(props)

    const tab = (count: number, text?: string) => {
        return <>
        <>&nbsp;&nbsp;&nbsp;&nbsp;</>
        {text}</>
    }

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

            <code>{'}'}</code><br/>

            {props.codeRowsArray.map( (item: any) => {
                return(
                    <div>
                        {item.name}
                    </div>
                )
            })}
        </div>
    )
}

export default ModelCode