import { Button, Checkbox, Input } from 'antd'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
import React, { ChangeEventHandler, useState } from 'react'
import { ContactType } from '../../../api/ProviderAPI'
import {ContactPropsType} from './ContactContainer'

const Contact: React.FC<ContactPropsType> = (props) => {
    const [contacts, setContacts] = useState<Array<ContactType>>(props.contacts)

    const addContact = () => {
        console.log('addContact')
        const newContact: ContactType = {
            // id: contacts.length,
            name: '',
            phone: '',
            status: 'new',
            Skype: false,
            Viber: false,
            Telegram: false,
            WhatsApp: false,
        }
        let contactsCopy = [...contacts]
        contactsCopy.push(newContact)
        setContacts(contactsCopy)
    }

    const saveNewContact = (contact: ContactType) => {
        console.log('saveNewContact', contact)

        let contactsCopy = [...contacts]

        if (contact.id !== undefined) {
            console.log(contactsCopy[contact.id])
            contactsCopy[contact.id] = contact
            contactsCopy[contact.id].status = 'old'
        }

        setContacts(contactsCopy)

        props.createNewContact({
            ...contact,
            Skype: null,
            Viber: null,
            Telegram: null,
            WhatsApp: null,
            providers_id: props.parentId
        })
    }

    const onCancel = (index: number) => {
        console.log(index)
        let contactsCopy = [...contacts]
        contactsCopy.splice(index, 1)
        setContacts(contactsCopy)
    }

    console.log(props)

    return (
        <div>
            <div className="row ">
                <div className="col-6 d-flex flex-row">
                    Contacts:
                </div>
                <div className="col-6 d-flex flex-row-reverse">
                    <Button disabled={!props.canAdd} onClick={addContact} size="small" type="primary">Add</Button>
                </div>
            </div>
            {
                contacts.map((contact, index: number) => {
                    if(contact.status === 'new') {
                        return <NewContactForm key={index} onCancel={onCancel} index={index} contact={contact} saveNewContact={saveNewContact}/>
                    } else {
                        return(
                            <div key={index}>
                                <div className="row mt-2 border p-2">
                                    <div className="col-3 d-flex flex-row-reverse mt-1">
                                        {contact.name}:
                                    </div>
                                    <div className="col-7 d-flex flex-row mt-1">
                                        {contact.phone}
                                    </div>
                                    <div className="col-2 d-flex flex-row">
                                        <Button size="small" type="ghost">Edit</Button>
                                    </div>
                                </div>
                            </div>
                        ) 
                    }
                })
            }

        </div>
    )
}

export default Contact

type NewContactFormPropsType = {
    index: number
    contact: ContactType
    saveNewContact(contact: ContactType):void,
    onCancel(index: number):void
}

const NewContactForm: React.FC<NewContactFormPropsType> = (props) => {
    const [contactData, setContactData] = useState<ContactType>({...props.contact, id: props.index})
    const plainOptions = [
        'Skype', 
        'Viber', 
        'Telegram', 
        'WhatsApp'
    ]

    const onChange = (checkedValue: CheckboxValueType[]) => {
        console.log(checkedValue)
        let contactDataCopy = {...contactData}
        for (let index = 0; index < checkedValue.length; index++) {
            const element = checkedValue[index];
            // @ts-ignore
            contactDataCopy[element] = true
        }

        setContactData(contactDataCopy)
    }

    const onSave = () => {
        // return contactData
        props.saveNewContact(contactData)
    }
    
    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e)
        setContactData({
            ...contactData,
            name: e.target.value
        })
    }

    const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e)
        setContactData({
            ...contactData,
            phone: e.target.value
        })
    }

    return(
        <div className="mb-4">
            <div className="row mt-2">
                <div className="col-3 d-flex flex-row-reverse mt-2">
                    Name:
                </div>
                <div className="col-9 d-flex flex-row">
                    <Input onChange={onNameChange} value={contactData.name} className="w-100"></Input>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-3 d-flex flex-row-reverse mt-2">
                    Phone:
                </div>
                <div className="col-9 d-flex flex-row">
                    <Input onChange={onPhoneChange} value={contactData.phone} className="w-100"></Input>
                </div>
            </div>

            <div className="row mt-2">
            <Checkbox.Group options={plainOptions} defaultValue={[]} onChange={onChange} />
            </div>

            <div className="row mt-2 mr-1 d-flex flex-row-reverse">
                <Button className="mx-2" onClick={()=>{props.onCancel(props.index)}} size="small" type="primary">Cancel</Button>
                <Button className="mx-2" onClick={onSave} size="small" type="primary">Save</Button>
            </div>
        </div>
        
    )
}