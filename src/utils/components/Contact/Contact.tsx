import { Button } from 'antd'
import React from 'react'

type ContactPropsType ={

}

const Contact: React.FC<ContactPropsType> = (props) => {
    return(
        <div>
            <div className="row ">
                <div className="col-6 d-flex flex-row">
                    Contacts:
                </div>
                <div className="col-6 d-flex flex-row-reverse">
                    <Button onClick={()=>{}} size="small" type="primary">Add</Button>
                </div>
            </div>
        </div>
    )
}

export default Contact