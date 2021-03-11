import React from 'react'
import { ControllerMethodsType } from '../../../../../../../api/ControllerMethodsAPI'
import { ControllersType } from '../../../../../../../api/projectAPI'
import { tab } from '../../../../../Code/Model/ModelCode'

type ControllerMethodsCodePropsType = {
    methodData: ControllerMethodsType | null,
    controllerData: ControllersType
}

const ControllerMethodsCode: React.FC<ControllerMethodsCodePropsType> = (props) => {

    let request:Array<any> = []
    if (props.methodData?.request) {
        console.log(JSON.parse(props.methodData?.request) )
        request = JSON.parse(props.methodData?.request)
    }

    console.log(props)

    return(
        <>
        <h5>ControllerMethodsCode:</h5>
        {/* <code>{tab(0,'<?php')}</code><br/>
        <br/>
        <code>{tab(0,'namespace App\\Http\\Controllers;')}</code><br/>
        <br/>
        {
            props.controllerData.models.map( (item) => {
                return <><code>{tab(0,'namespace App\\Http\\'+item.name+';')}</code><br/></>
            })
        }
        <code>{tab(0,'use Illuminate\\Http\\Request;')}</code><br/>
        <br/>
        <code>{tab(0,'class '+props.controllerData.name+' extends Controller')}</code><br/>
        <code>{tab(0,'{')}</code><br/> */}

            <code>{tab(1,'/**')}</code><br/>
            <code>{tab(1,'* Descriptions')}</code><br/>
            {/* <code>{tab(1,'* @param  \\Illuminate\\Http\\Request  $request')}</code><br/> */}
            {request.map( item => {
                return <><code>{tab(1,'* @param  \\Illuminate\\Http\\'+item.type+'  $'+item.name)}</code><br/></>
            })}
            <code>{tab(1,'* @return \\Illuminate\\Http\\Response')}</code><br/>
            <code>{tab(1,'*/')}</code><br/>

            <code>{tab(1,'public function '+props.methodData?.name+'(Request $request)')}</code><br/>
            <code>{tab(1,'{')}</code><br/>
                <code>{tab(2,'...')}</code><br/>
                <code>{tab(2,'return response()->json([')}</code><br/>
                {/* <br/> */}
                <code>{tab(3,'"key"=>"$value" // example')}</code><br/>
                <code>{tab(2,'], 200);')}</code><br/>
            <code>{tab(1,'}')}</code><br/>
        {/* <code>{tab(0,'}')}</code><br/> */}
        
        </>
    )
}

export default ControllerMethodsCode