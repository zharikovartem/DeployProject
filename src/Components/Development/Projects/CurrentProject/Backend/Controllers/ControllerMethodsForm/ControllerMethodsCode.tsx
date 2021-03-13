import React from 'react'
import { ControllerMethodsType } from '../../../../../../../api/ControllerMethodsAPI'
import { ControllersType } from '../../../../../../../api/projectAPI'
import { tab } from '../../../../../Code/Model/ModelCode'

type ControllerMethodsCodePropsType = {
    methodData: ControllerMethodsType | null,
    controllerData: ControllersType
}

const ControllerMethodsCode: React.FC<ControllerMethodsCodePropsType> = (props) => {

    let request: Array<any> = []
    if (props.methodData?.request) {
        console.log(JSON.parse(props.methodData?.request))
        request = JSON.parse(props.methodData?.request)
    }

    console.log(props)

    return (
        <div>
            <h5>ControllerMethodsCode:</h5>
            <code>{tab(1, '/**')}</code><br />
            <code>{tab(1, '* Descriptions')}</code><br />
            {request.map(item => {
                return (
                    <div key={item.name}>
                        <code key={item.name}>{tab(1, '* @param  \\Illuminate\\Http\\' + item.type + '  $' + item.name)}</code><br />
                    </div>
                )
            })}
            <code>{tab(1, '* @return \\Illuminate\\Http\\Response')}</code><br />
            <code>{tab(1, '*/')}</code><br />

            <code>{tab(1, 'public function ' + props.methodData?.name + '(')}</code>

            {request.length > 0 ?
                request.map( (item, index: number) => {
                    // return (
                    //     <code key={item.name}>{tab(0, '' + item.type + '  $' + item.name)}</code>
                    // )
                    if (index > 0 ) {
                        return (
                            <code key={item.name}>{tab(0, ', ' + item.type + '  $' + item.name)}</code>
                        )
                    } else {
                        return (
                            <code key={item.name}>{tab(0, '' + item.type + '  $' + item.name)}</code>
                        )
                    }
                })
                :
                null
            }

            <code>{tab(0, ')')}</code><br />
            <code>{tab(1, '{')}</code><br />
            <code>{tab(2, '//...')}</code><br />
            <code>{tab(2, 'return response()->json([')}</code><br />
            {/* <br/> */}
            <code>{tab(3, '"key"=>"$value" // example')}</code><br />
            <code>{tab(2, '], 200);')}</code><br />
            <code>{tab(1, '}')}</code><br />

            <li>Какой код возвращает метод,</li>
        </div>
    )
}

export default ControllerMethodsCode