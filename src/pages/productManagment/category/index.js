import React from 'react';
import {Grid} from '@mui/material';
import Deals from './Deals';
import AppGridContainer from '@crema/core/AppGridContainer';
import AppInfoView from '@crema/core/AppInfoView';
import AppAnimate from '@crema/core/AppAnimate';
import {useGetDataApi} from '@crema/utility/APIHooks';
import FormCategory from './FormCategory/index';

const category = () => {
  const [{apiData: categoryData},{reCallAPI}] = useGetDataApi('/api/category');
  return (
    <>
      {categoryData ? (
        <AppAnimate animation='transition.slideUpIn' delay={200}>
          <AppGridContainer>
           
            <Grid item xs={12} md={8}>
              <Deals categoryTableData={categoryData} />
            </Grid>

            <Grid item xs={12} md={4}>
              <FormCategory reCallAPI={reCallAPI} />
            </Grid>

  
          </AppGridContainer>
        </AppAnimate>
      ) : null}

      <AppInfoView />
    </>
  );
};

export default category;
