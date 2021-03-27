import { List } from 'antd'
import { Button } from 'antd'
import React, { useState, useEffect } from 'react'
import { WordType } from '../../../api/vocabularyAPI'
import { LerningWordsPropsType } from './LerningWordsContainer'


type ParentIdType = {
    parentId: number
}
type RelationsType = WordType & ParentIdType

const LerningWords: React.FC<LerningWordsPropsType> = (props) => {
    const [selectedWordsIds, setselectedWordsIds] = useState<Array<number>>([])
    const [wordsToCompare, setWordsToCompare] = useState<Array<RelationsType>>([])

    useEffect( () => {
        setWordsToCompare( getWordsToCompare(props.wordsArray, props.wordsCount, props.target) )
        setselectedWordsIds([])
    },[props.target])

    const choiseValues = (id: number) => {
        let newNelectedWordsIds: Array<number> = [...selectedWordsIds]
        newNelectedWordsIds.push(id)
        setselectedWordsIds(newNelectedWordsIds)
    }

    const onCheck = () => {
        console.log(selectedWordsIds)
        const check = selectedWordsIds.filter(i => i !== props.target?.id)
        if (selectedWordsIds.length !== 0) {
            if (check.length !== 0) {
                alert('false')
            } else {
                alert('OK')
            }
        } else {
            alert('Please choise!')
        }
        
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
                    <List.Item>
                        <Button className="my-0" type="link" block onClick={()=>{choiseValues(item.parentId)}}>
                            {item.name}
                        </Button>
                    </List.Item>
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
            const relations: Array<RelationsType> = words[index].relations.map((item) => {
                return ({
                    ...item,
                    parentId: words[index].id
                })
            })

            wordsToCompare = wordsToCompare.concat(relations)
            wordsToCompare = wordsToCompare.filter((v, i, arr) => arr.indexOf(v) == i)
            wordsToCompareLength++
        }

        const targetRelations: Array<RelationsType> = target.relations.map((item) => {
            return ({
                ...item,
                parentId: target.id
            })
        })

        wordsToCompare = wordsToCompare.concat(targetRelations)
        wordsToCompare = shuffle(wordsToCompare)
    } 

    // console.log('wordsToCompare: ', wordsToCompare)

    // console.groupEnd();
    return wordsToCompare
}