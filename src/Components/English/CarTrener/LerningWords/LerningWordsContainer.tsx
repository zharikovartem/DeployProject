import {connect} from 'react-redux'
import LerningWords from './LerningWords'
import {actions, checkTestResult, getWordsToLern} from '../../../../redux/vocabularyReducer'
import { AppStateType } from '../../../../redux/store'
import {updateVocabulary} from '../../../../redux/vocabularyReducer'
import { CheckTestResultDataType, WordType } from '../../../../api/vocabularyAPI'

type MapPropsType = ReturnType<typeof mapStateToProps>

type OwnLerningWordsPropsType = {
    englishWords: Array<WordType>,
    wordsCount: number,
    next: (num: number)=>void
    target: WordType,
    rand: number,
    checkType?: 'check' | 'say' | 'write'
    isShowRelations?: boolean
    isShowAudio?: boolean
}

type MapDispatchPropsType = {
    updateVocabulary: (values: any, vocabularyId: number)=>void,
    setLerningTarget: (learningTarget: WordType) => void,
    checkTestResult: (values: CheckTestResultDataType, wordId: number)=>void,
    getWordsToLern: ()=>void,
}

export type LerningWordsPropsType = MapPropsType & MapDispatchPropsType & OwnLerningWordsPropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        // target: state.vocabulary.learningTarget,
        wordsArray: state.vocabulary.toLern,
        // wordsCount: state.vocabulary.count,
        // toLern: state.vocabulary.toLern,
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnLerningWordsPropsType, AppStateType>(mapStateToProps, 
    {updateVocabulary, setLerningTarget: actions.setLerningTarget, checkTestResult, getWordsToLern}) 
    (LerningWords)
    

