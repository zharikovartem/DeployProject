import {connect} from 'react-redux'
import Contact from './Contact'
import { AppStateType } from '../../../redux/store'
// import {getProvidersList, createNewProvider, updateProvider} from './../../../redux/ProviderReducer'
import {createNewContact} from './../../../redux/ContactsReducer'
import { ContactType } from '../../../api/ProviderAPI'

type OwnContactPropsType = {
    contacts: Array<ContactType>,
    parentId?: number,
    parentType?: string,
    canAdd: boolean
}

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    // getProvidersList: ()=> void
    // createNewProvider: (values: any)=>void,
    // updateProvider: (values: any, providerId: number)=>void
    createNewContact: (values: any) => void
}

export type ContactPropsType = MapPropsType & MapDispatchPropsType & OwnContactPropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        providorsList: state.contacts.contactList
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnContactPropsType, AppStateType>(mapStateToProps, 
    {createNewContact}) 
    (Contact)
    

