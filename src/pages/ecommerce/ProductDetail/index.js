import React, {useEffect} from 'react';
import ProductImageSlide from './ProductImageSlide';
import AppCard from '@crema/core/AppCard';
import Header from './Header';
import ProductView from './ProductView/index';
import AppGridContainer from '@crema/core/AppGridContainer';
import SimilarProduct from './SimilarProduct';

import AppAnimate from '@crema/core/AppAnimate';
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';
import AppInfoView from '@crema/core/AppInfoView';
import {useGetDataApi} from '@crema/utility/APIHooks';

const ProductDetail = () => {
  const {id} = useParams();
  const [{apiData: currentProduct}, {setQueryParams}] =
    useGetDataApi('/api/ecommerce/get');

  useEffect(() => {
    setQueryParams({id: id});
  }, [id]);

  return (
    <>
      {currentProduct ? (
        <AppAnimate animation='transition.slideUpIn' delay={200}>
          <AppCard>
            <Header product={currentProduct} />
            <AppGridContainer>
              <ProductImageSlide product={currentProduct} />
              <ProductView product={currentProduct} />
            </AppGridContainer>
            <SimilarProduct />
          </AppCard>
        </AppAnimate>
      ) : null}
      <AppInfoView />
    </>
  );
};

export default ProductDetail;

ProductDetail.propTypes = {
  match: PropTypes.object,
};
