import React, {useEffect} from 'react'
import { FieldType } from '../../../../api/projectAPI'
import {ModelCodePropsType} from './ModelCodeContainer'

const ModelCode: React.FC<ModelCodePropsType> = (props) => {
    useEffect( ()=> {
        console.log('props.codeTargetName changed')
    },[props.codeTargetName])

    console.log(props)

    // str[0].toUpperCase() + str.slice(1)
    return(
        <div>
            <li>!!!table name</li>
            <li>Field type</li>
            <li>namespace</li>

            <h5>ModelCode:</h5>

            <code>{'<?php'}</code>
            <br/><br/>
            <code>{'namespace App;'}</code>
            <br/><br/>
            <code>{'use Illuminate\\Database\\Eloquent\\Model;'}</code><br/>
            {props.codeData.soft_delete ? 
                <><code>{'use Illuminate\\Database\\Eloquent\\SoftDeletes;'}</code><br/></>
            :
                null
            }
            {props.codeData.db ? 
                <><code>{'use Illuminate\\Support\\Facades\\DB;'}</code><br/></>
            :
                null
            }
            
            
            <br/>
            <code>{'class '+props.codeTargetName[0].toUpperCase()+props.codeTargetName.slice(1)+' extends Model'}</code><br/>
            
            <code>{'{'}</code><br/>

            {props.codeData.soft_delete ? 
                <><code>{tab(1,'use SoftDeletes;')}</code><br/></>
            :
                null
            }
            

            <Fillable codeRowsArray={props.codeRowsArray}/>

            <Hidden codeRowsArray={props.codeRowsArray}/>

            <code>{'}'}</code><br/>

            {/* {props.codeRowsArray.map( (item: any) => {
                return(
                    <div>
                        {item.name}
                    </div>
                )
            })} */}

            <h5>Migration code:</h5>

            <code>{'<?php'}</code>
            <br/><br/>
            <code>{'use Illuminate\\Database\\Migrations\\Migration;'}</code><br/>
            <code>{'use Illuminate\\Database\\Schema\\Blueprint;'}</code><br/>
            <code>{'use Illuminate\\Support\\Facades\\Schema;'}</code><br/>
            <br/>
            <code>{'class Create'+props.codeTargetName[0].toUpperCase()+props.codeTargetName.slice(1)+'Table extends Migration'}</code><br/>
            <code>{'{'}</code><br/>
            <code>{tab(1,'public function up()')}</code><br/>
            <code>{tab(1,'{')}</code><br/>
            <code>{tab(2,'Schema::create("'+props.codeTargetName+'", function (Blueprint $table) {')}</code><br/>

                {props.codeRowsArray.map( (item: any) => {
                    const isNulleble = item.isNulleble ? '->nullable()' : ''
                    return(
                        <><code>{tab(3,'$table->'+getFieldtype(item)+'("'+item.name+'")'+isNulleble+';')}</code><br/></>
                    )
                })}
                {props.codeData.soft_delete ? 
                <><code>{tab(3,'$table->softDeletes();')}</code><br/></>
                : null}
                <><code>{tab(3,'$table->timestamps();')}</code><br/></>

            <code>{tab(2,'});')}</code><br/>
            <code>{tab(1,'}')}</code><br/>
            <code>{'}'}</code><br/>
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
            <div>
                <br/>
                <code>{tab(1,'protected $fillable = [')}</code><br/>
                
                {fields.map( (item: any) => {
                    return(
                        <div key={item.name}>
                        <>&nbsp;&nbsp;&nbsp;&nbsp;</>
                        <>&nbsp;&nbsp;&nbsp;&nbsp;</>
                        <>&nbsp;&nbsp;&nbsp;&nbsp;</>
                        <>&nbsp;&nbsp;&nbsp;&nbsp;</>
                        <code>{'"'+item.name+'", '}</code><br/>
                        </div>
                    )
                })}
                
                <code>{tab(1,'];')}</code><br/>
            </div>
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
            <code>{ tab(1,'protected $hidden = [') }</code><br/>
            
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
    const getTabs = ():Array<JSX.Element> => {
        let i = 1
        let tabs: Array<JSX.Element> = []
        while (i<=count) {
            i++
            tabs.push(<>&nbsp;&nbsp;&nbsp;&nbsp;</>)
        }
        return tabs
    }

    return (
        <>
            <>{getTabs()}</>
            {text}
        </>
    )
}

const getFieldtype = (field: FieldType ) => {
    console.log(field.name, '=',field.type)
    if (field.isPrimary) {
        return 'bigIncrements'
    } else {
        switch (field.type) {
            case 'bigint':
                return 'bigInteger'
    
            case 'varchar':
                return 'string'
    
            default:
                return field.type
        }
    }
}