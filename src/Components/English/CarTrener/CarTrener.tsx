import { Button, Collapse, Spin, Switch } from 'antd'
import React, { useState, useEffect } from 'react'
import { NotificationOutlined } from '@ant-design/icons'
import { Formik } from 'formik'
import CarTrenerSettingsForm from './CarTrenerSettings'
import LerningWords from './LerningWordsContainer'
import { WordType } from '../../../api/vocabularyAPI'
import { CarTrenerPropsType } from './CarTrenerContainer'
// import {speechSynthesis} from 'speech-synthesis'

const speechSynthesis = require('speech-synthesis')

const { Panel } = Collapse

const CarTrener: React.FC<CarTrenerPropsType> = (props) => {
    const [target, settarget] = useState<number>(0)
    const [isShowRelations, setIsShowRelations] = useState(false)
    const [isShowAudio, setIsShowAudio] = useState(false)
    const [isLern, setIsLern] = useState(true)

    console.log('!!!!!!!!!target: ',target, ': ', props.toLern.length)

    // useEffect( () => {
    //     // console.log(target)
    //     // props.setLerningTarget(props.englishWords.find( item => item.id === target))
    //     props.setLerningTarget(props.englishWords[target])
    // }, [target])

    useEffect( ()=> {
        if (props.toLern.length === 0) {
            props.getWordsToLern()
        } else {
            console.log('toLern: ', props.toLern[target])
        }
    },[props.toLern])

    type InitialSettingsValuesType = {
        compareCount: number,
        learnCount: number,
    }

    const initialSettingsValues: InitialSettingsValuesType = {
        compareCount: 5,
        learnCount: 27
    }

    const onMove = (step: number) => {
        if (target!==undefined) {
            if ( target + step >= 0 && target + step <= props.englishWords.length - 1) {
                if (props.toLern.length > target+1) {
                    settarget(target + step)
                } else {
                    settarget(0)
                }
            }
        }
    }

    const handleSubmit = (values: any) => {
        console.log(values)
    }

    const skipWord = (val:any) => {
        // console.log(val)
        props.skipWord(val)
        onMove(1)
    }

    const voices = window.speechSynthesis.getVoices();
    
    let utterThis: any

    console.log(window.speechSynthesis.getVoices())
    if (isShowAudio) {
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', props.toLern[target].name)
        utterThis = new SpeechSynthesisUtterance(props.toLern[target].name)
        utterThis.voice = voices.filter(item => item.lang === "en-US")[0]
        console.log('??????????????????????', utterThis.voice)
        window.speechSynthesis.speak(utterThis)
    }

    if (props.toLern.length === 0) {
        return <Spin size="large" />
    }
    return (
        <div>
            <Collapse className="my-3" defaultActiveKey={[]}>
                <Panel header="Settings" key="1" extra={[
                    <Switch key="1" className="mx-1" checkedChildren="show" unCheckedChildren="show" checked={isShowRelations}
                        onClick={(checked: boolean, event: Event) => {
                            setIsShowRelations(!isShowRelations)
                            event.stopPropagation();
                        }}
                    />,
                    <Switch key="2" className="mx-1" checkedChildren="audio" unCheckedChildren="audio"
                        onClick={(checked: boolean, event: Event) => {
                            setIsShowAudio(!isShowAudio)
                            event.stopPropagation();
                        }}
                    />,
                    <Switch key="3" className="mx-1" checkedChildren="lern" unCheckedChildren="lern"
                        checked = {isLern}
                        onClick={(checked: boolean, event: Event) => {
                            if (checked) {
                                setIsShowRelations(false)
                            }
                            setIsLern(checked)
                            event.stopPropagation();
                        }}
                    />,
                ]}  >
                    <Formik
                        initialValues={initialSettingsValues}
                        onSubmit={handleSubmit}
                        enableReinitialize={true}
                    >
                        {CarTrenerSettingsForm}
                    </Formik>

                    <h5>{utterThis ? utterThis.voice.name : null}</h5>

                    {voices.map(item=> {
                        return <p>{item.lang}</p>
                    } )}
                </Panel>
            </Collapse>
            <div className="d-flex justify-content-center">
                <Button className="mr-5" type="primary" onClick={() => { onMove(-1) }}>prev</Button>
                <Button className="mx-0" type="ghost" onClick={() => {skipWord(props.toLern[target].id)}}>Know it</Button>
                <Button className="ml-5" type="primary" onClick={() => { onMove(1) }}>next</Button>
            </div>


            
                <div className="d-flex flex-wrap align-content-start ml-1">
                    {isShowAudio ?
                        <Button
                            className="mt-4 mr-3"
                            type="ghost"
                            shape="round"
                            size="small"
                            style={{ marginLeft: 10 }}
                            icon={
                                <div className="d-flex flex-wrap align-content-start">
                                    <NotificationOutlined style={{ fontSize: '18px' }} />
                                    <span className="ml-1" style={{ fontSize: '14px' }}></span>
                                </div>}
                        />
                        : null}

                        {props.toLern.length === 0 ? 
                            <Spin size="large" />
                        :
                        <>
                        <span>{props.toLern[target].id}</span>
                            <h1>{props.toLern[target].name}</h1>
                            
                        </>
                        }
                        
                </div>

            <div>
                {isShowRelations ?
                    props.toLern[target].relations.map((item: any) => {
                        return <li>{item.name}</li>
                    })
                    : null
                }
            </div>

            {isLern ?
            <LerningWords 
                next={onMove} 
                englishWords={props.toLern} 
                wordsCount={initialSettingsValues.compareCount}
                target={props.toLern[target]}
            />

            : null }
            
        </div>
    )
}

export default CarTrener