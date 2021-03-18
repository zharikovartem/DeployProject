import React, { useEffect, useState } from 'react'
import { ControllerMethodsType } from '../../../../../../../api/ControllerMethodsAPI'
import { ControllersType } from '../../../../../../../api/projectAPI'
import { tab } from '../../../../../Code/Model/ModelCode'
import { FullControllerMethodCodePropsType } from './FullControllerMethodCodeContainer'
import ControllerMethodsCode from './../ControllerMethodsForm/ControllerMethodsCode'

const FullControllerMethodCode:React.FC<FullControllerMethodCodePropsType> = (props) => {
    const [methods, setMethods] = useState<Array<ControllerMethodsType>>()
    useEffect(() => {
        if (props.controllerMethodsList.length === 0) {
            props.getControllerMethodsList()
        }
    }, [])
    useEffect(() => {
        setMethods(props.controllerMethodsList.filter(item=> item.controller_id === props.controllerData.id))
    }, [props.controllerMethodsList])

    console.log(props)
    console.log(methods)

    return(
        <div className="text-left">
            <code>{tab(0, '<?php')}</code><br/>
            <br/>
            <code>{tab(0, 'namespace App\\Http\\Controllers;')}</code><br/>
            <br/>
            <code>{tab(0, 'use App\\'+props.controllerData.models[0].name+';')}</code><br/>
            <code>{tab(0, 'use Illuminate\\Http\\Request;')}</code><br/>
            <br/>
            <code>{tab(0, 'class '+props.controllerData.name+' extends Controller')}</code><br/>
            <code>{tab(0, '{')}</code><br/>
            <code>{tab(1, '//...')}</code><br/>
            {
                methods?.map(method => {
                    return (
                        <ControllerMethodsCode
                            methodData={method}
                            controllerData={props.controllerData}
                        />
                    ) 
                })
            }
            <code>{tab(0, '}')}</code><br/>
        </div>
    )
}

export default FullControllerMethodCode