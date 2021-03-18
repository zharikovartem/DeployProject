import { Button, Tree } from "antd"
import { Field, Form, FormikProps, FormikValues } from "formik"
import React, { ReactNode, useState } from "react"
import { AntInput } from "../../../../../../utils/Formik/CreateAntField"
import { validateRequired } from "../../../../../../utils/Formik/ValidateFields"

type OtherProps = {

}

const InstansesFrontendForm: ((props: OtherProps & FormikProps<FormikValues>) => ReactNode) = (props) => {
    const [isDataChanged, setIsDataChanged] = useState(false)

    // const [srcTree, setSrcTree] = useState(props.initialValues.src_tree)
    const [srcTree, setSrcTree] = useState(treeData)

    const addTreeItem = (trace:Array<string>) => {
        for (let index = 0; index < trace.length; index++) {
            const key = trace[index]
            console.log(key)
        }
    }

    const onChange = (val: any) => {
        setIsDataChanged(true)
    }

    return (
        <Form
            className="form-container mt-2"
            onSubmit={props.handleSubmit}
        >
            <Field
                component={AntInput}
                name="name"
                type="text"
                label="Name"
                validate={validateRequired}
                submitCount={props.submitCount}
                hasFeedback
                onChange={onChange}
            />

            <TreeSRC addTreeItem={addTreeItem}/>

            {isDataChanged ?
                <div className="submit-container">
                    <button className="ant-btn ant-btn-primary" type="submit">
                        Save
                    </button>
                </div>
                : null}

        </Form>
    )
}

export default InstansesFrontendForm


type TreeSRCPropsType = {
    addTreeItem: (trace:Array<string>) => void,
}

const TreeSRC: React.FC<TreeSRCPropsType> = (props) => {
    const onSelect = (selectedKeys: React.Key[], info: any) => {
        console.log('selected', selectedKeys, info);
    }

    const onCheck = (checkedKeys: any, info: any) => {
        console.log('onCheck', checkedKeys, info);
    }
    return (
        <div className="ant-row ant-form-item ">
            <div className="ant-col ant-form-item-label pr-2">SRC tree:</div>
            <div className="ant-col ant-form-item-control">
            <Tree
                checkable
                defaultExpandedKeys={[]}
                defaultSelectedKeys={['0-0-0', '0-0-1']}
                defaultCheckedKeys={['0-0-0', '0-0-1']}
                onSelect={onSelect}
                onCheck={onCheck}
                treeData={treeData}
            />
            </div>
        </div>
    )
}

type FolderRowPropsType = {
    name: string,
    trace: Array<string>
    // addTreeItem: (trace:Array<string>) => void,
    
}

export const FolderRow:React.FC<FolderRowPropsType> = (props) => {
    const onAdd = (v: Array<string>) => {
        console.log(v)
        // addTreeItem(trace).bind(props.trace)
    }
    return(
        <div>{props.name}
            <Button onClick={()=>{onAdd(props.trace)}} className="ml-2" type="primary" size="small">Add</Button>
            <Button className="ml-2" type="primary" size="small">Dell</Button>
        </div>
    )
}

export type treeDataItem = {
    title: string | JSX.Element,
    key: string,
    disableCheckbox?: boolean,
    disabled?: boolean,
    children?: Array<treeDataItem>,
    trace?: Array<string>,
}

const treeData: Array<treeDataItem> = [
    {
        title: <FolderRow name="src" trace={['src']}/>,
        key: '0',
        trace:['0'],
        children: [
        //     {
        //         title: <FolderRow name="parent 1-0"/>,
        //         key: '0-0-0',
        //         disabled: true,
        //         children: [
        //             {
        //                 title: 'leaf0',
        //                 key: '0-0-0-0',
        //                 // disableCheckbox: true,
        //             },
        //             {
        //                 title: 'leaf1',
        //                 key: '0-0-0-1',
        //             },
        //         ],
        //     },
            {
                title: <FolderRow name="Components" trace={['src', 'Components']}/>,
                key: '0-0-1',
                children: [{ title: <FolderRow name="Development" trace={['src', 'Components', 'Development']}/>,  key: '0-0-1-0' }],
            },
        ],
    },
];

