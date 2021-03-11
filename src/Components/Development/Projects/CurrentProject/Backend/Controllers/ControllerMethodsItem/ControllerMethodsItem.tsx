import React from 'react'
import { ControllerMethodsType } from '../../../../../../../api/ControllerMethodsAPI'

type ControllerMethodsItemPropsType = {
    item: ControllerMethodsType
}
const ControllerMethodsItem: React.FC<ControllerMethodsItemPropsType> = (props) => {
    return(
        <div>{props.item.name}</div>
    )
}

export default ControllerMethodsItem