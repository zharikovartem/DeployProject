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
        recognition.lang = props.rand ? 'en-US' : 'ru-RU';
        recognition.start()

        recognition.onaudiostart = function () {
            // microphoneWrapper.style.visibility = 'hidden';
            // audioRecordAnimation.style.visibility = 'visible';
            console.log('onaudiostart')
        }
        recognition.onaudioend = ()=> {
            console.log('onaudioend')
        }

        recognition.onresult = function(event) {
            console.log('onresult: ',event)
            const last = event.results.length - 1;
            // const colors = getColor(event.results[last][0].transcript);
            // recognitionTextResult.textContent = 'Результат: ' + colors[0];
            // speechRecognitionSection.style.backgroundColor = colors[1];
            // console.log('Confidence: ' + event.results[0][0].confidence);
        }

        recognition.onsoundend = function() {
            console.log('onsoundend');
          }

        if (record === undefined) {
            // alert('1)recognition.start()')
            // console.log(recognition)
        }

    }

    console.log(props)
    return (
        <div>SayingWords2{record}</div>
    )
}

export default SayingWords