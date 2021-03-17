import React, { useEffect } from 'react'
import {BackendPropsType} from './BackendContainer'
import {getTargetProject} from './../CurrentProject'
import { Collapse, Spin } from 'antd'
import { Formik } from 'formik'
import InstansesForm from './Instanses/InstansesForm'
import Models from './Models/ModelsContainer'
import Controllers from './Controllers/ControllersContainer'

const { Panel } = Collapse

const Backend: React.FC<BackendPropsType> = (props) => {
    useEffect( ()=>{
        props.getBackendData(1)
    }, [])

    const project = getTargetProject(props.projectsList, props.projectId.toString())

    // console.log('project', project)

    const instansesInitialValues = {
        name: project.backendData ? project.backendData.name : null,
        url: project.backendData ? project.backendData.url : null,
        ip: project.backendData ? project.backendData.ip : null,
        login: project.backendData ? project.backendData.login : null,
        password: project.backendData ? project.backendData.password : null,
        folder: project.backendData ? project.backendData.folder : null,
    }

    // console.log(props)

    const instansesHandleSubmit = (val: any) => {
        // console.log(project.backendData ? project.backendData.id : undefined)
        // console.log(val)
        if (project.backendData) {
            props.updateBackend(val, project.backendData.id)
        }
    }

    // console.log(project)

    if (project.backendData) {
        return(
            <>
                <h5>{project.backendData.name}</h5>
                <Collapse defaultActiveKey={[]}>
                    <Panel header="Instanses" key="1">
                        <Formik
                            initialValues={instansesInitialValues}
                            onSubmit={instansesHandleSubmit}
                        >
                            {InstansesForm}
                        </Formik>
                    </Panel>
                    <Panel header="Models" key="2">
                        <Models backendId={project.backend_id}/>
                    </Panel>
                    <Panel header="Controllers" key="3">
                        <Controllers backendId={project.backend_id}/>
                    </Panel>
                    <Panel header="Api" key="4">

                    </Panel>
                </Collapse>
                <br/><br/><br/>

                <li>Seeders</li>
                <li>Fasades</li>
                <li>Middleware</li>
                <li>Services</li>
                <li>Events</li>
                <li>Workers</li>
            </>
        )
    } else {
        return <Spin key="spin" size="large" />
    }
    
}

export default Backend