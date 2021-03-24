import { Button } from 'antd'
import React, {useState} from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { TreningPropsType } from './TreningContainer'

const Trening: React.FC<TreningPropsType> = (props) => {
    const speechSynthesis = require('speech-synthesis')

    const [targetIndex, setTargetIndex] = useState(0)
    const [answer, setAnswer] = useState(false)
    const [isSpeaking, setIsSpeaking] = useState(0)

    const commands = [
        {
            command: 'clear',
            // @ts-ignore
            callback: (  { resetTranscript }  ) => {
                console.log('clear')
                resetTranscript()
            },
            
        },
        {
            command: 'next',
            // @ts-ignore
            callback: (  { resetTranscript }  ) => {
                console.log('next go to props')
                setAnswer(false)
                setTargetIndex(targetIndex+1)
                
                resetTranscript()
            },
            
        },
        {
            command: 'show',
            // @ts-ignore
            callback: (  { resetTranscript }  ) => {
                console.log('next go to props')
                setAnswer(!answer) // скрыл показал answer
                resetTranscript() // очистил кэш
            },
            
        }
    ]

    const { transcript, resetTranscript } = useSpeechRecognition({commands})

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

    const onNext = (step:number) => {
        setAnswer(false)
        setTargetIndex(targetIndex+step)
        resetTranscript()
    }

    console.log(props)
    console.log(targetIndex)

    if (isSpeaking === targetIndex) {
        speechSynthesis(props.toLern[targetIndex].rus_value, 'ru-RU')
        setIsSpeaking(targetIndex)
    }
     

    return (
        <div>
            <div>v1.6</div>
            <Button className="m-2" type="primary" onClick={onStartRus}>StartRus</Button>
            <Button className="m-2" type="primary" onClick={onStart}>StartEng</Button>
            <Button className="m-2" type="primary" onClick={onStop}>Stop</Button>
            <Button className="m-2" type="primary" onClick={resetTranscript}>Reset</Button>
            <h1>{transcript}</h1>

            <h1>{props.toLern.length >= targetIndex-1 ? props.toLern[targetIndex].rus_value : null}</h1>
            <Button className="m-2" type="primary" onClick={()=>{onNext(-1)}}>Prev</Button>
            <Button className="m-2" type="primary" onClick={showAnswer}>Show</Button>
            <Button className="m-2" type="primary" onClick={()=>{onNext(1)}}>Next</Button>

            <h1>{answer ? props.toLern[targetIndex].eng_value : null}</h1>
        </div>
    )
}

export default Trening