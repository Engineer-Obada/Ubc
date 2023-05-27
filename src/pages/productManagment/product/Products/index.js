import React, {useState} from 'react';
import { Box, Button, Zoom } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import ProductsTable from './ProductsTable';
import IntlMessages from '@crema/utility/IntlMessages';
import {useIntl} from 'react-intl';
import PropTypes from 'prop-types';
import {Fonts} from 'shared/constants/AppEnums';
import AppCard from '@crema/core/AppCard';
import AppSelect from '@crema/core/AppSelect';
import { postDataApi } from '@crema/utility/APIHooks';
import { useInfoViewActionsContext } from '@crema/utility/AppContextProvider/InfoViewContextProvider';
import AddNewProduct from '../AddProducts/AddNewProduct';
import AppScrollbar from '@crema/core/AppScrollbar';

const Products = (props) => {

  const {
         productsTableData,
         onCloseAddProduct,
         onOpenAddProduct,
         isAddProductOpen,
         productSlected,
         onOpenEditProduct,
         reCallAPI
        } = props;

  const api = 'api'
  const [tableData, setTableData] = useState(productsTableData);
  const infoViewActionsContext = useInfoViewActionsContext();

  const handleChange = (value) => {
    if (value === messages['dashboard.allDeals']) {
      setTableData(productsTableData);
    } else if (value === messages['todo.completed']) {
      setTableData(
        productsTableData.filter((data) => data.progress === 'Approved'),
      );
    } else {
      setTableData(
        productsTableData.filter((data) => data.progress === 'Pending'),
      );
    }
  };

  const onDeleteProduct = (productId)=>{
    const selectId = productId;
    postDataApi(`/${api}/product/delete`,infoViewActionsContext, selectId
    ).then(()=>{
      reCallAPI();
      infoViewActionsContext.showMessage('Product Deleted Successfully');
    }).catch((error) => {
      infoViewActionsContext.fetchError(error.message);
    });
  }


  const {messages} = useIntl();

  return (
    <AppScrollbar>

    <AppCard
    
      title={
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >

          <Box
            sx={{
              mr: {xs: 3, lg: 8},
              fontWeight: Fonts.BOLD,
              fontSize: 16,
            }}
            component='h3'
          >
            <IntlMessages id='Products' />
          </Box>
          <AppSelect
            menus={[
              messages['dashboard.allDeals'],
              messages['todo.completed'],
              messages['common.pending'],
            ]}
            defaultValue={messages['dashboard.allDeals']}
            onChange={handleChange}
          />
          
          <Box sx={{px: {xs: 4, md: 5}, pt: {xs: 4, md: 5}, pb: 2.5}}>
        <Zoom in style={{transitionDelay: '300ms'}}>
          <Button
            variant='outlined'
            color='primary'
            sx={{
              padding: '8px 28px',
              borderRadius: 30,
              '& .MuiSvgIcon-root': {
                fontSize: 26,
              },
            }}
            startIcon={<AddIcon />}
            onClick={onOpenAddProduct}
          >
            <IntlMessages id='Add new Product' />
          </Button>
        </Zoom>
      </Box>
      <AddNewProduct
         productSlected={productSlected}
         isAddProductOpen={isAddProductOpen}
        onCloseAddTask={onCloseAddProduct}
        reCallAPI={reCallAPI}
      />
   
        </Box>
        
      }
  
    >
      <ProductsTable
      onOpenEditProduct={onOpenEditProduct}
      productSlected={productSlected}
      onOpenAddProduct={onOpenAddProduct} 
      productsTableData={productsTableData} tableData={tableData} 
      onDeleteProduct={onDeleteProduct}
      />
    </AppCard>
    </AppScrollbar>

  );
};

export default Products;

// categoryTableData.defaultProps = {
//   categoryTableData: [],
// };

Products.propTypes = {
  productsTableData: PropTypes.array,
  reCallAPI: PropTypes.func,
  onCloseAddProduct: PropTypes.func,
  onOpenAddProduct: PropTypes.func,
  isAddProductOpen: PropTypes.bool,
  onOpenEditProduct: Products.func,
  productSlected: PropTypes.object
};
