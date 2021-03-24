import {connect} from 'react-redux'
import English from './English'
import {actions} from '../../redux/authReducer'
import { AppStateType } from '../../redux/store'
import {getVocabularyList} from './../../redux/vocabularyReducer'

type MapPropsType = ReturnType<typeof mapStateToProps>

type OwnEnglishType = {

}

type MapDispatchPropsType = {
    getVocabularyList: (part: number)=>void
}

export type EnglishPropsType = MapPropsType & MapDispatchPropsType & OwnEnglishType

let mapStateToProps = (state:AppStateType) => {
    return {
        vocabularyList: state.vocabulary.vocabularyList,
        part: state.vocabulary.part,
        count: state.vocabulary.count,
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnEnglishType, AppStateType>(mapStateToProps, 
    {getVocabularyList}) 
    (English)
    

