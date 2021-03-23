import { Collapse } from 'antd'
import CollapsePanel from 'antd/lib/collapse/CollapsePanel'
import { Formik } from 'formik'
import React, {useEffect} from 'react'
import InstansesFrontendForm from './Instanses/InstansesFrontendForm'

type FrontendPropsType = {
    projectId: number
}

const Frontend:React.FC<FrontendPropsType> = (props) => {
    useEffect( ()=> {
        getCurrentFrontend(props.projectId)
    },[])
    console.log('Frontend props: ', props)
    type InstansesInitialValuesType = {

    }
    const instansesInitialValues: InstansesInitialValuesType = {
        
    }

    const instansesHandleSubmit = (values: InstansesInitialValuesType) => {
        console.log(values)
    }

    return(
        <div>
            <h5>Frontend</h5>
            <Collapse defaultActiveKey={[]}>
                <CollapsePanel header="Instanses" key="1">
                    <li>1) Create new component "FrontEnd"</li>
                    <li>1.1) Create model</li>
                    <li>1.2) Create migrations</li>
                    <li>1.3) Create controller</li>
                    <Formik
                        initialValues={instansesInitialValues}
                        onSubmit={instansesHandleSubmit}
                    >
                        {InstansesFrontendForm}
                    </Formik>
                </CollapsePanel>
                <CollapsePanel header="APIs" key="2"></CollapsePanel>
                <CollapsePanel header="Reducers" key="3"></CollapsePanel>
                <CollapsePanel header="Components" key="4">
                    <li>1) Create new component</li>
                    <li>1.1) Create model</li>
                    <li>1.2) Create migrations</li>
                    <li>1.3) Create controller</li>
                    <li>2) Get componentList</li>
                   
                </CollapsePanel>
            </Collapse>
        </div>
    )
}

export default Frontend

export const getCurrentFrontend = (projectId: Number) => {
    console.log('getCurrentFrontend for: '+projectId)
}