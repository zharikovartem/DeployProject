import {connect} from 'react-redux'
import English from './English'
import { AppStateType } from '../../redux/store'
import {getVocabularyList, updateVocabulary} from './../../redux/vocabularyReducer'

type MapPropsType = ReturnType<typeof mapStateToProps>

type OwnEnglishType = {

}

type MapDispatchPropsType = {
    getVocabularyList: (part: number)=>void,
    updateVocabulary: (values: any, vocabularyId: number)=>void
}

export type EnglishPropsType = MapPropsType & MapDispatchPropsType & OwnEnglishType

let mapStateToProps = (state:AppStateType) => {
    return {
        vocabularyList: state.vocabulary.vocabularyList,
        part: state.vocabulary.part,
        count: state.vocabulary.count,
        // isAuth: state.auth.isAuth,
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnEnglishType, AppStateType>(mapStateToProps, 
    {getVocabularyList, updateVocabulary}) 
    (English)
    

