import React from 'react'
import { ControllerMethodsType } from '../../../../../../../api/ControllerMethodsAPI'
import { ControllersType } from '../../../../../../../api/projectAPI'
import { tab } from '../../../../../Code/Model/ModelCode'
import { ResponreItemsType, ResponseType } from './ControllerMethodsForm'

type ControllerMethodsCodePropsType = {
    methodData: ControllerMethodsType | null,
    controllerData: ControllersType
}

const ControllerMethodsCode: React.FC<ControllerMethodsCodePropsType> = (props) => {

    let request: Array<any> = []
    if (props.methodData?.request) {
        // console.log(JSON.parse(props.methodData?.request))
        request = JSON.parse(props.methodData?.request)
    }

    console.log('ControllerMethodsCode props:',props)

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

            
            {/* ПОЛУЧАЕМ BODY */}
            {
                props.methodData !== null && props.methodData.body_actions?
                <><br />
                {getBody(1,  props.methodData?.body_actions)}
                </>
                : <><code>{tab(2, '//...')}</code><br /></>
            }


            {/* <code>{tab(2, 'return response()->json([')}</code><br /> */}

            {/* Получаем RESPONSE */}
            {/* <code>{tab(3, getResponse( props.methodData !== null ? JSON.parse(props.methodData.response) : null))}</code><br />  */}

            {
                 props.methodData !== null && props.methodData.response?
                getResponse(2, props.methodData !== null ? JSON.parse(props.methodData.response) : null )
                : <><code>{tab(2, '//...')}</code><br /></>
            }


            {/* <code>{tab(2, '], 200);')}</code><br /> */}

            {/* { props.methodData !== null ? getResponse( JSON.parse(props.methodData.response)) : null} */}

            <code>{tab(1, '}')}</code><br />

            <li>Какой код возвращает метод,</li>
        </div>
    )
}

export default ControllerMethodsCode

const getResponse = (tab: number, responseData: ResponseType) => {
    switch (responseData.type) {
        case 'method':
            return getMetodResponse(tab, responseData)
    
        case 'Response':
            const responseArray: Array<JSX.Element> = getResponseResponse(tab, responseData)
            return responseArray
        default:
            break;
    }
}

const getMetodResponse = (tabIndex: number, response: ResponseType) => {
    const methodName = response.methodName
    console.log('methodName: ', methodName)
    // return <>{'return self::'+methodName+'();'}</>
    return [<><code>{tab(tabIndex, 'return self::'+methodName+'()')}</code><br/></>]
}

const getResponseResponse = (tabIndex: number, response: ResponseType) => {
    console.log('response: ', response)
    let responseBlock: Array<JSX.Element> = []
    responseBlock.push(<><code>{tab(tabIndex, 'return response()->json([')}</code><br /></>)

    if (response.responseItems) {
        console.log(response.responseItems)
        response.responseItems.map( (item: ResponreItemsType, index) => {          
            // if (index > 0) {
            //     responseBlock.push(<><code>{tab(tabIndex, '"'+item.key+'"=> $'+item.variable)}</code><br/></>)
            // } else {
                responseBlock.push(<><code>{tab(tabIndex+1, '"'+item.key+'"=> $'+item.variable+', ')}</code><br/></>)
            // }
        })
    } else {
        console.log(response.responseItems)
    }

    responseBlock.push(<><code>{tab(tabIndex, '], 200);')}</code><br /></>)
    console.log('responseBlock: ', responseBlock)
    return responseBlock
}

const getBody = (tabIndex: number, body: string) => {
    return <><pre>{ tab( tabIndex, body) }</pre><br /></>
}