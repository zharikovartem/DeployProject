import {connect} from 'react-redux'
import Models from './Models'
import { AppStateType } from '../../../../../../../redux/store'
import { getUsersList, updateUser, actions } from '../../../../../../../redux/usersReducer'
import { getModelsList } from '../../../../../../../redux/projectReducer'
import { UserType } from '../../../../../../../redux/authReducer'
// import CurrentUserMobile from './CurrentUserMobile'

type OwnModelsPropsType = {
    // match: any
    // location: any
    // history: any
}

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getModelsList: (backendId: number) =>void
    // setUsersDataChanged: (isUsersDataChanged: boolean)=>void
}

export type ModelsPropsType = MapPropsType & MapDispatchPropsType & OwnModelsPropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        modelsList: state.projects.modelsList
        // projectsList: state.projects.projectList,
        // isProjectsLoaded: state.projects.isProjectLoaded
        // errorMessage: state.task.errorMessage,
        // isInterval: state.task.isInterval,
        // taskSaveStatus: state.task.taskSaveStatus,
        // settings:state.auth.viewSettings,
        // appLocation: state.app.location,
        // viewSettings: state.auth.viewSettings,
        // isUsersDataChanged: state.users.isUsersDataChanged
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnModelsPropsType, AppStateType>(mapStateToProps, 
    {getModelsList}) 
    (Models)
    

