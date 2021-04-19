import React from 'react'
import { Button, Checkbox, Collapse, List } from 'antd'
import { PlusCircleOutlined, DeleteOutlined, EditOutlined, CaretRightOutlined } from '@ant-design/icons'
import { TaskListType } from '../../Types/types'
import { TaskTreeBrowserItemType } from './TaskTreeBrowserItemContainer'
import moment from "moment"
import { InitialDrewerDataType, InitialValuesType } from './TasksTreeBrowser'

const { Panel } = Collapse

export type OwnTaskTreeBrowserItemType = {
    item: TaskListType,
    showDrawer: () => void,
    setDrawerData: React.Dispatch<React.SetStateAction<InitialDrewerDataType>>,
    initialFormValues: InitialValuesType,
    setInitialFormValues: React.Dispatch<React.SetStateAction<InitialValuesType>>,
    initialValues: InitialValuesType,
    onRunTask: (values: number) => void
}

const TaskTreeBrowserItem: React.FC<TaskTreeBrowserItemType> = (props) => {

    const onAddSubtask = (taskId: number) => {
        console.log(taskId)
        props.setInitialFormValues({ ...props.initialValues, parent_id: taskId })
        props.setDrawerData({header: 'add subtask', taskId: false})
        props.showDrawer()
    }

    const onEdit = (values: TaskListType) => {
        console.log(values)
        props.setDrawerData({
            header: 'Edit: "' + values.name + '"',
            taskId: values.id
        })
        let day = moment().zone('GMT')
        if (values.time_to_complete !== null) {
            const splitTime = values.time_to_complete.split(/:/)
            day.hours(parseInt(splitTime[0])).minutes(parseInt(splitTime[1])).seconds(0).milliseconds(0);
        } else {
            day.hours(0).minutes(0).seconds(0).milliseconds(0);
        }
        
        let newFormValues: InitialValuesType = {
            ...props.initialFormValues,
            name: values.name,
            time_to_complete: day,
            descriptions: values.descriptions ? values.descriptions : undefined,
            parent_id: values.parent_id ? values.parent_id : undefined,
            task_type: Number(values.task_type)
        }
        if (values.data) {
            newFormValues = {
                ...newFormValues,
                ...JSON.parse(values.data)
            }
        }
        console.log(newFormValues)
        props.setInitialFormValues(newFormValues)
        props.showDrawer()
    }

    const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const values = { isCompleted: e.target.checked }
        props.updateTaskList(values, Number.parseInt(e.target.id))
    }

    const deleteTask = (taskId: number) => {
        props.deleteTaskList(taskId)
    }

    if (props.item.parent_id === null) {
        return <CollapseItem
            item={props.item}
            taskList={props.taskList}
            key={String(props.item.id)}
            onAddSubtask={onAddSubtask}
            onEdit={onEdit}
            deleteTask={deleteTask}
            onStatusChange={onStatusChange}
            onRunTask={props.onRunTask}
        />
    } else {
        return null
    }
}

export default TaskTreeBrowserItem

type ChildItemType = {
    childsTasklList: Array<TaskListType>,
    taskList: Array<TaskListType>,
    onEdit: (task: TaskListType) => void,
    deleteTask: (task: number) => void,
    onAddSubtask: (taskId: number) => void,
    onStatusChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onRunTask: (values: number) => void
}

const ChildItem: React.FC<ChildItemType> = (props) => {
    return (
        <List
            size="small"
            bordered
            dataSource={props.childsTasklList}
            renderItem={item => {
                return (<CollapseItem
                    item={item}
                    taskList={props.taskList}
                    key={item.id.toString()}
                    onAddSubtask={props.onAddSubtask}
                    onEdit={props.onEdit}
                    deleteTask={props.deleteTask}
                    onStatusChange={props.onStatusChange}
                    onRunTask={props.onRunTask}
                />
                )
            }}
        />
    )
}

type CollapseItemType = {
    key: string
    item: TaskListType,
    taskList: Array<TaskListType>,
    onEdit: (task: TaskListType) => void,
    deleteTask: (task: number) => void,
    onAddSubtask: (taskId: number) => void,
    onStatusChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onRunTask: (values: number) => void
}
const CollapseItem: React.FC<CollapseItemType> = (props) => {
    const childsList = getChildsList(props.taskList, props.item)
    const isLast = childsList.length === 0 ? true : false
    

    let totalTime = moment().hours(0).minutes(0).seconds(0)

    console.groupCollapsed(props.item.name)
    console.log('empty totalTime.format: ', totalTime.format('HH:mm'))
    for (let index = 0; index < childsList.length; index++) {
        const element = childsList[index];

        const elementChildList = getChildsList(props.taskList, element)
        const isElementLast = elementChildList.length > 0 ? false : true

        let timeParts: Array<string> = []
        if (isElementLast) {
            if (element.time_to_complete !== null && !element.isCompleted ) {
                timeParts = element.time_to_complete.split(':')
                console.log(timeParts)
                console.log(totalTime.format('HH:mm'))
                totalTime.add({
                    days: 0,
                    hours: parseInt(timeParts[0]),
                    minutes: parseInt(timeParts[1]),
                    seconds: parseInt(timeParts[2]),
                })
                console.log(totalTime.format('HH:mm'))
                // console.log(element.name, ': ',element.time_to_complete, totalTime.format('HH:mm') )
            }
        } else {
            console.log('not last: ', element.name)
        }
    }
    console.log(props.item.name, ': ',totalTime.format('HH:mm') )
    console.groupEnd()

    if (!isLast) {
        return (
            <List.Item className="p-0" draggable key={props.item.id}>
                <Collapse key={String(props.item.id)} className="w-100" defaultActiveKey={[]} collapsible="header" ghost>
                    <Panel
                        header={
                            // <span key={String(props.item.id)} className="float-left pl-2" >{props.item.name}</span>
                            <div key={String(props.item.id)}>
                                <div>
                                    <span  className="float-left pl-2" >{props.item.name}</span>
                                </div>
                                <div className="float-right pl-2">({totalTime.format('HH:mm')})</div>
                            </div>
                        }
                        key={props.item.id + 'Panel'}
                        extra={<ButtonsBlock {...props} />}
                    >
                        <ChildItem
                            childsTasklList={getChildsList(props.taskList, props.item)}
                            taskList={props.taskList}
                            onEdit={props.onEdit}
                            deleteTask={props.deleteTask}
                            onAddSubtask={props.onAddSubtask}
                            onStatusChange={props.onStatusChange}
                            onRunTask={props.onRunTask}
                        />
                    </Panel>
                </Collapse>
            </List.Item>
        )
    } else {
        return (<LastItem
            item={props.item}
            onEdit={props.onEdit}
            deleteTask={props.deleteTask}
            onAddSubtask={props.onAddSubtask}
            onStatusChange={props.onStatusChange}
            onRunTask={props.onRunTask}
        />)
    }

}

