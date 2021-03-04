import {connect} from 'react-redux'
import Models from './Models'
import { AppStateType } from '../../../../../../../redux/store'
import { getModelsList, updateModel, createModel } from '../../../../../../../redux/projectReducer'
import { ModelsType } from '../../../../../../../api/projectAPI'

type OwnModelsPropsType = {
    backendId: number
}

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getModelsList: (backendId: number) => void
    updateModel: (values: ModelsType, modelId: number) => void,
    createModel: (values: ModelsType) => void
}

export type ModelsPropsType = MapPropsType & MapDispatchPropsType & OwnModelsPropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        modelsList: state.projects.modelsList
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnModelsPropsType, AppStateType>(mapStateToProps, 
    {getModelsList, updateModel, createModel}) 
    (Models)
    

