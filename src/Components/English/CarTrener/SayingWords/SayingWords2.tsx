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
    const [status, setstatus] = useState(true)  
    const [recognition] = useState(new SpeechRecognition())

    useEffect( () => {
        recognition.onaudiostart = function () {
            // setStatus(false)
            console.log('onaudiostart')
        }

        recognition.onaudioend = ()=> {
            console.log('onaudioend')
            // recognition.start()
        }

        recognition.onresult = function(event) {
            console.log('onresult: ')
            for(let i=0; i<event.results.length; i++) {
                console.log('!!!!!----->>>>>',event.results[i][0].transcript)
                // setRecord(event.results[i][0].transcript)
            }
        }

        recognition.onend = ()=> {
            console.log('onend', status)
            if (status) {
                setstatus(false)
                console.log('!!!!!!!!', status)
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
            console.log('Some sound is being received');
        }
        
        recognition.start()
        setstatus(true)
        console.log('useEffect')
    },[])

    if (props.checkType === 'say') {
        
        
        const recognition = new SpeechRecognition(); // !!!!!!!!!!!!!!!!!!!!!!!!!!!
        // recognition.lang = props.rand ? 'en-US' : 'ru-RU';
        recognition.lang = 'ru-RU'

    }

    console.log(recognition)

    return (
        <div>{record}</div>
    )
}

export default SayingWords