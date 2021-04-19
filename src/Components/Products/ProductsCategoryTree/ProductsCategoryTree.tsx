import { Collapse } from 'antd'
import { Button } from 'antd-mobile'
import React from 'react'
import { CatalogListTreeItemType } from './../Products'

const { Panel } = Collapse

type ProductsCategoryTreePropsType = {
    catalogListTree: CatalogListTreeItemType[] | undefined,
    startCatalogItem: (itemId: string) => void,
    startProductParamParsing: (catalogItemName: string) => void,
    getProductDescriptions: (catalogItemName: string) => void
}

const ProductsCategoryTree: React.FC<ProductsCategoryTreePropsType> = (props) => {
    if (props.catalogListTree !== undefined) {
        console.log('!!!!!!', props.catalogListTree)
    }
    

    const callback = (key: Array<string> | string) => {
        // console.log(key)
    }

    return (
        <div>
            <Collapse defaultActiveKey={[]} onChange={callback}>
                { props.catalogListTree !== undefined ?
                    props.catalogListTree.map((item: CatalogListTreeItemType, index: number)=> {
                        if (item.childs!==undefined && item.childs.length > 0) {
                            return(
                                <Panel header={index+') '+item.name} key={item.id.toString()} >
                                    <ProductsCategoryTree 
                                        catalogListTree={item.childs} 
                                        startCatalogItem={props.startCatalogItem}
                                        startProductParamParsing={props.startProductParamParsing}
                                        getProductDescriptions={props.getProductDescriptions}
                                    />
                                </Panel>
                            )
                        } else {
                            return(
                                
                                <div className="ant-collapse-item">
                                    <div className="ant-collapse-header row">
                                        <div className="col-8">
                                            {item.label}({item.total_count!==null ? item.total_count : 0})
                                        </div>
                                        {/* <div className="col-2"> */}
                                            <Button className="mr-2" onClick={()=>{props.startCatalogItem(item.name)}} type="primary" size="small">Get Products</Button>
                                            <Button className="mr-2" onClick={()=>{props.startProductParamParsing(item.name)}} type="primary" size="small">Get Descriptions</Button>
                                            <Button className="mr-2" onClick={()=>{props.getProductDescriptions(item.name)}} type="primary" size="small">Go</Button>
                                        {/* </div> */}
                                    </div>
                                    
                                </div>
                            )
                        }
                        
                    })
                    : null
                }
            </Collapse>
        </div>
    )
}

export default ProductsCategoryTree