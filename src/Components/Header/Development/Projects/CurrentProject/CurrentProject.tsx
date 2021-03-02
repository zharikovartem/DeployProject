import { Collapse, Spin, List, Pagination, Button, Drawer } from 'antd'
import React, { useEffect } from 'react'
import Backend from './Backend/BackendContainer'
import { CurrenProjectPropsType } from './CurrentProjectContainer'

const { Panel } = Collapse

export const getTargetProject = (projectList: Array<any>, userId: string): any => {
    return projectList.filter((item: any) => item.id.toString() === userId)[0]
}

const CurrentProject: React.FC<CurrenProjectPropsType> = (props) => {
    useEffect(() => {
        if (!props.isProjectsLoaded) {
            props.getProjectList()
        }
    }, [props.isProjectsLoaded])

    console.log(props)

    const project = getTargetProject(props.projectsList, props.match.params.userId)

    if (project) {
        return (
            <>
                <h3>{project.name}</h3>
                <Collapse defaultActiveKey={[]}>
                    {project.backend_id ?
                        <Panel header="Backend" key="1">
                            Backend data to {project.backend_id}
                            <Backend projectId={props.match.params.userId}/>
                        </Panel>
                        :
                        null
                    }
                    {project.frontend_id ?
                        <Panel header="Frontend" key="2">
                            Frontend data
                        </Panel>
                        :
                        null
                    }
                </Collapse>
            </>
        )
    } else {
        return <Spin key="spin" size="large" />
    }


}

export default CurrentProject