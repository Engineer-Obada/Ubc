import React from 'react';
import {Box, Grid} from '@mui/material';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import CartTable from './CartTable';
import AppCard from '@crema/core/AppCard';
import IntlMessages from '@crema/utility/IntlMessages';
import {Fonts} from 'shared/constants/AppEnums';
import OrderSummary from '../OrderSummary';
import AppAnimate from '@crema/core/AppAnimate';
import AppGridContainer from '@crema/core/AppGridContainer';
import {useGetDataApi} from '@crema/utility/APIHooks';

const Carts = () => {
  const navigate = useNavigate();
  const [{apiData}, {setData}] = useGetDataApi('/api/cart/get', [], {});

  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      <Box>
        <Box
          component='h2'
          sx={{
            color: 'text.primary',
            fontWeight: Fonts.BOLD,
            mb: 6,
            fontSize: 16,
          }}
        >
          <IntlMessages id='sidebar.ecommerce.cart' />
        </Box>
        <AppGridContainer>
          <Grid item xs={12} md={8}>
            <AppCard
              contentStyle={{px: 0}}
              footer={
                <Box
                  sx={{
                    mt: 4,
                    width: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={() => {
                      navigate('/ecommerce/products');
                    }}
                  >
                    Continue Shopping
                  </Button>
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={() => {
                      navigate('/ecommerce/checkout');
                    }}
                  >
                    Checkout
                  </Button>
                </Box>
              }
            >
              <CartTable cartItems={apiData} setTableData={setData} />
            </AppCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <OrderSummary cartItems={apiData} />
          </Grid>
        </AppGridContainer>
      </Box>
    </AppAnimate>
  );
};

export default Carts;
