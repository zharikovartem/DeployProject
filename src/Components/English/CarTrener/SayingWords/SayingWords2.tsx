import React, { useState, useEffect } from 'react'
import { LerningWordsPropsType } from '../LerningWords/LerningWordsContainer'

// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { Button } from 'antd'
import { ConsoleView } from 'react-device-detect';
// import { ConsoleView } from 'react-device-detect'
// import SpeechRecognition from 'react-speech-recognition';
// const SpeechRecognition = window.SpeechRecognition

// @ts-ignore
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var synth = window.speechSynthesis;

// SpeechRecognition.startListening()

const SayingWords: React.FC<LerningWordsPropsType> = (props) => {
    const [record, setRecord] = useState<string>()
    const [status, setStatus] = useState(false)  // запущен ли recognition
    const [recognition, setRecognition] = useState(new SpeechRecognition())

    const [tergetName, setTergetName] = useState<string>(props.rand ? props.target.name : props.target.relations[0].name)
    const [targetAnswer, setTargetAnswer] = useState<string>(props.rand ? props.target.relations[0].name : props.target.name)
    const [targetLang, setTargetLang] = useState<"ru-RU"|"en-US">()
    const [ansswerLang, setAnswerLang] = useState<"ru-RU"|"en-US">()
    
    const [voices] = useState( window.speechSynthesis.getVoices() )
    const [ok, setOk] = useState(false)

    const [recognizing, setRecognizing] = useState(false)
    // let recognizing = false;

    const [speachResults, setSpeachResults] = useState<Array<string>>([])

    useEffect(()=> {
        console.log(recognizing, tergetName)
        
        if (!recognizing) {
            // recognition.start()
            // // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!started')
            // setRecognizing(true)
            try {
                recognition.start()
                setRecognizing(true)
            } catch (error) {
                alert('error')
            }
        }
    },[recognizing])

    useEffect(()=> {
        console.log('!!!!!!!!!!!!!!!!!!!props.target changed')
        setTergetName(props.rand ? props.target.name : props.target.relations[0].name)
        setTargetAnswer(props.rand ? props.target.relations[0].name : props.target.name)
        setTargetLang(!props.rand ? "ru-RU":"en-US")
        setAnswerLang(props.rand ? "ru-RU":"en-US")
        // setStatus(true)

        // if (props.isShowAudio) {
        //     speak(utterThis)
        // }

        const newSpechInstanse = newSpech(props.rand ? props.target.name : props.target.relations[0].name)
        const lang = !props.rand ? "ru-RU":"en-US"
        newSpechInstanse.voice = voices.filter(item => item.lang === lang)[0]
        console.log('??????????????????????????????', newSpechInstanse)
        speak(newSpechInstanse, true)

        recognition.lang = props.rand ? "ru-RU":"en-US"

    },[props.target])

        recognition.interimResults = true
        // recognition.lang = props.rand ? 'ru-RU' : 'en-US'

        recognition.onaudiostart = function () {
            setStatus(true)
            // setRecognizing(true);
            // console.log('setRecognizing(true)')
            // console.log('onaudiostart')
        }

        recognition.onaudioend = ()=> {}

        recognition.onresult = function(event) {
            console.log('onresult: ')
            for(let i=0; i<event.results.length; i++) {
                // setStatus(false)
                // recognition.abort()
                // console.log('stop()')

                // console.log('--------------------: ',event.results[i][0].transcript)
                // console.log(i,')',event.results[i][0].transcript,': ',{...event.results[i]})
                let speachResultsCopy = [...speachResults]
                speachResultsCopy.push(event.results[i][0].transcript)
                setSpeachResults(speachResultsCopy)
                
                // const newSpechInstanse = newSpech(event.results[i][0].transcript)
                // const lang = !props.rand ? "en-US" : "ru-RU"
                // newSpechInstanse.voice = voices.filter(item => item.lang === lang)[0]
                // speak(newSpechInstanse, true)
            }
            // console.log(event.results)
        }

        recognition.onend = ()=> {
            console.log('onend', recognizing)
            // console.log('onend statusToSpeach: ', status)
            // console.log(speachResults)
            if (status) {
                console.log('начинаем сравнивать')
                // checking targetAnswer vs speachResults
                let success = false;
                speachResults.forEach(result => {
                    // console.log(result)
                    if (result.toLocaleLowerCase().includes(targetAnswer.toLocaleLowerCase()) ) {
                        // console.log('!!!!!!!!!!',result)
                        success = true
                    }
                })

                const lastResult = speachResults[speachResults.length-1]
                console.log('speachResults: ', [...speachResults])
                // console.log('lastResult: ', lastResult)
                setSpeachResults([])

                if (success) {
                    console.log('success = true')
                    const correctResult = !props.rand ? '. Correct result!':'. Верно!'
                    const newSpechInstanse = newSpech(lastResult + correctResult)
                    const lang = !props.rand ? "en-US" : "ru-RU"
                    newSpechInstanse.voice = voices.filter(item => item.lang === lang)[0]
                    speak(newSpechInstanse, true)

                    props.checkTestResult({
                        result: 'success',
                        checkMethod: !props.rand ? 'en_ru_s' : 'ru_en_s'
                    }, props.target.id)
                    console.log('props.next(1)')
                    props.next(1)
                    // setStatus(false)
                } else {
                    console.log('success = false')
                    const isComand = lastResult !== undefined ? checkComands(lastResult) : ''

                    if (isComand === '') {
                        if (lastResult!== undefined) {
                            console.log(lastResult.toLowerCase())

                            const newSpechInstanse = newSpech(!props.rand ? 'wrong!':'Не верно!')
                            const lang = !props.rand ? "en-US" : "ru-RU"
                            newSpechInstanse.voice = voices.filter(item => item.lang === lang)[0]
                            console.log(newSpechInstanse)
                            speak(newSpechInstanse, true)
                            // recognition.start()
                            setRecognizing(true)
                            console.log('!!!setRecognizing(true)', recognizing)
                        } else {
                            
                            console.log('NOT COMAND BUT EMPTY')




                            console.log('recognition', recognition)
                            console.log('recognizing', recognizing)
                            startLisent()
                        }
                    } else {
                        console.log('isComand: ',isComand)
                        recognition.abort() 
                        const newSpechInstanse = newSpech(isComand)
                        const lang = !props.rand ? "en-US" : "ru-RU"
                        newSpechInstanse.voice = voices.filter(item => item.lang === lang)[0]
                        speak(newSpechInstanse, true)
                    }
                    
                }

                // setStatus(false)
                // console.log('!!!!!!!!', status)
                // recognition.start()
            } else {
                console.log('НАДО ЗАПУСТИТЬ')
            }
        }

        recognition.onerror = function(event) {
            console.log('Speech recognition error detected: ' + event.error);
        }

        recognition.onnomatch = function() {
            console.log('Speech not recognized');
        }
        recognition.onsoundstart = function() {
            // console.log('Some sound is being received');
        }
        recognition.onsoundend = function() {
            console.log('Звук перестал приниматься', recognizing);
        }

        
        // setStatus(true)

        // console.log(tergetName)

        const utterThis = new SpeechSynthesisUtterance(tergetName)
        const lang = props.rand ? "en-US" : "ru-RU"
        utterThis.voice = voices.filter(item => item.lang === lang)[0]
        // 
        
        const startLisent = (check: string|undefined = undefined ) => {
            setRecognizing(false)
        }

        const newSpech = (text: string): SpeechSynthesisUtterance => {
            return new SpeechSynthesisUtterance(text)
        }
        
        const speak = (utterThisItem: SpeechSynthesisUtterance, need?: boolean) => {
            recognition.abort()
            if (!ok || need) {
                window.speechSynthesis.speak(utterThisItem)
                console.log('speechSynthesis.speak: ', utterThisItem.text)
                setOk(true)
                checkPendidng(window.speechSynthesis, startLisent)
            }
        }

        // if (props.isShowAudio) {
        //     speak(utterThis)
        // }

        // console.log('speachResults: ', speachResults)

    return (
        <div>
            v1.34) SayingWords<br/>
            <h4>tergetName: {tergetName}= targetAnswer:{targetAnswer}</h4>
            <p>{record}</p>
            <p>Язык на котором сказали текст: <b>{targetLang}</b> ({!targetLang})</p>
            <p>Язык восприятия речи: <b>{ansswerLang}</b></p>
            <p>Реальный Язык восприятия речи: <b>{recognition.lang}</b></p>
            <p>Запись звука: {recognizing ? 'Да' : 'Нет'}</p>
        
        <Button className="btntooc" type="primary" onClick={()=>{startLisent()}}>speak</Button>
        </div>
    )
}

export default SayingWords

const checkPendidng = (speechSynthesis: SpeechSynthesis, startLisent:()=>void) => {
    setTimeout(() => {
        if (speechSynthesis.speaking || speechSynthesis.pending) {
            checkPendidng(speechSynthesis, startLisent)
            console.log('WAIT')
        } 
        else {
            console.log('startLisent from checkPendidng')
            startLisent()
        }
    }, 100);
}

const checkComands = (lastResult:string): string => {
    if (lastResult.toLocaleLowerCase().includes('next') ) {
        return 'next'
    }
    if (lastResult.toLocaleLowerCase().includes('следующий') ) {
        return 'следующий'
    }

    return ''
}