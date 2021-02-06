import { Dispatch } from "react";
import { BaseThunkType, InferActionsTypes } from "./store";
import { taskListAPI } from './../api/taskListAPI'


export type InitialStateType = {
    taskList: Array<any>,
    taskListIsFetching: boolean,
    isTaskListLoaded: boolean,
    // taskSaveStatus: 'no' | 'inProgress' | 'success' | 'error'
    // errorMessage: null | string,
    // isInterval: boolean,
    // dateInterval: {
    //     startDate: moment.Moment,
    //     endDate: moment.Moment
    // }
}

let initialState:InitialStateType = {
    taskList: [],
    taskListIsFetching: false,
    isTaskListLoaded: false
    // taskSaveStatus: 'no',
    // errorMessage: null,
    // isInterval: false,
    // dateInterval: {
    //     startDate: moment(),
    //     endDate: moment()
    // }
}

const taskListReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/TASK_LIST/SET_TASK_LIST':
            return {...state, taskList: action.taskList, isTaskListLoaded: true}

        default:
            return state
    }
}

export const actions = {
    setTaskList: (taskList: Array<any>) => ({ type: 'SN/TASK_LIST/SET_TASK_LIST', taskList } as const),
    // setTaskSaveStatus: (taskSaveStatus: 'no' | 'inProgress' | 'success' | 'error') => ({ type: 'SN/TASK/SET_TASK_SAVE_STATUS', taskSaveStatus } as const),
    // setErrorMessage: (message: string | null) => ({type: 'SN/TASK/SET_ERROR_MESSAGE', message} as const),
    // setTaskListIsFetching: (isFetchingValue: boolean) => ({type: 'SN/TASK/SET_TASK_LIST_IS_FETCHING', isFetchingValue} as const),
    // setIsInterval: (isInterval: boolean, date: {startDate: moment.Moment, endDate: moment.Moment}) => ({type: 'SN/TASK/SET_IS_INTERVAL', isInterval, date} as const)
}

export const getTaskList = (): ThunkType => {
    return async (dispatch, getState) => {
        // dispatch(actions.setTaskListIsFetching(true))

        let response = await taskListAPI.getTaskList()
        //console.log(response)

        if (response !== undefined && response !== null) {
            dispatch(actions.setTaskList(response.data.Tasks))
        } else {
            // add error message
        }
        // dispatch(actions.setTaskListIsFetching(false))
    }
}

export const createNewTaskList = (values: any): ThunkType => {
    return async (dispatch, getState) => {
        let response = await taskListAPI.createNewTaskList(values)
        //console.log(response)
        dispatch(actions.setTaskList(response.data.Tasks))
    }
}

export const deleteTaskList = (taskid: number): ThunkType => {
    return async (dispatch, getState) => {
        let response = await taskListAPI.deleteTask(taskid)
        //console.log(response)
        dispatch(actions.setTaskList(response.data.Tasks))
    }
}

export default taskListReducer

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
export type DispatchType = Dispatch<ActionsTypes>