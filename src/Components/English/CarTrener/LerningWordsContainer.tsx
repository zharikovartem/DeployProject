import {connect} from 'react-redux'
import LerningWords from './LerningWords'
import {actions, checkTestResult} from '../../../redux/vocabularyReducer'
import { AppStateType } from '../../../redux/store'
import {updateVocabulary} from './../../../redux/vocabularyReducer'
import { WordType } from '../../../api/vocabularyAPI'

type MapPropsType = ReturnType<typeof mapStateToProps>

type OwnLerningWordsPropsType = {
    englishWords: Array<WordType>,
    wordsCount: number,
    next: (num: number)=>void
}

type MapDispatchPropsType = {
    updateVocabulary: (values: any, vocabularyId: number)=>void,
    setLerningTarget: (learningTarget: WordType) => void,
    checkTestResult: (values: any, wordId: number)=>void,
}

export type LerningWordsPropsType = MapPropsType & MapDispatchPropsType & OwnLerningWordsPropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        target: state.vocabulary.learningTarget,
        wordsArray: state.vocabulary.vocabularyList,
        // wordsCount: state.vocabulary.count,
        // toLern: state.vocabulary.toLern,
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnLerningWordsPropsType, AppStateType>(mapStateToProps, 
    {updateVocabulary, setLerningTarget: actions.setLerningTarget, checkTestResult}) 
    (LerningWords)
    

