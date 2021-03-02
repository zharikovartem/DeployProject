import {connect} from 'react-redux'
import Backend from './Backend'
import { AppStateType } from '../../../../../../redux/store'
import { isMobile } from 'react-device-detect'
// import { getUsersList, updateUser, actions } from '../../../../../../redux/usersReducer'
import { getProjectList, getBackendData, updateBackend } from '../../../../../../redux/projectReducer'
import { UserType } from '../../../../../../redux/authReducer'
import { BackendType } from '../../../../../../api/projectAPI'
// import CurrentUserMobile from './CurrentUserMobile'

type OwnBackendPropsType = {
    projectId: number
}

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getProjectList: ()=>void,
    getBackendData: (projectid: number)=>void,
    updateBackend: (values: BackendType, backendId: number) =>void,
    // updateUser: (values: UserType, userId: number)=>void,
    // setUsersDataChanged: (isUsersDataChanged: boolean)=>void
}

export type BackendPropsType = MapPropsType & MapDispatchPropsType & OwnBackendPropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        projectsList: state.projects.projectList,
        isProjectsLoaded: state.projects.isProjectLoaded
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnBackendPropsType, AppStateType>(mapStateToProps, 
    {getProjectList, getBackendData, updateBackend}) 
    (Backend)
    

