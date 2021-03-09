import {connect} from 'react-redux'
import CurrentProject from './CurrentProject'
import { AppStateType } from '../../../../redux/store'
import { isMobile } from 'react-device-detect'
import { getUsersList, updateUser, actions } from '../../../../redux/usersReducer'
import { getProjectList } from '../../../../redux/projectReducer'
import { UserType } from '../../../../redux/authReducer'
// import CurrentUserMobile from './CurrentUserMobile'

type OwnCurrentProjectPropsType = {
    match: any
    location: any
    history: any
}

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getProjectList: ()=>void,
    updateUser: (values: UserType, userId: number)=>void,
    // setUsersDataChanged: (isUsersDataChanged: boolean)=>void
}

export type CurrenProjectPropsType = MapPropsType & MapDispatchPropsType & OwnCurrentProjectPropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        projectsList: state.projects.projectList,
        isProjectsLoaded: state.projects.isProjectLoaded
        // errorMessage: state.task.errorMessage,
        // isInterval: state.task.isInterval,
        // taskSaveStatus: state.task.taskSaveStatus,
        // settings:state.auth.viewSettings,
        // appLocation: state.app.location,
        // viewSettings: state.auth.viewSettings,
        // isUsersDataChanged: state.users.isUsersDataChanged
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnCurrentProjectPropsType, AppStateType>(mapStateToProps, 
    {getProjectList, updateUser}) 
    (isMobile ? CurrentProject : CurrentProject)
    

