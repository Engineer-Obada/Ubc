import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import PropTypes from 'prop-types';
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import AppTableContainer from '@crema/core/AppTableContainer';

const CategoryTable = (props) => {
  const {categoryTableData,onDeleteCategory} = props;
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
          {categoryTableData.map((row) => (
            <TableItem row={row} key={row.id}
            onDeleteCategory={onDeleteCategory} 
            />
          ))}
        </TableBody>
      </Table>
    </AppTableContainer>
  );
};

export default CategoryTable;

CategoryTable.defaultProps = {
  categoryTableData: [],
};

CategoryTable.propTypes = {
  categoryTableData: PropTypes.array,
  onDeleteCategory: PropTypes.func,

};
