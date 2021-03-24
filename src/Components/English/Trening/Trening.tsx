import { Button } from 'antd'
import React from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

type TreningPropsType = {

}
const Trening: React.FC<TreningPropsType> = (props) => {
    

    const commands = [
        {
            command: 'clear',
            // @ts-ignore
            callback: (  {resetTranscript}  ) => resetTranscript()
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

    return (
        <div>
            <Button className="m-2" type="primary" onClick={onStartRus}>StartRus</Button>
            <Button className="m-2" type="primary" onClick={onStart}>StartEng</Button>
            <Button className="m-2" type="primary" onClick={onStop}>Stop</Button>
            <Button className="m-2" type="primary" onClick={resetTranscript}>Reset</Button>
            <p>{transcript}</p>
        </div>
    )
}

export default Trening