type LastItemType = {
    item: TaskListType,
    onEdit: (task: TaskListType) => void,
    deleteTask: (task: number) => void,
    onAddSubtask: (taskId: number) => void,
    onStatusChange: (e: React.ChangeEvent<any>) => void,
    onRunTask: (values: number) => void
}

const LastItem: React.FC<LastItemType> = (props) => {

    return (
        <List.Item className="py-0" draggable key={String(props.item.id)}>
            <>
                <div className="py-2 pl-3"><Checkbox checked={props.item.isCompleted} id={props.item.id.toString()} onClick={props.onStatusChange} /></div>
                <div className="w-100 float-left" key={String(props.item.id)}>
                    <div className="ml-3 float-left">

                        {
                            props.item.isCompleted ?
                                <span className="text-black-50">{props.item.name}</span>
                                :
                                <span data-toggle="collapse" aria-controls={props.item.id + 'collapseExample'} >{props.item.name}</span >
                        }

                    </div>
                    <div className="ml-3 float-right">
                        {props.item.time_to_complete}
                    </div>
                </div>
                <div className="pr-3">
                    <ButtonsBlock {...props} />
                </div>
            </>
        </List.Item>
    )
}

type ButtonsBlockType = {
    item: TaskListType,
    onEdit: (task: TaskListType) => void,
    deleteTask: (task: number) => void,
    onAddSubtask: (parentId: number) => void,
    onRunTask: (values: number) => void
}

const ButtonsBlock: React.FC<ButtonsBlockType> = (props) => {
    return (
        <div className="d-flex flex-row">
            {Number(props.item.task_type) > 1 ?
                <Button className=""
                    type="primary"
                    shape="circle"
                    size="small"
                    style={{ marginLeft: 10 }}
                    onClick={() => { props.onRunTask(props.item.id) }}
                    icon={
                        <div className="d-flex flex-wrap align-content-start">
                            <CaretRightOutlined className="ml-1" style={{ fontSize: '14px' }} />
                        </div>
                    }
                />
                :
                null
            }
            <Button className=""
                type="primary"
                shape="circle"
                size="small"
                style={{ marginLeft: 10 }}
                onClick={() => { props.onAddSubtask(props.item.id) }}
                icon={
                    <div className="d-flex flex-wrap align-content-start">
                        <PlusCircleOutlined className="ml-1" style={{ fontSize: '14px' }} />
                    </div>
                }
            />
            <Button className=""
                type="primary"
                shape="circle"
                size="small"
                style={{ marginLeft: 10 }}
                onClick={() => { props.onEdit(props.item) }}
                icon={
                    <div className="d-flex flex-wrap align-content-start">
                        <EditOutlined className="ml-1" style={{ fontSize: '14px' }} />
                    </div>
                }
            />
            <Button className=""
                type="primary"
                danger
                shape="circle"
                size="small"
                style={{ marginLeft: 10 }}
                onClick={() => { props.deleteTask(props.item.id) }}
                icon={
                    <div className="d-flex flex-wrap align-content-start">
                        <DeleteOutlined className="ml-1" style={{ fontSize: '14px' }} />
                    </div>
                }
            />
        </div>
    )
}

const getChildsList = (taskList: Array<TaskListType>, item: TaskListType):Array<TaskListType> => {
    let childs: Array<TaskListType> = []
    for (let index = 0; index < taskList.length; index++) {
        const elem = taskList[index]
        if (elem.parent_id === item.id) {
            childs.push(elem)
        }
    }
    return childs
}

const getTotalTime = (totalTime: moment.Moment, target: TaskListType, taskArray: Array<TaskListType>) => {
    const childsList = getChildsList(taskArray, target)

    for (let index = 0; index < childsList.length; index++) {
        const element = childsList[index]

        const elementChildList = getChildsList(taskArray, element)
        const isElementLast = elementChildList.length > 0 ? false : true

        let timeParts: Array<string> = []
        if (isElementLast) {
            if (element.time_to_complete !== null && !element.isCompleted ) {
                timeParts = element.time_to_complete.split(':')
                console.log(timeParts)
                console.log(totalTime.format('HH:mm'))
                totalTime.add({
                    days: 0,
                    hours: parseInt(timeParts[0]),
                    minutes: parseInt(timeParts[1]),
                    seconds: parseInt(timeParts[2]),
                })
                console.log(totalTime.format('HH:mm'))
                // console.log(element.name, ': ',element.time_to_complete, totalTime.format('HH:mm') )
            }
        } else {
            console.log('not last: ', element.name)
        }
    }
}