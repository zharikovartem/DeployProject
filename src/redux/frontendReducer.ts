import { authAPI, RegisterFormType } from "../api/authAPI";
import { SettingasInstanseType } from "../Components/ToDo/Settings/SettingsModal";
import { BaseThunkType, InferActionsTypes } from "./store"
import FolderRow from './../Components/Development/Projects/CurrentProject/Frontend/Instanses/InstansesFrontendForm'

export type frontendTreeDataItem = {
    title: string | JSX.Element,
    key: string,
    disableCheckbox?: boolean,
    disabled?: boolean,
    children?: Array<frontendTreeDataItem>,
    trace?: Array<string>,

    getRow?: (name: string)=>JSX.Element,
}

type InitialStateType = {
    src_tree: Array<frontendTreeDataItem>,
}

const initialState:InitialStateType = {
    src_tree: [{
        // title: <FolderRow name="src" trace={['src']}/>,
        title: 'src',
        key: '0',
        trace:['0'],
        children: []
    }]
}

const frontendReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/FRONTEND/ADD_FOLDER':
            let src_treeCopy = [...state.src_tree]
            for (let index = 0; index < action.trace.length; index++) {
                const key = action.trace[index];
                for (let index = 0; index < src_treeCopy.length; index++) {
                    const element = src_treeCopy[index];
                    // if (ele)
                }
            }

            return{
                ...state, 
                // src_tree: action...
            }

    default:
        return state
    }
}

export const actions = {
    addFolder: (trace:Array<string>, data: any) => ({ type: 'SN/FRONTEND/ADD_FOLDER', trace, data } as const),
}

export default frontendReducer

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType< ActionsTypes>