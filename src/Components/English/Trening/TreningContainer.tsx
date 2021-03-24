import {connect} from 'react-redux'
import Trening from './Trening'
// import {actions} from '../../redux/authReducer'
import { AppStateType } from '../../../redux/store'
import {updateVocabulary} from './../../../redux/vocabularyReducer'

type MapPropsType = ReturnType<typeof mapStateToProps>

type OwnEnglishType = {

}

type MapDispatchPropsType = {
    updateVocabulary: (values: any, vocabularyId: number)=>void
}

export type TreningPropsType = MapPropsType & MapDispatchPropsType & OwnEnglishType

let mapStateToProps = (state:AppStateType) => {
    return {
        vocabularyList: state.vocabulary.vocabularyList,
        part: state.vocabulary.part,
        count: state.vocabulary.count,
        toLern: state.vocabulary.toLern,
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnEnglishType, AppStateType>(mapStateToProps, 
    {updateVocabulary}) 
    (Trening)
    

