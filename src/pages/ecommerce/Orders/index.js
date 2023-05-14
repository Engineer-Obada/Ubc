import React, {useEffect, useState} from 'react';
import OrderTable from './OrderTable';
import AppsContainer from '@crema/core/AppsContainer';
import {useIntl} from 'react-intl';
import {Button, Hidden} from '@mui/material';
import AppsHeader from '@crema/core/AppsContainer/AppsHeader';
import AppsContent from '@crema/core/AppsContainer/AppsContent';
import AppsPagination from '@crema/core/AppsPagination';
import Box from '@mui/material/Box';
import AppInfoView from '@crema/core/AppInfoView';
import AppSearchBar from '@crema/core/AppSearchBar';
import {useGetDataApi} from '@crema/utility/APIHooks';

const Orders = () => {
  const {messages} = useIntl();
  const [{apiData}, {setQueryParams}] = useGetDataApi(
    '/api/ecommerce/orders',
    {},
    {},
    false,
  );
  const [page, setPage] = useState(0);
  const [search, setSearchQuery] = useState('');

  const onPageChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    setQueryParams({search, page});
  }, [search, page]);

  const onSearchOrder = (value) => {
    setSearchQuery(value);
    setPage(0);
  };
  return (
    <>
      <AppsContainer title={messages['eCommerce.recentOrders']} fullView>
        <AppsHeader>
          <Box
            display='flex'
            flexDirection='row'
            alignItems='center'
            width={1}
            justifyContent='space-between'
          >
            <AppSearchBar
              iconPosition='right'
              overlap={false}
              onChange={(event) => onSearchOrder(event.target.value)}
              placeholder={messages['common.searchHere']}
            />
            <Box display='flex' flexDirection='row' alignItems='center'>
              <Button variant='contained' color='primary'>
                Add Order
              </Button>

              <Hidden smDown>
                <AppsPagination
                  rowsPerPage={10}
                  count={apiData?.count}
                  page={page}
                  onPageChange={onPageChange}
                />
              </Hidden>
            </Box>
          </Box>
        </AppsHeader>

        <AppsContent
          sx={{
            paddingTop: 2.5,
            paddingBottom: 2.5,
          }}
        >
          <OrderTable orderData={apiData?.data || []} />
        </AppsContent>

        <Hidden smUp>
          <AppsPagination
            rowsPerPage={10}
            count={apiData?.count}
            page={page}
            onPageChange={onPageChange}
          />
        </Hidden>
      </AppsContainer>
      <AppInfoView />
    </>
  );
};

export default Orders;
