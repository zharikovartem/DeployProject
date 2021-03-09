import {Modal} from 'antd'
import React, {useState, useEffect} from 'react'
import { CodeModalPropsType } from './CodeModalContainer'
import ModelCodeContainer from './Model/ModelCodeContainer'

const CodeModal: React.FC<CodeModalPropsType> = (props) => {
    const onClose = () => {
        props.setShowCodeModal(false, props.codeType, props.codeRowsArray, props.codeTargetName, [])
    }

    const getTargetComponennt = () => {
        switch (props.codeType) {
            case 'model':
                return <ModelCodeContainer />
        
            default:
                return <div>No data</div>
        }
    }

    return(
        <Modal title="Code modal" visible={props.isModalVisible} onOk={onClose} onCancel={onClose} width={1000}>
            {getTargetComponennt()}
        </Modal>
    )
}

export default CodeModal

