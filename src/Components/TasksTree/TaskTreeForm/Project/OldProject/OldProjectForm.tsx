import { Field } from 'formik'
import React, { useEffect, useState } from 'react'
import { AntdOptionsType } from '../../../../../Types/types'
import { AntSelect } from '../../../../../utils/Formik/CreateAntField'
import {OldProjectFormPropsType} from './OldProjectFormContainer'

export type OwnOldProjectFormPropsType = {
    submitCount: (val:any)=>void
}
const OldProjectForm: React.FC<OldProjectFormPropsType> = (props) => {
    useEffect( ()=> {
        if (!props.isProjectListLoaded) {
            props.getProjectList()
        }
    }, [props.isProjectListLoaded, props])

    useEffect( ()=> {
        if(props.projectList && props.projectList.length>0) {
            setOldProjectsData(props.projectList.map( (item: any)=> {
                return(
                    {name: item.name, value: item.id.toString()}
                )
            }))
        }
    }, [props.projectList])

    const [oldProjectsData, setOldProjectsData] = useState<Array<AntdOptionsType>>([])

    const onProjectSelect = (val: number) => {
        console.log('project id: ',val)
        console.log( props.projectList.filter(item=> item.id === Number(val))[0] )
    }
    
    return(
        <Field
            component={AntSelect}
            selectOptions={oldProjectsData}
            name="project_name"
            type="select"
            label="Choise backend project"
            onSelect = {onProjectSelect}
            submitCount={props.submitCount}
        />
    )
}

export default OldProjectForm