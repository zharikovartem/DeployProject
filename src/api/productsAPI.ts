import {getToken, instance} from './api'

export type ProductType = {
    created_at: string
    descriptions_count: null| number
    full_url: string | null
    id: number
    is_active: null | boolean
    label: string
    labels: null | string
    name: string
    params: any
    parent_id: number
    total_count: null| number
    type: 'block' | 'subBlock' | 'item'
    updated_at: string,
    url: string | null
}

export const productsAPI = {
    startCatalogParsing() { // Получить весь каталог
        getToken()
        return instance.get<any>(`startCatalogParsing`)
        .then(response => {
            console.log('startCatalogParsing:', response)
            return response.status === 200 ? response : null
        })
        .catch(err => {
            if (err.response) {
                console.log('startCatalogParsing ERROR:', err.response)
                return err.response
            } else if (err.request) {
            } else {
            }
            return null
        })
    },
    getProductCategoryList() { // Получить все разделы Catalog
        getToken()
        return instance.get<Array<ProductType>>(`getCatalogParts`)
        .then(response => {
            console.log('getProductCategoryList:', response)
            return response.status === 200 ? response : null
        })
        .catch(err => {
            if (err.response) {
                console.log('getProductCategoryList ERROR:', err.response)
                return err.response
            } else if (err.request) {
            } else {
            }
            return null
        })
    },
    startCatalogItem(catalogItemName: string) { //
        getToken()
        return instance.get<Array<ProductType>>(`startCatalogItem/`+catalogItemName)
        .then(response => {
            console.log('startCatalogItem:', response)
            return response.status === 200 ? response : null
        })
        .catch(err => {
            if (err.response) {
                console.log('startCatalogItem ERROR:', err.response)
                return err.response
            } else if (err.request) {
            } else {
            }
            return null
        })
    },
    startProductParamParsing(catalogItemName: string){ // Начать парсинг Описаний для раздела
        getToken()
        return instance.get<Array<ProductType>>(`startProductParamParsing/`+catalogItemName)
        .then(response => {
            console.log('startCatalogItem:', response)
            return response.status === 200 ? response : null
        })
        .catch(err => {
            if (err.response) {
                console.log('startCatalogItem ERROR:', err.response)
                return err.response
            } else if (err.request) {
            } else {
            }
            return null
        })
    },
    getProductDescriptions(catalogItemName: string) { // Получить готовые описания для товаров
        getToken()
        return instance.get<Array<ProductType>>(`getProductDescriptions/`+catalogItemName+'/1')
        .then(response => {
            console.log('getProductDescriptions:', response)
            return response.status === 200 ? response : null
        })
        .catch(err => {
            if (err.response) {
                console.log('getProductDescriptions ERROR:', err.response)
                return err.response
            } else if (err.request) {
                console.log(err.request)
            } else {
            }
            return null
        })
    }
}