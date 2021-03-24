import { Button, List, Pagination, Tabs } from 'antd'
import React, { useEffect, useState } from 'react'
import { EnglishPropsType } from './EnglishContainer'
import { VocabularyType } from './../../api/vocabularyAPI'

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import Trening from './Trening/TreningContainer'

// import {speechSynthesis} from 'speech-synthesis'

const { TabPane } = Tabs

const English: React.FC<EnglishPropsType> = (props) => {
    const [current, setCurrent] = useState(props.part)
    const speechSynthesis = require('speech-synthesis')

    useEffect(() => {
        props.getVocabularyList(1)
    }, [])

    useEffect(() => {
        // props.getVocabularyList(1)
    }, [props.vocabularyList, props.count, props.part])

    const onPlayEng = (url: string | null) => {
        speechSynthesis(url, 'en-US')
    }

    const onPlayRus = (word: string | null) => {
        speechSynthesis(word, 'ru-RU');
        // speechSynthesis(word, 'en-GB')
        // speechSynthesis(word, 'en-US')
    }

    const onPaginationChange = (pageNumber: number) => {
        setCurrent(pageNumber)
        console.log(pageNumber)
        props.getVocabularyList(pageNumber)
    }

    const onStatusChange = (id: number, status: string) => {
        props.updateVocabulary({
            status: status//'inProcess'
        }, id)
    }

    // console.log(props.part)

    return (
        <Tabs defaultActiveKey="1" >

            <TabPane tab="Vocabulary List" key="1">
                <Pagination
                    showQuickJumper
                    // defaultCurrent={1} 
                    defaultPageSize={100}
                    current={props.part}
                    total={props.count}
                    onChange={onPaginationChange}
                />

                <List
                    size="small"
                    header={<div>Header</div>}
                    footer={<div>Footer</div>}
                    bordered
                    dataSource={props.vocabularyList}
                    renderItem={(item: VocabularyType) =>
                        <List.Item
                        // actions={item.eng_sound ? [<a key={item.eng_sound} onClick={()=>{onPlay(item.eng_sound)}}>sound</a>] : []}
                        >
                            <div className="row w-100">
                                <div className="col-1 text-right">{item.id}</div>
                                <div className="col-2 text-right">
                                    {item.status === 'learned' ? <b>{item.eng_value}</b> : item.eng_value}
                                    
                                </div>
                                <div className="col-3 text-right">
                                    {item.rus_value + ' ' + item.part_of_speech}
                                </div>
                                <div className="col-6">
                                    <Button
                                        type="primary" size="small"
                                        onClick={() => {
                                            // onPlayEng(item.eng_sound) 
                                            onPlayEng(item.eng_value)
                                        }}
                                    >Eng</Button>
                                    <Button onClick={() => { onPlayRus(item.rus_value) }} className="ml-1" type="primary" size="small">Rus</Button>
                                    <Button className="ml-3" type="primary" size="small" onClick={ ()=>{ onStatusChange(item.id, 'inProcess') } }>Lern</Button>
                                    <Button className="ml-1" type="primary" size="small" onClick={ ()=>{ onStatusChange(item.id, 'learned') } }>Know it</Button>
                                    <Button className="ml-3" type="primary" size="small">Edit</Button>
                                </div>
                            </div>
                        </List.Item>
                    }
                />
            </TabPane>

            <TabPane tab="to Lern" key="2"></TabPane>
            <TabPane tab="Active Vocabulary" key="3"></TabPane>
            <TabPane tab="Trening" key="4">
                <Trening />
            </TabPane>
        </Tabs>
    )
}

export default English