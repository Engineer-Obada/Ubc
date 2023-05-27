import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import PropTypes from 'prop-types';
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import AppTableContainer from '@crema/core/AppTableContainer';

const CustomerTable = (props) => {
  const {
    CustomerData,
    handelOpenClick,
    handelOpenRejectClick,
    onDeleteCustomer,
    onUpdateStatusCustomer
  } = props;
  
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
    
          
          {CustomerData && CustomerData.map((row) => (
            <TableItem
             row={row}
             key={row.id}
             handelOpenClick={handelOpenClick}
             handelOpenRejectClick={handelOpenRejectClick}
             onDeleteCustomer={onDeleteCustomer}
             onUpdateStatusCustomer={onUpdateStatusCustomer}
            />
          ))}
        </TableBody>
      </Table>
    </AppTableContainer>
  );
};

export default CustomerTable;

CustomerTable.defaultProps = {
  CustomerData: [],
};

CustomerTable.propTypes = {
  CustomerData: PropTypes.array,
  handelOpenClick: PropTypes.func,
  handelOpenRejectClick: PropTypes.func,
  onDeleteCustomer: PropTypes.func,
  onUpdateStatusCustomer: PropTypes.func,
  
};
