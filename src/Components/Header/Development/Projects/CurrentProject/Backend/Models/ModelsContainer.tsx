import {connect} from 'react-redux'
import Models from './Models'
import { AppStateType } from '../../../../../../../redux/store'
import { getModelsList, updateModel } from '../../../../../../../redux/projectReducer'
import { ModelsType } from '../../../../../../../api/projectAPI'

type OwnModelsPropsType = {

}

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getModelsList: (backendId: number) => void
    updateModel: (values: ModelsType, modelId: number) => void
}

export type ModelsPropsType = MapPropsType & MapDispatchPropsType & OwnModelsPropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        modelsList: state.projects.modelsList
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnModelsPropsType, AppStateType>(mapStateToProps, 
    {getModelsList, updateModel}) 
    (Models)
    

