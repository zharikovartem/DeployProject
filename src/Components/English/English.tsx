import { Button, List } from 'antd'
import React, {useEffect} from 'react'
import { EnglishPropsType } from './EnglishContainer'


const English:React.FC<EnglishPropsType> = (props) => {

    useEffect( ()=>{
        props.getVocabularyList(1)
    },[])

    const onPlay = (url:string | null) => {
        console.log(url)
        if (url) {
            const audio = new Audio(url)
            audio.play()
        } 
        
    }

    console.log(props)
    return(
        <>
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

            <button 
                data-url={"https://s3-eu-west-1.amazonaws.com/com.idmgroup.lab.sounds.prod/en/0/b/8/0b8263d341de01f741e4deadfb18f9eb.mp3"}
            >
                play
            </button>

            

        </div>

        {/* <div >
        {props.vocabularyList.map(item => {
            return(
                <div className="row">
                <Button
                    type={item.eng_sound ? "primary" : "ghost"}
                    onClick={()=>{onPlay(item.eng_sound)}}
                >
                    {item.eng_value}
                </Button> : {item.rus_value}
                </div>
            )
        })}
        </div> */}

        <List
            size="small"
            header={<div>Header</div>}
            footer={<div>Footer</div>}
            bordered
            dataSource={props.vocabularyList}
            renderItem={ (item: any) => 
                    <List.Item
                    // actions={item.eng_sound ? [<a key={item.eng_sound} onClick={()=>{onPlay(item.eng_sound)}}>sound</a>] : []}
                    >
                        <div className="row w-100">
                            <div className="col-5">
                                {item.eng_value}
                            </div>
                            <div className="col-5">
                                {item.rus_value}
                            </div>
                            {item.eng_sound ? <div className="col-2">
                            <Button
                                type={item.eng_sound ? "primary" : "ghost"} size="small"
                                onClick={()=>{onPlay(item.eng_sound)}}
                            >eng</Button>
                            </div> : null}
                        </div>
                    </List.Item>
            }
        />

        </>
    )
}

export default English