import {connect} from 'react-redux'
import { AppStateType } from './../../../redux/store'
import CodeModal from './CodeModal'
import {actions, codeTypeList} from './../../../redux/codeReducer'

type OwnCodeModalPropsType = {
    
}

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    setShowCodeModal: (isShow: boolean, codeType: codeTypeList, codeRowsArray: Array<any>, codeTargetName: string) => void,
}

export type CodeModalPropsType = MapPropsType & MapDispatchPropsType & OwnCodeModalPropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        isModalVisible: state.code.isModalVisible,
        codeRowsArray: state.code.codeRowsArray,
        codeType: state.code.codeType,
        codeTargetName: state.code.codeTargetName
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnCodeModalPropsType, AppStateType>(mapStateToProps, 
    {setShowCodeModal: actions.setShowCodeModal}) 
    (CodeModal)
    

