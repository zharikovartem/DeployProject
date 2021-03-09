import {connect} from 'react-redux'
import { AppStateType } from './../../../../redux/store'
import ModelCode from './ModelCode'
import {actions, codeTypeList} from './../../../../redux/codeReducer'

type OwnModelCodePropsType = {
    
}

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    setShowCodeModal: (isShow: boolean, codeType: codeTypeList, codeRowsArray: Array<any>, codeTargetName: string) => void,
}

export type ModelCodePropsType = MapPropsType & MapDispatchPropsType & OwnModelCodePropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        isModalVisible: state.code.isModalVisible,
        codeRowsArray: state.code.codeRowsArray,
        codeType: state.code.codeType,
        codeTargetName: state.code.codeTargetName
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnModelCodePropsType, AppStateType>(mapStateToProps, 
    {setShowCodeModal: actions.setShowCodeModal}) 
    (ModelCode)
    

