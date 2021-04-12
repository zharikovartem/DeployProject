import { Checkbox, List, Spin } from 'antd'
import { Button } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import React, { useState, useEffect } from 'react'
import { WordType } from '../../../../api/vocabularyAPI'
import SayingWords from '../SayingWords/SayingWords2'
import { LerningWordsPropsType } from './LerningWordsContainer'


type ParentIdType = {
    parentId: number,
    styles?: string,
    checked: boolean
}
type RelationsType = WordType & ParentIdType

const LerningWords: React.FC<LerningWordsPropsType> = (props) => {
    // console.log('LerningWords props: ', props)
    const [selectedWordsIds, setselectedWordsIds] = useState<Array<number>>([])
    const [wordsToCompare, setWordsToCompare] = useState<Array<RelationsType>>([])

    const error = 'bg-danger text-white'
    const success = 'bg-success text-white'

    useEffect( () => {},[wordsToCompare])

    useEffect( () => {
        // const rand = getRandomInt(2)
        // const rand = 0
        // console.log('!!!!!!!!!!!!', props.rand)
        if (props.rand) {
            setWordsToCompare( getWordsToCompare(props.wordsArray, props.wordsCount, props.target) )
            setselectedWordsIds([])
        } else {
            const rus = reverseWordsArray(props.wordsArray, props.target)
            setWordsToCompare( getWordsToCompare(rus.wordsRus, props.wordsCount, rus.targetRus) )
            setselectedWordsIds([])
        }
        
    },[props, props.target])

    const choiseValues = (parentId: number, id: number, checked: boolean) => {
        let wordsToCompareCopy = [...wordsToCompare].map( (i, index) => {
            if ( i.id === id) {
                return({ ...i, checked: !wordsToCompare[index].checked, styles: '' })
            } else { return i }
        })
        console.log('wordsToCompareCopy: ', wordsToCompareCopy)
        setWordsToCompare(wordsToCompareCopy)

        let newNelectedWordsIds: Array<number> = []

        if (checked) {
            newNelectedWordsIds = [...selectedWordsIds]
            newNelectedWordsIds.push(parentId)
        } else {
            newNelectedWordsIds = selectedWordsIds.filter( i => i !== parentId)
        }
        setselectedWordsIds(newNelectedWordsIds)
    }

    const onCheckEng = (lang: number) => {
        console.log('selectedWordsIds: ', selectedWordsIds)
        console.log('wordsToCompare: ', wordsToCompare)
        const thisTarget = lang ? props.target : {...props.target.relations[0], relations: [props.target]}
        console.log('thisTarget: ', thisTarget)

        const check = selectedWordsIds.filter(i =>  i !== thisTarget.id)
            // if (lang) {
            //     console.log(i,'-1')
            //     return i !== thisTarget.id
            // } else {
            //     console.log(i,'-0: ', thisTarget.relations[0].id, '-', thisTarget.id)
            //     return i !== thisTarget.relations[0].id
            // }
        // })
        console.log('check: ', check)

        if (selectedWordsIds.length !== 0) {
            if (check.length !== 0) {
                // console.log(check)
                const hits = selectedWordsIds.filter(i => i === thisTarget.id)
                onError(check, hits)
                props.checkTestResult({
                    result: 'error'
                }, props.target.id)
            } else {
                // сохраняем результат в БД
                if (props.target) {
                    props.checkTestResult({
                        result: 'success'
                    }, props.target.id)
                }
                
                console.groupCollapsed('Данные для отправки на сервер');
                    console.log('target: ', props.target)
                console.groupEnd();
                // Перешагиваем на другое слово
                props.next(1)
            }
        } else {
            alert('Please choise!')
        }
        
    }

    const onError = (errors: Array<number>, hits:Array<number>) => {
        let wordsToCompareCopy = [...wordsToCompare]
        for (let index = 0; index < wordsToCompare.length; index++) {
            if (errors.includes(wordsToCompareCopy[index].parentId)) {
                wordsToCompareCopy[index].styles = error
            }
            if (hits.includes(wordsToCompareCopy[index].parentId)) {
                wordsToCompareCopy[index].styles = success
            }
        }
        console.log(wordsToCompareCopy)
        setWordsToCompare(wordsToCompareCopy)
    }

    if (wordsToCompare.length === 0) {
        console.log('wordsToCompare: ', wordsToCompare)
        return <Spin size="large" />
    }
    if (props.checkType === 'check') {
        return (
            <div>
                <List
                header={<span>Выберите правельные значения:</span>}
                // footer={<div>Footer</div>}
                size="small"
                bordered
                dataSource={wordsToCompare}
                renderItem={ item => (

                        <h3 className={'my-1 '+item.styles}>
                            <Checkbox 
                                onChange={(e: CheckboxChangeEvent)=>{ choiseValues(item.parentId, item.id, e.target.checked) }}
                                checked={item.checked}
                            >
                                {item.name}
                            </Checkbox>
                        </h3>

                )}
                />
                <Button className="mt-3" onClick={()=>{onCheckEng(props.rand)}} type="primary">Check</Button>
            </div>
    )
    }
    if (props.checkType === 'say') {
        // return <SayingWords {...props} />
    }

    if (props.checkType === 'write') {
        return <div>write</div>
    }

    return <div>???</div>
}

