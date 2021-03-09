import {connect} from 'react-redux'
import Projects, { OwnProjectsPropsType } from './Projects'
import { AppStateType } from '../../../redux/store'
import {getProjectList} from './../../../redux/projectReducer'

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getProjectList: ()=>void,
}

export type ProjectsPropsType = MapPropsType & MapDispatchPropsType & OwnProjectsPropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        projectList: state.projects.projectList,
        isProjectListLoaded: state.projects.isProjectLoaded
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnProjectsPropsType, AppStateType>(mapStateToProps, 
    {getProjectList}) 
    (Projects)
    

