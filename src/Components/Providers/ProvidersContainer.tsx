import {connect} from 'react-redux'
import Providers from './Providers'
import { AppStateType } from '../../redux/store'
import {getProvidersList, createNewProvider, updateProvider} from './../../redux/ProviderReducer'

type OwnProvidersPropsType = {

}

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getProvidersList: ()=> void
    createNewProvider: (values: any)=>void,
    updateProvider: (values: any, providerId: number)=>void
}

export type ProvidersPropsType = MapPropsType & MapDispatchPropsType & OwnProvidersPropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        providorsList: state.providors.providersList
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnProvidersPropsType, AppStateType>(mapStateToProps, 
    {getProvidersList, createNewProvider, updateProvider}) 
    (Providers)
    

