import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import PropTypes from 'prop-types';
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import AppTableContainer from '@crema/core/AppTableContainer';

const ProductsTable = (props) => {
  const {productsTableData,onDeleteProduct,onOpenEditProduct} = props;
  return (

    <AppTableContainer>
      <Table className='table'>
        <TableHead
          sx={{
            borderBottom: '0 none',
          }}
        >
          <TableHeading />
        </TableHead>
        <TableBody
          sx={{
            borderBottom: '0 none',
          }}
        >
          {productsTableData.data && productsTableData.data.map((row) => (
            <TableItem row={row} key={row.id}
            onDeleteProduct={onDeleteProduct} 
            onOpenEditProduct={onOpenEditProduct}
            />
          ))}
        </TableBody>
      </Table>
    </AppTableContainer>
  );
};

export default ProductsTable;

ProductsTable.defaultProps = {
  productsTableData: [],
};

ProductsTable.propTypes = {
  productsTableData: PropTypes.array,
  onDeleteProduct: PropTypes.func,
  onOpenEditProduct: PropTypes.func

};
