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
    let status = false

    if (props.checkType === 'say') {
        // @ts-ignore
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition(); // !!!!!!!!!!!!!!!!!!!!!!!!!!!
        // recognition.lang = props.rand ? 'en-US' : 'ru-RU';
        recognition.lang = 'ru-RU'
        recognition.start()
        status = true

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
            // console.log('onend', status)
            if (status) {
                status = false
                console.log('!!!!!!!!')
                recognition.start()
            }
        }

        recognition.onerror = function(event) {
            console.log('Speech recognition error detected: ' + event.error);
        }

        recognition.onnomatch = function() {
            console.log('Speech not recognized');
        }
        recognition.onsoundstart = function() {
            console.log('Some sound is being received');
        }

    }

    console.log(props)
    return (
        <div>{record}</div>
    )
}

export default SayingWords