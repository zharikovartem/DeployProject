import {connect} from 'react-redux'
import OldProjectForm, { OwnOldProjectFormPropsType } from './OldProjectForm'
import { AppStateType } from './../../../../../redux/store'
import {getProjectList} from './../../../../../redux/projectReducer'
// import {getTaskList, createNewTaskList, deleteTaskList, updateTaskList} from './../../redux/TaskListReducer'
// import { NewTaskListType } from '../../Types/types'


type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getProjectList: ()=>void,
    // createNewTaskList: (values: NewTaskListType)=>void,
    // deleteTaskList: (taskId: number)=>void,
    // updateTaskList: (values: NewTaskListType, taskId: number)=> void,
}

export type OldProjectFormPropsType = MapPropsType & MapDispatchPropsType & OwnOldProjectFormPropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        projectList: state.projects.projectList,
        isProjectListLoaded: state.projects.isProjectLoaded
        // userId: state.auth.user?.id,
        // isTaskListLoaded: state.taskList.isTaskListLoaded,
        // selectedTasks: state.taskList.selectedTasks
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnOldProjectFormPropsType, AppStateType>(mapStateToProps, 
    {getProjectList}) 
    (OldProjectForm)
    

