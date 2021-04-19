import {connect} from 'react-redux'
import Products from './Products'
import { AppStateType } from '../../redux/store'
import {startCatalogParsing, getProductCategoryList, startCatalogItem, startProductParamParsing, getProductDescriptions} from './../../redux/productsReducer'

type OwnProductsPropsType = {

}

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    startCatalogParsing: ()=>void,
    getProductCategoryList: ()=>void,
    startCatalogItem: (catalogItemName: string) => void
    startProductParamParsing: (catalogItemName: string) => void
    getProductDescriptions: (catalogItemName: string) => void
}

export type ProductsPropsType = MapPropsType & MapDispatchPropsType & OwnProductsPropsType

let mapStateToProps = (state:AppStateType) => {
    return {
        productCategoryList: state.products.productCatigoryList,
        // location: state.app.location,
        // authError: state.auth.authError
    }
}

export default connect<MapPropsType, MapDispatchPropsType, OwnProductsPropsType, AppStateType>(mapStateToProps, 
    {startCatalogParsing, getProductCategoryList, startCatalogItem, startProductParamParsing, getProductDescriptions}) 
    (Products)
    

