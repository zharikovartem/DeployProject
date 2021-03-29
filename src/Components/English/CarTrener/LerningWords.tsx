import { Checkbox, List } from 'antd'
import { Button } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import React, { useState, useEffect } from 'react'
import { WordType } from '../../../api/vocabularyAPI'
import { LerningWordsPropsType } from './LerningWordsContainer'


type ParentIdType = {
    parentId: number,
    styles?: string,
    checked: boolean
}
type RelationsType = WordType & ParentIdType

const LerningWords: React.FC<LerningWordsPropsType> = (props) => {
    const [selectedWordsIds, setselectedWordsIds] = useState<Array<number>>([])
    const [wordsToCompare, setWordsToCompare] = useState<Array<RelationsType>>([])

    const error = 'bg-danger text-white'
    const success = 'bg-success text-white'

    useEffect( () => {
        setWordsToCompare( getWordsToCompare(props.wordsArray, props.wordsCount, props.target) )
        setselectedWordsIds([])
    },[props.target])

    const choiseValues = (parentId: number, id: number, checked: boolean) => {
        let wordsToCompareCopy = [...wordsToCompare].map( (i, index) => {
            if (i.id == id) {
                console.log()
                return({ ...i, checked: !wordsToCompare[index].checked, styles: '' })
            } else { return i }
        })
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

    const onCheck = () => {
        console.log(selectedWordsIds)
        console.log(wordsToCompare)

        const check = selectedWordsIds.filter(i => i !== props.target?.id)
        if (selectedWordsIds.length !== 0) {
            if (check.length !== 0) {
                // console.log(check)
                const hits = selectedWordsIds.filter(i => i === props.target?.id)
                onError(check, hits)
                
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
                <Button className="mt-3" onClick={onCheck} type="primary">Check</Button>
            </div>
        // <div>123</div>
    )
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

    // console.group('getWordsToCompare')
    // console.log(words)
    // console.log(wordsCount)
    // console.log(target)

    if (target) {
        const getRandomInt = (max: number) => Math.floor(Math.random() * Math.floor(max))

        while (wordsToCompareLength != wordsCount) {
            // console.log(wordsToCompare.length)
            let index = getRandomInt(words.length)
            let relations: Array<RelationsType> = []
            if( words[index].relations) {
                 relations = words[index].relations.map((item) => {
                    return ({
                        ...item,
                        parentId: words[index].id,
                        checked: false
                    })
                })
            }
            

            wordsToCompare = wordsToCompare.concat(relations)
            wordsToCompare = wordsToCompare.filter((v, i, arr) => arr.indexOf(v) == i)
            wordsToCompareLength++
        }
        let targetRelations: Array<RelationsType> = []
        if (target.relations) {
            targetRelations = target.relations.map((item) => {
                return ({
                    ...item,
                    parentId: target.id,
                    checked: false
                })
            })
        }
        

        wordsToCompare = wordsToCompare.concat(targetRelations)
        wordsToCompare = shuffle(wordsToCompare)
    } 

    // console.log('wordsToCompare: ', wordsToCompare)

    // console.groupEnd();
    return wordsToCompare
}