import React from 'react'
import { ControllerMethodsType } from '../../../../../../../api/ControllerMethodsAPI'

type ControllerMethodsCodePropsType = {
    methodData: ControllerMethodsType | null
}

const ControllerMethodsCode: React.FC<ControllerMethodsCodePropsType> = (props) => {

    // console.log(props)

    return(
        <div>ControllerMethodsCode</div>
    )
}

export default ControllerMethodsCode