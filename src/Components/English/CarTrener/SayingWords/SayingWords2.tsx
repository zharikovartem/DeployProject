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

        console.log(tergetName)

        const utterThis = new SpeechSynthesisUtterance(tergetName)
        const lang = props.rand ? "en-US" : "ru-RU"
        utterThis.voice = voices.filter(item => item.lang === lang)[0]
        console.log(voices.filter(item => item.lang === lang))
        
        
        
        
    const speak = () => {
        if (!ok) {
            window.speechSynthesis.speak(utterThis)
            console.log('speak!!!: ', tergetName, ' on ')//, utterThis.voice.lang)
            setOk(true)
        }
    }

    if (props.isShowAudio) {
        speak()
    }

    return (
        <div>1) {record}
        
        <Button className="btntooc" type="primary" onClick={speak}>speak</Button>
        </div>
    )
}

export default SayingWords