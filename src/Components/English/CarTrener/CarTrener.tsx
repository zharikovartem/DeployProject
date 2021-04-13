import { Button, Collapse, Spin, Switch } from 'antd'
import React, { useState, useEffect } from 'react'
import { NotificationOutlined } from '@ant-design/icons'
import { Formik } from 'formik'
import CarTrenerSettingsForm from './CarTrenerSettings'
import LerningWords from './LerningWords/LerningWordsContainer'
// import { WordType } from '../../../api/vocabularyAPI'
import { CarTrenerPropsType } from './CarTrenerContainer'

// const speechSynthesis = require('speech-synthesis')

const { Panel } = Collapse
const getRandomInt = (max: number) => Math.floor(Math.random() * Math.floor(max))

const CarTrener: React.FC<CarTrenerPropsType> = (props) => {
    const [voices] = useState( window.speechSynthesis.getVoices() )
    const [target, settarget] = useState<number>(0)
    const [isShowRelations, setIsShowRelations] = useState(false)
    const [isShowAudio, setIsShowAudio] = useState(false)
    const [isLern, setIsLern] = useState(true)
    const [checkType, setCheckType] = useState<'say'|'check'|'write'>('check')
    
    const rand = getRandomInt(2)

    useEffect( ()=> {
        if (props.toLern.length === 0) {
            props.getWordsToLern()
        } 
    },[props, props.toLern])

    type InitialSettingsValuesType = {
        compareCount: number,
        learnCount: number,
        checkType?: 'say'|'check'|'write'
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
                    props.getWordsToLern()
                    settarget(0)
                }
            }
        }
    }

    const handleSubmit = (values: InitialSettingsValuesType) => {
        console.log('handleSubmit: ', values)
        if (values.checkType !== undefined) {
            setCheckType(values.checkType)
        }
    }

    const skipWord = (val:any) => {
        // console.log(val)
        props.skipWord(val)
        onMove(1)
    }

    // const voices = window.speechSynthesis.getVoices();
    
    let utterThis: any

    // console.log(window.speechSynthesis.getVoices())
    if (isShowAudio) {
        const data = rand ? props.toLern[target].name : props.toLern[target].relations[0].name
        // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', data)
        utterThis = new SpeechSynthesisUtterance(data)
        const lang = rand ? "en-US" : "ru-RU"
        utterThis.voice = voices.filter(item => item.lang === lang)[0]
        window.speechSynthesis.speak(utterThis)
    }

    if (props.toLern.length === 0) {
        return <Spin size="large" />
    }
    return (
        <div>
            <Collapse className="my-0" defaultActiveKey={[]}>
                <Panel header="Settings v 1.9" key="1" extra={[
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

                    {/* <h5>{utterThis ? utterThis.voice.name : null}</h5>

                    {voices.map(item=> {
                        return <p key={item.lang}>{item.lang}</p>
                    } )} */}
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
                                    <span className="my-1" style={{ fontSize: '14px' }}></span>
                                </div>}
                        />
                        : null}

                        {props.toLern.length === 0 ? 
                            <Spin size="large" />
                        :
                        <>
                        <span className="mt-3 mr-3">{props.toLern[target].id}</span>
                        <h1 className="my-0 mt-1">{rand ? props.toLern[target].name : props.toLern[target].relations[0].name}</h1>
                        <span className="mt-3 ml-3" > - {props.toLern[target].description}</span>
                            
                        </>
                        }
                        
                </div>

            {/* <div>
                {isShowRelations ?
                    props.toLern[target].relations.map((item: any) => {
                        return <h4 key={item.id}>{props.toLern[target].name}- {item.name}</h4>
                    })
                    : null
                }
            </div> */}

            {isLern && props.toLern.length !== 0 ?

            <LerningWords 
                rand = {rand}
                next={onMove} 
                englishWords={props.toLern} 
                wordsCount={initialSettingsValues.compareCount}
                isShowRelations={isShowRelations}
                target={props.toLern[target]}
                checkType = {checkType}
                isShowAudio={isShowAudio}
            />

            // <SayingWords />
            // <></>
            : null }
            
        </div>
    )
}

export default CarTrener