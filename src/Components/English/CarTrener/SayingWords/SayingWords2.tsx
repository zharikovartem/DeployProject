import React, { useState, useEffect } from 'react'
import { LerningWordsPropsType } from '../LerningWords/LerningWordsContainer'

// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { Button } from 'antd'
// import { ConsoleView } from 'react-device-detect'
// import SpeechRecognition from 'react-speech-recognition';
// const SpeechRecognition = window.SpeechRecognition




// SpeechRecognition.startListening()

const SayingWords: React.FC<LerningWordsPropsType> = (props) => {
    const [record, setRecord] = useState<string>()

    if (props.checkType === 'say') {
        // @ts-ignore
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition(); // !!!!!!!!!!!!!!!!!!!!!!!!!!!
        // recognition.lang = props.rand ? 'en-US' : 'ru-RU';
        recognition.lang = 'ru-RU'
        recognition.start()

        recognition.onaudiostart = function () {
            console.log('onaudiostart')
        }

        recognition.onaudioend = ()=> {
            console.log('onaudioend')
        }

        recognition.onresult = function(event) {
            console.log('onresult: ')
            for(let i=0; i<event.results.length; i++) {
                console.log(event.results[i][0].transcript)
                setRecord(event.results[i][0].transcript)
            }
            
        }

        recognition.onend = ()=> {
            // console.log('onend')
            recognition.start()
        }

    }

    console.log(props)
    return (
        <div>{record}</div>
    )
}

export default SayingWords