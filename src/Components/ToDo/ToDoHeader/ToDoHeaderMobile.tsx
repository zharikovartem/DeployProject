import React, { useState } from 'react'
import { ToDoHeaderPropsType } from './ToDoHeaderContainer'
import { Button, DatePicker, List, Switch } from 'antd-mobile'
import enUs from 'antd-mobile/lib/date-picker/locale/en_US'
import moment from "moment"

export type OwnToDoHeaderPropsType = {
    showDrawer: () => void,
    showModal: () => void,
}

const ToDoHeaderMobile: React.FC<ToDoHeaderPropsType> = (props) => {
    const [isInterval, setIsInterval] = useState(false)

    const onIntervalChange = (e: any) => {
        setIsInterval(!isInterval)
    }
    return (
        <div>
            <DatePicker
                locale={enUs}
                mode="date"
                value={new Date()}
                onChange={(date: any) => { console.log(date) }}
            >
                <List.Item className="w-100">
                {isInterval ? 'Start:' : 'Date:'}
                </List.Item>
            </DatePicker>

            {isInterval ?
                <DatePicker
                    locale={enUs}
                    mode="date"
                    value={new Date()}
                    onChange={(date: any) => { console.log(date) }}
                >
                    <List.Item >End:</List.Item>
                </DatePicker>
                :
                null
            }

            <List.Item
                extra={
                        <Switch
                            checked={isInterval}
                            onChange={onIntervalChange}
                        />
                }
                >
                Date interval
            </List.Item>

            <Button
                inline
                size="small"
                className="ml-3"
                // style={{ marginRight: '4px' }} 
                onClick={()=>{props.showDrawer()}}
                type="primary"
            >
                Add
            </Button>
            <Button
                inline
                size="small"
                className="ml-3"
                // style={{ marginRight: '4px' }} 
                onClick={()=>{props.showModal()}}
                type="primary"
            >
                Settings
            </Button>
        </div>
    )
}

export default ToDoHeaderMobile