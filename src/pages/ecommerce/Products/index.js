import React, {useState} from 'react';
import ProductListing from './ProductListing';
import {useIntl} from 'react-intl';
import AppsContainer from '@crema/core/AppsContainer';
import ProductsSidebar from './ProductsSidebar';
export const VIEW_TYPE = {
  GRID: 'grid',
  LIST: 'list',
};

const Products = () => {
  const {messages} = useIntl();
  const [filterData, setFilterData] = useState({
    title: '',
    brand: [],
    ideaFor: [],
    discount: [],
    color: [],
    rating: [],
  });
  const [viewType, setViewType] = useState(VIEW_TYPE.GRID);

  return (
    <AppsContainer
      title={messages['sidebar.ecommerce.products']}
      sidebarContent={
        <ProductsSidebar
          filterData={filterData}
          setFilterData={setFilterData}
        />
      }
    >
      <ProductListing
        filterData={filterData}
        viewType={viewType}
        setViewType={setViewType}
        setFilterData={setFilterData}
      />
    </AppsContainer>
  );
};

export default Products;
