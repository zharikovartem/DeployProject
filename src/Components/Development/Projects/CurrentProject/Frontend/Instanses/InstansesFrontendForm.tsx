import { Button, Tree } from "antd"
import { Field, Form, FormikProps } from "formik"
import React, { ReactNode, useState } from "react"
import { AntInput } from "../../../../../../utils/Formik/CreateAntField"
import { validateRequired } from "../../../../../../utils/Formik/ValidateFields"


const InstansesFrontendForm: ((props: FormikProps<{}>) => ReactNode) = (props) => {
    const [isDataChanged, setIsDataChanged] = useState(false)

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

            {/* <div className="d-flex justify-content-center"> */}
                <TreeSRC />
            {/* </div> */}
            

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
    name: string
}

const FolderRow:React.FC<FolderRowPropsType> = (props) => {
    return(
        <div>{props.name}
            <Button className="ml-2" type="primary" size="small">Add</Button>
            <Button className="ml-2" type="primary" size="small">Dell</Button>
        </div>
    )
}

type treeDataItem = {
    title: string | JSX.Element,
    key: string,
    disableCheckbox?: boolean,
    disabled?: boolean,
    children?: Array<treeDataItem>
}

const treeData: Array<treeDataItem> = [
    {
        title: <FolderRow name="src"/>,
        key: '0-0',
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
                title: <FolderRow name="Components"/>,
                key: '0-0-1',
                children: [{ title: <FolderRow name="Development"/>, key: '0-0-1-0' }],
            },
        ],
    },
];

