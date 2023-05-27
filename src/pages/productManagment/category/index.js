import React from 'react';
import {Grid} from '@mui/material';
import AppGridContainer from '@crema/core/AppGridContainer';
import AppInfoView from '@crema/core/AppInfoView';
import AppAnimate from '@crema/core/AppAnimate';
import {useGetDataApi} from '@crema/utility/APIHooks';
import FormCategory from './FormCategory/index';
import Category from './CategoryView';

const category = () => {
  const api = 'api'
  const [{apiData:categoryData},{reCallAPI}] = useGetDataApi(`/${api}/category`);
  return (
    <>
   
        <AppAnimate animation='transition.slideUpIn' delay={200}>
          <AppGridContainer>
           
            <Grid item xs={12} md={8}>
              <Category categoryTableData={categoryData} reCallAPI={reCallAPI}/>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormCategory reCallAPI={reCallAPI} />
            </Grid>

  
          </AppGridContainer>
        </AppAnimate>


      <AppInfoView />
    </>
  );
};

export default category;
