import {connect} from 'react-redux'
import ControllerMethods from './ControllerMethods'
import { AppStateType } from '../../../../../../redux/store'
import { getControllersList, createController, getModelsList, getControllerMethodsList } from '../../../../../../redux/projectReducer'
import { ControllersType } from '../../../../../../api/projectAPI'
// import { ModelsType } from '../../../.././../api/projectAPI'

type OwnControllerMethodsPropsType = {
    controllerData: ControllersType
}

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getControllerMethodsList: ()=>void,
    // getControllersList: (backendId: number) => void
    // createController: (values: any) => void,
    // getModelsList: (backendId: number) => void,
}

export type ControllerMethodsPropsType = MapPropsType & MapDispatchPropsType & OwnControllerMethodsPropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        controllersList: state.projects.controllersList,
        modelsList: state.projects.modelsList,
        controllerMethodsList: state.projects.controllerMethodsList
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnControllerMethodsPropsType, AppStateType>(mapStateToProps, 
    {getControllerMethodsList}) 
    (ControllerMethods)
    