export default LerningWords

const shuffle = (array: Array<any>): Array<any> => {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

const getWordsToCompare = (words: Array<WordType>, wordsCount: number, target: WordType | undefined): Array<RelationsType> => {
    let wordsToCompare: Array<RelationsType> = []
    let wordsToCompareLength = 0

    words = [...words]
    

    // console.group('getWordsToCompare')
    // console.log('words: ', words)
    // console.log('wordsCount: ', wordsCount)
    // console.log('target: ', target)

    if (target) {
        

        while (wordsToCompareLength !== wordsCount) {
            // console.log(wordsToCompare.length)
            // console.log(words.length)
            let index = getRandomInt(words.length)
            let relations: Array<RelationsType> = []
            if (words[index].id !== target.id) {
                // console.log(words[index].id,' !== ',target.id)
                if( words[index].relations) {
                    relations = words[index].relations.map((item) => {
                        // console.log(item.id,'=>',item.name, '(',target.id,')|', index,'-',words)
                        return ({
                            ...item,
                            parentId: words[index].id,
                            checked: false
                        })
                   })
                   // Удаляем элемент
                   words.splice(index, 1);
               } 
   
               wordsToCompare = wordsToCompare.concat(relations)
               wordsToCompare = wordsToCompare.filter((v, i, arr) => arr.indexOf(v) === i)
               wordsToCompareLength++
            }
        }
        let targetRelations: Array<RelationsType> = []
        if (target.relations) {
            targetRelations = target.relations.map((item) => {
                // console.log('!!!!!!!!!!!',item.id,'=>',item.name)
                return ({
                    ...item,
                    parentId: target.id,
                    checked: false
                })
            })
        }
        // console.log('targetRelations: ', targetRelations)

        wordsToCompare = wordsToCompare.concat(targetRelations)
        wordsToCompare = shuffle(wordsToCompare)
    } 

    // console.log('wordsToCompare: ', wordsToCompare)
    // console.groupEnd();

    return wordsToCompare
}

const getRandomInt = (max: number) => Math.floor(Math.random() * Math.floor(max))

const reverseWordsArray = (words: Array<WordType>, target: WordType) => {
    console.log('target', target)
    const targetRus = {
        ...target.relations[0],
        relations: [target]
    }

    let wordsRus: Array<WordType> = []
    words.map( word => {
        const itemRelations = word.relations.map( item => {
            return {
                ...item,
                relations: [word]
            }
        })
        wordsRus = wordsRus.concat(itemRelations)
    })

    return {targetRus, wordsRus}
}