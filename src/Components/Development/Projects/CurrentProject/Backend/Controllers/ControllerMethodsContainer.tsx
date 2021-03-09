import {connect} from 'react-redux'
import ControllerMethods from './ControllerMethods'
import { AppStateType } from '../../../../../../redux/store'
import { getControllersList, createController, getModelsList } from '../../../../../../redux/projectReducer'
// import { ModelsType } from '../../../.././../api/projectAPI'

type OwnControllerMethodsPropsType = {
    // backendId: number
}

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    // getControllersList: (backendId: number) => void
    // createController: (values: any) => void,
    // getModelsList: (backendId: number) => void,
}

export type ControllerMethodsPropsType = MapPropsType & MapDispatchPropsType & OwnControllerMethodsPropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        controllersList: state.projects.controllersList,
        modelsList: state.projects.modelsList
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnControllerMethodsPropsType, AppStateType>(mapStateToProps, 
    {}) 
    (ControllerMethods)
    

