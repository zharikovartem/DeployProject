import React, { useState, useEffect } from 'react'
import { LerningWordsPropsType } from '../LerningWords/LerningWordsContainer'

// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { Button } from 'antd'
// import { ConsoleView } from 'react-device-detect'
// import SpeechRecognition from 'react-speech-recognition';
// const SpeechRecognition = window.SpeechRecognition

// @ts-ignore
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var synth = window.speechSynthesis;

// SpeechRecognition.startListening()

const SayingWords: React.FC<LerningWordsPropsType> = (props) => {
    const [record, setRecord] = useState<string>()
    const [status, setStatus] = useState(false)  
    const [recognition] = useState(new SpeechRecognition())
    const [tergetName, setTergetName] = useState<string>(props.rand ? props.target.name : props.target.relations[0].name)
    const [voices] = useState( window.speechSynthesis.getVoices() )
    const [ok, setOk] = useState(false)

    useEffect(()=> {
        setTergetName(props.rand ? props.target.name : props.target.relations[0].name)
        // setOk(false)
    },[props.target])

        recognition.lang = props.rand ? 'ru-RU' : 'en-US'

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
                setRecord(event.results[i][0].transcript)
                
                // if (record !== undefined) {
                    recognition.stop()
                    speak(newSpech(event.results[i][0].transcript))
                // }
                
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

        // console.log(tergetName)

        const utterThis = new SpeechSynthesisUtterance(tergetName)
        const lang = props.rand ? "en-US" : "ru-RU"
        utterThis.voice = voices.filter(item => item.lang === lang)[0]
        // 
        
        const startLisent = () => {
            console.log('recognition.start()')
            recognition.start()
        }

        const newSpech = (text: string): SpeechSynthesisUtterance => {
            return new SpeechSynthesisUtterance(text)
        }
        
        const speak = (utterThis: SpeechSynthesisUtterance) => {
            if (!ok) {
                window.speechSynthesis.speak(utterThis)
                console.log('speechSynthesis.speak: ', tergetName)
                setOk(true)
                checkPendidng(window.speechSynthesis, startLisent)
            }
        }

        if (props.isShowAudio) {
            speak(utterThis)
        }

    return (
        <div>
            v1.1) SayingWords<br/>
            <p>{record}</p>
        
        <Button className="btntooc" type="primary" onClick={startLisent}>speak</Button>
        </div>
    )
}

export default SayingWords

const checkPendidng = (speechSynthesis: SpeechSynthesis, startLisent:()=>void) => {
    setTimeout(() => {
        // console.log(window.speechSynthesis)
        if (speechSynthesis.pending) {
            checkPendidng(speechSynthesis, startLisent)
            // console.log(window.speechSynthesis)
        } 
        else {
            startLisent()
        }
    }, 100);
}