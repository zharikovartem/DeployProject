import {connect} from 'react-redux'
import CarTrener from './CarTrener'
import {actions} from '../../../redux/vocabularyReducer'
import { AppStateType } from '../../../redux/store'
import {updateVocabulary, getWordsToLern} from './../../../redux/vocabularyReducer'
import { WordType } from '../../../api/vocabularyAPI'

type MapPropsType = ReturnType<typeof mapStateToProps>

type OwnCarTrenerPropsType = {
    englishWords: Array<any>
}

type MapDispatchPropsType = {
    updateVocabulary: (values: any, vocabularyId: number)=>void,
    setLerningTarget: (learningTarget: WordType) => void,
    getWordsToLern: ()=>void
}

export type CarTrenerPropsType = MapPropsType & MapDispatchPropsType & OwnCarTrenerPropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        // learningTarget: state.vocabulary.learningTarget,
        // part: state.vocabulary.part,
        // count: state.vocabulary.count,
        toLern: state.vocabulary.toLern,
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnCarTrenerPropsType, AppStateType>(mapStateToProps, 
    {updateVocabulary, setLerningTarget: actions.setLerningTarget, getWordsToLern}) 
    (CarTrener)
    

