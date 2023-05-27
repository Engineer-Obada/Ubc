import React, { useState } from 'react'
import AppsContainer from '@crema/core/AppsContainer';
import Products from './Products';
import { useGetDataApi } from '@crema/utility/APIHooks';

export default function product() {
  // const api = 'api'
  const [isAddProductOpen, setAddProductkOpen] = React.useState(false);
  const [{apiData:ProductData},{reCallAPI}] = useGetDataApi(`http://192.168.43.197:8080/api/product`);
  const [productSlected, setProductSelected] = useState(null);
  

  const onOpenAddProduct = () => {
    setAddProductkOpen(true);
  };
  const onOpenEditProduct = (row)=>{

    setAddProductkOpen(true);
    setProductSelected(row)
  }

  const onCloseAddProduct = () => {
    setAddProductkOpen(false);
  };
  
  
  return (
     <AppsContainer> 
    <Products 
    productSlected={productSlected}
    onCloseAddProduct={onCloseAddProduct} 
    onOpenAddProduct={onOpenAddProduct}
    onOpenEditProduct={onOpenEditProduct}
    isAddProductOpen={isAddProductOpen} productsTableData={ProductData}
    reCallAPI={reCallAPI}
    />
    </AppsContainer>

  )
}
