import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import PropTypes from 'prop-types';
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import AppTableContainer from '@crema/core/AppTableContainer';

const EmployeesTable = (props) => {

  const {employeesTableData,onDeleteEmployee,onOpenEditEmployee,onChangeStatus} = props;
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
          {employeesTableData.data && employeesTableData.data.map((row) => (
            <TableItem row={row} key={row.id}
            onDeleteEmployee={onDeleteEmployee} 
            onOpenEditEmployee={onOpenEditEmployee}
            onChangeStatus={onChangeStatus}
            />
          ))}
        </TableBody>
      </Table>
    </AppTableContainer>
  );
};

export default EmployeesTable;

EmployeesTable.defaultProps = {
  employeesTableData: [],
};

EmployeesTable.propTypes = {
  employeesTableData: PropTypes.array,
  onDeleteEmployee: PropTypes.func,
  onOpenEditEmployee: PropTypes.func,
  onChangeStatus: PropTypes.func

};
