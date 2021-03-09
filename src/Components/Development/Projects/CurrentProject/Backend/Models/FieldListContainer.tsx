import {connect} from 'react-redux'
import { AppStateType } from '../../../../../../redux/store'
import FieldList from './FieldList'
import {actions, codeTypeList} from './../../../../../../redux/codeReducer'

type OwnFieldListPropsType = {
    fields: Array<any>
    openModalToAddField: (target: any | null)=>void,
    deleteField:(fieldId: number)=>void,
    targetName: string
}

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    setShowCodeModal: (isShow: boolean, codeType: codeTypeList, codeRowsArray: Array<any>, codeTargetName: string) => void,
}

export type FieldListPropsType = MapPropsType & MapDispatchPropsType & OwnFieldListPropsType

let mapStateToProps = (state:AppStateType) => {
    return {

    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnFieldListPropsType, AppStateType>(mapStateToProps, 
    {setShowCodeModal: actions.setShowCodeModal}) 
    (FieldList)
    

