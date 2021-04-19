import { Button } from 'antd'
import React, {useState, useEffect} from 'react'
import { ProductType } from '../../api/productsAPI'
import ProductsCategoryTree from './ProductsCategoryTree/ProductsCategoryTree'
import {ProductsPropsType} from './ProductsContainer'

const Products: React.FC<ProductsPropsType> = (props) => {
    const [catalogListTree, setCatalogListTree] = useState<Array<CatalogListTreeItemType>>()
    useEffect( ()=>{
        if (props.productCategoryList.length === 0) {
            props.getProductCategoryList()
        } else {
            console.log('setCatalogListTree')
            setCatalogListTree(createCatalogListTree(props.productCategoryList))
        }
        
    },[props.productCategoryList])

    console.log(props)
    console.log(catalogListTree)

    return(
        <div>
            <div>
                <Button onClick={props.startCatalogParsing} className="m-2" type="primary">getCatalog</Button>
            </div>
            Products Catalog:
            <ProductsCategoryTree 
                catalogListTree={catalogListTree} 
                startCatalogItem={props.startCatalogItem} 
                startProductParamParsing={props.startProductParamParsing}
                getProductDescriptions={props.getProductDescriptions}
            />

            Active Catigories:
        </div>
    )
}

export default Products

export type CatalogListTreeItemType = ProductType & {
    childs?: Array<CatalogListTreeItemType>
}

const createCatalogListTree = (productCategoryList: Array<CatalogListTreeItemType> ,targetId: number = 0): Array<ProductType> => {
    let catalogListTree: Array<CatalogListTreeItemType> = []
    
    for (let index = 0; index < productCategoryList.length; index++) {
        const item = productCategoryList[index];
        if (item.parent_id === targetId) {
            const childs = getChildsForCatalogListItem(item, productCategoryList)
            const test = childs.map(child => {
                return({
                    ...child,
                    childs: createCatalogListTree(productCategoryList, child.id)
                })
            })

            item.childs = test
            catalogListTree.push(item)
        }
    }
    
    return catalogListTree
}

const getChildsForCatalogListItem = ( target: CatalogListTreeItemType, productCategoryList: Array<CatalogListTreeItemType> ): Array<CatalogListTreeItemType> => {

    const childsList = productCategoryList.filter( (item) => {
        return item.parent_id === target.id
    })

    return  childsList
}