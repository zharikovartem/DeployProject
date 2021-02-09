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

    const onIntervalChange = (e: boolean) => {
        if (e) {
            props.setIsInterval( !isInterval, {startDate: props.dateInterval.startDate, endDate: props.dateInterval.endDate })
        } else {
            props.setIsInterval( !isInterval, {startDate: props.dateInterval.startDate, endDate: props.dateInterval.startDate })
        }
        
        setIsInterval(!isInterval)
    }

    const onStartChange = (value: Date) => {
        console.log(value)
        console.log(props)
        if (!isInterval) {
            props.setIsInterval(isInterval, {startDate: moment(value), endDate: moment(value) })
        } else {
            props.setIsInterval(isInterval, {startDate: moment(value), endDate: props.dateInterval.endDate })
        }
        
    }

    const onEndChange = (value: Date) => {
        props.setIsInterval(isInterval, {startDate: props.dateInterval.startDate, endDate: moment(value) })
    }

    return (
        <div className="w-100">
            <DatePicker
                locale={enUs}
                mode="date"
                value={props.dateInterval.startDate.toDate()}
                onChange={onStartChange}
            >
                <List.Item className="w-100">
                {isInterval ? 'Start:' : 'Date:'}
                </List.Item>
            </DatePicker>

            {isInterval ?
                <DatePicker
                    locale={enUs}
                    mode="date"
                    value={props.dateInterval.endDate.toDate()}
                    onChange={onEndChange}
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