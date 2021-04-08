import React from 'react'
import { LerningWordsPropsType } from '../LerningWords/LerningWordsContainer'

const SayingWords: React.FC<LerningWordsPropsType> = (props) => {
    console.log('SayingWords props: ', props)
    return (
        <div>SayingWords</div>
    )
}

export default SayingWords