import {connect} from 'react-redux'
import Controllers from './Controllers'
import { AppStateType } from '../../../../../../../redux/store'
import { getControllersList, createController } from '../../../../../../../redux/projectReducer'
import { ModelsType } from '../../../../../../../api/projectAPI'

type OwnControllersPropsType = {
    backendId: number
}

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getControllersList: (backendId: number) => void
    createController: (values: any) => void,
    // createModel: (values: ModelsType) => void
}

export type ControllersPropsType = MapPropsType & MapDispatchPropsType & OwnControllersPropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        controllersList: state.projects.controllersList
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnControllersPropsType, AppStateType>(mapStateToProps, 
    {getControllersList, createController}) 
    (Controllers)
    

