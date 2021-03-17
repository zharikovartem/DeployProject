import { Button } from 'antd'
import React from 'react'

type EnglishPropsType = {

}

const English:React.FC<EnglishPropsType> = (props) => {
    return(
        <div>
            <h4>Vocabulary:</h4>
            <div className="row">
                <Button className="ml-auto mr-5" type="primary">Get Vocabulary List</Button>
            </div>
            <li>Бэкэнд словаря</li>
            <li>Api</li>
            <li>Reducer</li>
            <li>CRUD</li>
            <li>Список слов с частотой использования</li>
            <li>Запрос данных на Яндекс</li>
            <br/><br/>
            <li>php artisan make:model Englesh/Vocabulary -mcr</li>
        </div>
    )
}

export default English