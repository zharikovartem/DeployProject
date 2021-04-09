import React, { useState, useEffect } from 'react'
import { LerningWordsPropsType } from '../LerningWords/LerningWordsContainer'

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { Button } from 'antd'
import { ConsoleView } from 'react-device-detect'

const SayingWords: React.FC<LerningWordsPropsType> = (props) => {
    // console.log('SayingWords props: ', props)

    const speechSynthesis = require('speech-synthesis')

    const [result, setResult] = useState<string>('')
    const [targetIndex, setTargetIndex] = useState(0)
    const [answer, setAnswer] = useState(false)
    const [isSpeaking, setIsSpeaking] = useState<number | null>(null)

    const [isStarted, setIsStarted] = useState(false)
    const [selectedLang, setSelectedLang] = useState('')

    useEffect( () => {
        console.log('USE_EFFECT props.rand: ', props.rand)
        if (props.rand) {
            if (selectedLang !== 'StartRus') {
                if (isStarted) {
                    SpeechRecognition.stopListening()
                    console.log('stopListening')
                    setIsStarted(false)
                } else {
                    resetTranscript()
                    console.log('resetTranscript')
                }
                SpeechRecognition.startListening({ language: 'ru-RU', continuous: true })
                console.log('StartRus')
                setIsStarted(true)
                setSelectedLang('StartRus')
            } else {
                resetTranscript()
                console.log('resetTranscript')
            }
            
            
        } else {
            if (selectedLang !== 'StartEng') {
                if (isStarted) {
                    SpeechRecognition.stopListening()
                    console.log('stopListening')
                    setIsStarted(false)
                } else {
                    resetTranscript()
                    console.log('resetTranscript')
                }
                // SpeechRecognition.stopListening()
                SpeechRecognition.startListening({ language: 'en-US', continuous: true })
                console.log('StartEng')
                setIsStarted(true)
                setSelectedLang('StartEng')
            } else {
                resetTranscript()
                console.log('resetTranscript')
            }
        }
    }, [props, props.rand])

    const commands = [
        {
            command: 'clear',
            // @ts-ignore
            callback: ({ resetTranscript }) => {
                console.log('clear')
                resetTranscript()
            },

        },
        {
            command: 'очистить',
            // @ts-ignore
            callback: ({ resetTranscript }) => {
                console.log('clear')
                resetTranscript()
            },

        },
        {
            command: 'next',
            // @ts-ignore
            callback: ({ resetTranscript }) => {
                console.log('next go to props')
                setAnswer(false)
                // setTargetIndex(targetIndex + 1)
                props.next(1)

                resetTranscript()
            },

        },
        {
            command: 'show',
            // @ts-ignore
            callback: ({ resetTranscript }) => {
                console.log('next go to props')
                setAnswer(!answer) // скрыл показал answer
                resetTranscript() // очистил кэш
            },

        }
    ]

    const { transcript, resetTranscript } = useSpeechRecognition({ commands })
    // Выполняем проверку на совпадение значений:
    useEffect( ()=>{
        const transcriptTarget = props.rand ? props.target.relations[0].name : props.target.name
        console.log(transcript,'---', transcriptTarget)
        if (transcript.toLocaleLowerCase().includes(transcriptTarget.toLocaleLowerCase())) {
            // alert(transcript)
            props.checkTestResult(props.target, props.target.id)
        }
        if (transcript.toLocaleLowerCase().includes('следующий')) {
            props.next(1)
        }
    }, [transcript])

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null
    }

    const onStartRus = () => {
        SpeechRecognition.stopListening()
        SpeechRecognition.startListening({ language: 'ru-RU', continuous: true })
    }
    const onStart = () => {
        SpeechRecognition.stopListening()
        SpeechRecognition.startListening({ language: 'en-US', continuous: true })
    }

    const onStop = () => {
        SpeechRecognition.stopListening()
    }

    const showAnswer = () => {
        setAnswer(!answer)
    }

    const onNext = (step: number) => {
        setAnswer(false)
        setTargetIndex(targetIndex + step)
        resetTranscript()
    }




    // if (isSpeaking !== targetIndex) {
        // speechSynthesis(props.target.name, 'ru-RU')
        // setIsSpeaking(targetIndex)
    // }

    



    return (
        <div>
            {isStarted ? <div>!!!{selectedLang}</div> : <div>???{selectedLang}</div>}
            <h3>{result}</h3>
            <div>v1.6</div>
            <Button className="m-2" type="primary" onClick={onStartRus}>StartRus</Button>
            <Button className="m-2" type="primary" onClick={onStart}>StartEng</Button>
            <Button className="m-2" type="primary" onClick={onStop}>Stop</Button>
            <Button className="m-2" type="primary" onClick={resetTranscript}>Reset</Button>
            <h1>{transcript}</h1>

            {/* <h1>{props.toLern.length >= targetIndex - 1 ? props.toLern[targetIndex].name : null}</h1> */}
            <Button className="m-2" type="primary" onClick={() => { onNext(-1) }}>Prev</Button>
            <Button className="m-2" type="primary" onClick={showAnswer}>Show</Button>
            <Button className="m-2" type="primary" onClick={() => { onNext(1) }}>Next</Button>

            {/* <h1>{answer ? props.toLern[targetIndex].name : null}</h1> */}
        </div>
    )
}

export default SayingWords
