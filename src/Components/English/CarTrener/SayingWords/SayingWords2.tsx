import React, { useState, useEffect } from 'react'
import { LerningWordsPropsType } from '../LerningWords/LerningWordsContainer'

// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { Button } from 'antd'
// import { ConsoleView } from 'react-device-detect'
// import SpeechRecognition from 'react-speech-recognition';
// const SpeechRecognition = window.SpeechRecognition

// @ts-ignore
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// SpeechRecognition.startListening()

const SayingWords: React.FC<LerningWordsPropsType> = (props) => {
    const [record, setRecord] = useState<string>()
    const [status, setStatus] = useState(false)  
    const [recognition] = useState(new SpeechRecognition())

    useEffect(()=> {
        console.log('useEffect', status)
        if (!status) {
            setStatus(true)
            recognition.start()
        } else {
            console.log(!status)
        }
    },[])

        recognition.lang = 'ru-RU'

        recognition.onaudiostart = function () {
            setStatus(true)
            // console.log('onaudiostart')
        }

        recognition.onaudioend = ()=> {
            // console.log('onaudioend')
            // recognition.start()
        }

        recognition.onresult = function(event) {
            // console.log('onresult: ')
            for(let i=0; i<event.results.length; i++) {
                console.log('!!!!!----->>>>>',event.results[i][0].transcript)
                // setRecord(event.results[i][0].transcript)
            }
        }

        recognition.onend = ()=> {
            // console.log('onend', status)
            if (status) {
                setStatus(false)
                // console.log('!!!!!!!!', status)
                recognition.start()
            }
        }

        recognition.onerror = function(event) {
            // console.log('Speech recognition error detected: ' + event.error);
            // if (event.error === 'no-speech') {
            //     recognition.start()
            // }
        }

        recognition.onnomatch = function() {
            console.log('Speech not recognized');
        }
        recognition.onsoundstart = function() {
            // console.log('Some sound is being received');
        }
        recognition.onsoundend = function() {
            console.log('Sound has stopped being received');
        }

        
        // setStatus(true)

        // console.log(recognition)

        
        
    

    

    return (
        <div>1) {record}</div>
    )
}

export default SayingWords