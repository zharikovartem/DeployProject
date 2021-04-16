import React, {Dispatch, SetStateAction, useState, useEffect} from 'react'
import { Button, Collapse, List, Tabs } from 'antd'
import { Slider } from 'antd'
import { reduceEachTrailingCommentRange } from 'typescript'

const { TabPane } = Tabs
const { Panel } = Collapse;

const style = {
    // display: 'inline-block',
    height: 1000,
    width: 100,
    backgroundColor: 'white',
}
type MarksType = {
    [key: string]: string | {
        style?: {
            [key: string]: any,
        },
        label: React.ReactNode
    }
}
let marks: MarksType = {}
for (let index = 60 * 6; index <= 1440; index = index + 60) {
    const name = index.toString()
    // marks[name] = index/60+':00'
    marks[name] = {
        style: {
            color: 'black',
            // marginBottom: '10px'
        },
        label: <strong>{index / 60 + ':00'}</strong>,
    }
}

type SchedulePropsType = {

}

const changeTab = (key: string) => {
    // console.log(key)
}



const Schedule: React.FC<SchedulePropsType> = (props) => {

    return (
        <div>
            <h3>Распорядок дня:</h3>
            <Tabs defaultActiveKey="1" onChange={changeTab}>
                <TabPane tab="Понедельник" key="1">
                    <h4>Понедельник:</h4>
                    <ScheduleDay 
                        dayNumber={'Понедельник'} 
                        // defaultActiveKey={activeKey}
                        // setActiveKey={setActiveKey}
                    />
                </TabPane>
                <TabPane tab="Вторник" key="2">
                    <h4>Вторник:</h4>
                    <ScheduleDay 
                        dayNumber={'Вторник'} 
                        // defaultActiveKey={activeKey} 
                        // setActiveKey={setActiveKey}
                    />
                </TabPane>
                <TabPane tab="Среда" key="3">
                    Content of Tab Pane 3
                </TabPane>
                <TabPane tab="Четверг" key="4">
                    Content of Tab Pane 3
                </TabPane>
                <TabPane tab="Пятница" key="5">
                    Content of Tab Pane 3
                </TabPane>
                <TabPane tab="Суббота" key="6">
                    Content of Tab Pane 3
                </TabPane>
                <TabPane tab="Воскресенье" key="7">
                    Content of Tab Pane 3
                </TabPane>
                <TabPane tab="Статистика" key="8">
                    Статистика
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Schedule


type ScheduleDayPropsType = {
    dayNumber: string
    // defaultActiveKey: Array<string>,
    // setActiveKey: Dispatch<SetStateAction<string[]>>
}

const ScheduleDay: React.FC<ScheduleDayPropsType> = (props) => {
    const [activeKey, setActiveKey] = useState<Array<string>>([])
    // useEffect( ()=>{
    //     console.log(props.dayNumber, props.defaultActiveKey)
    //     setActiveKey(props.defaultActiveKey)
    // },[props])

    console.log(props.dayNumber,' activeKey:' ,activeKey)
   
    const formatter = (value: number | undefined) => {
        let hour: string
        let min: string
        if (value) {
            const hourNumber = Math.floor(value / 60)
            hour = hourNumber.toString()
            const minNumber = (value - (hourNumber * 60))
            min = minNumber < 10 ? '0' + minNumber.toString() : minNumber.toString()
        } else {
            hour = min = '??'
        }

        return (
            <>{hour}:{min}</>
        )
    }

    const changeActiveContext = (keys: string | string[] ) => {
        console.log(keys)
        if (Array.isArray(keys)) {
            setActiveKey(keys)
        } else {
            setActiveKey([keys])
        }
        
    }

    const contecsts: Array<string> = [
        'Продажи',
        'Разработка'
    ]

    return (
        <div>
            <div className="d-flex flex-row">
                <div className="pb-5 pt-2" style={style}>
                    <Slider
                        min={6 * 60}
                        max={1440}
                        vertical
                        reverse
                        range
                        marks={marks}
                        defaultValue={[6 * 60, 18 * 60]}
                        tipFormatter={formatter}
                        className=""
                    />

                </div>
                <div className="p-2  bg-warning">Flex item</div>
                <div className="p-2 flex-grow-1">

                    
                    <h5>Контексты</h5>
                    <Collapse 
                        activeKey={activeKey} 
                        defaultActiveKey={activeKey} 
                        onChange={changeActiveContext}
                    >
                        <Panel header={<p className="text-left p-0 m-0">Ежедневно</p>} key="0">
                            <Button className="mb-1" type="primary" size="small">Add</Button>
                            <List
                                size="small"
                                bordered
                                dataSource={contecstsDaily}
                                renderItem={item => <List.Item >{item}</List.Item>}
                            />
                        </Panel>
                        <Panel header={<p className="text-left p-0 m-0">Работа</p>} key="1">
                            <List
                                size="small"
                                bordered
                                dataSource={contecsts}
                                renderItem={item => <List.Item >{item}</List.Item>}
                            />
                        </Panel>
                        <Panel header="Дом" key="2">
                            
                        </Panel>
                        <Panel header="Хобби" key="3">
                            
                        </Panel>
                        <Panel header="Спорт" key="4">
                            
                        </Panel>
                        <Panel header="Образование" key="5">
                            
                        </Panel>
                    </Collapse>
                </div>
            </div>
        </div>
    )
}

const contecstsDaily: Array<string> = [
    'Подьем',
    'Отбой',
    'Завтрак',
    'Обед',
    'Ужин',
    'Душ',
    'Побрится',
    'Почистить зубы (утро)',
    'Почистить зубы (вечер)',
]