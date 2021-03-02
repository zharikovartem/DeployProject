import { Field } from 'formik'
import React, {useState, useEffect} from 'react'
import { AntdOptionsType } from '../../../../../Types/types'
import { AntSelect } from '../../../../../utils/Formik/CreateAntField'
import {BackendFormPropsType} from './BackendFormContainer'

export type OwnBackendFormPropsType = {
    isBackendNew: boolean,
    onSelectBackEndType: (val: any) => void,
    submitCount: (val: any)=>void
}

const BackendForm: React.FC<BackendFormPropsType> = (props) => {
    useEffect( ()=> {
        if (!props.isBackendNew && !props.isProjectListLoaded) {
            props.getProjectList()
        }
    }, [props.isBackendNew, props.isProjectListLoaded])

    useEffect( ()=> {
        if(props.projectList && props.projectList.length>0) {
            setOldProjectsData(props.projectList.map(item => {
                return(
                    {name: item.name, value: item.name}
                )
            }))
        }
    }, [props.projectList])

    const [isBackendNew, setIsBackendNew] = useState(props.isBackendNew)
    const [oldProjectsData, setOldProjectsData] = useState<Array<AntdOptionsType>>([])

    const submitBackendIsNew = (val: any) => {
        setIsBackendNew(val.target.checked)
    }

    const backendTypeOptions = [
        {
            name: 'Laravel',
            value: 'laravel'
        },
        {
            name: 'Other',
            value: 'other'
        },
    ]

    // console.log(props)

    if (props.isBackendNew) {
        return(
            <Field
                component={AntSelect}
                selectOptions={backendTypeOptions}
                name="backendType"
                type="select"
                label="Backend type"
                onSelect = {props.onSelectBackEndType}
                submitCount={props.submitCount}
            />
        )
    } else {
        return(
            <>
            get old projects
            <Field
                component={AntSelect}
                selectOptions={oldProjectsData}
                name="backend_project"
                type="select"
                label="Choise backend project"
                onSelect = {props.onSelectBackEndType}
                submitCount={props.submitCount}
            />
            </>
        )
    }
    
}

export default BackendForm