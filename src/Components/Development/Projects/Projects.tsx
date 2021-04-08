import { List } from 'antd'
import React, { useEffect } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import { ProjectsPropsType } from './ProjectsContainer'

export type OwnProjectsPropsType = {}

const Projects: React.FC<ProjectsPropsType> = (props) => {
    useEffect(() => {
        if (!props.isProjectListLoaded) {
            props.getProjectList()
        }
    }, [props, props.isProjectListLoaded, props.projectList])

    // const [projectList, setProjectList] = useState<Array<any>>()

    let { url } = useRouteMatch();
    
    console.log(props)

    return (
        <>
            <h4>Projects</h4>
            <li>Add project</li>
            <List
                // header={<div>Header</div>}
                // footer={<div>Footer</div>}
                bordered
                dataSource={props.projectList}
                renderItem={item => (
                    <List.Item
                        // actions={[<a href="#" key="list-loadmore-edit">show</a>,]}
                    >
                         <Link to={url+'/'+item.id}>{item.name}</Link>
                    </List.Item>
                )}
            />
        </>
    )
}

export default Projects