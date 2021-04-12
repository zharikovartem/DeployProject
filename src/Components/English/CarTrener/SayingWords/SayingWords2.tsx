import React, { useState, useEffect } from 'react'
import { LerningWordsPropsType } from '../LerningWords/LerningWordsContainer'

// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { Button } from 'antd'
import { ConsoleView } from 'react-device-detect'
// import SpeechRecognition from 'react-speech-recognition';
// const SpeechRecognition = window.SpeechRecognition

// @ts-ignore
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'ru-RU';
recognition.start()

// SpeechRecognition.startListening()

const SayingWords: React.FC<LerningWordsPropsType> = (props) => {
    console.log(props)
    return (
        <div>SayingWords2</div>
    )
}

export default SayingWords