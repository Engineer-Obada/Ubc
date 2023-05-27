import React from 'react';
import TableCell from '@mui/material/TableCell';
import IntlMessages from '@crema/utility/IntlMessages';
import TableRow from '@mui/material/TableRow';
import {grey} from '@mui/material/colors';
import {Fonts} from 'shared/constants/AppEnums';

const TableHeading = () => {
  return (
    <TableRow
      sx={{
        borderBottom: '0 none',
        color: grey[500],
        '& .tableCell': {
          borderBottom: '0 none',
          fontSize: 13,
          padding: 2,
          fontWeight: Fonts.BOLD,
          '&:first-of-type': {
            pl: 5,
          },
          '&:last-of-type': {
            pr: 5,
          },
        },
      }}
    >
      <TableCell className='tableCell'>
        <IntlMessages id='common.num' />
      </TableCell>
      <TableCell align='left' className='tableCell'>
        <IntlMessages id='common.name' />
      </TableCell>
      <TableCell align='left' className='tableCell'>
        <IntlMessages id='Email' />
      </TableCell>
      <TableCell align='left' className='tableCell'>
        <IntlMessages id='Phone' />
      </TableCell>
   
      <TableCell align='left' className='tableCell'>
        <IntlMessages id='Created At' />
      </TableCell>
      <TableCell align='left' className='tableCell'>
        <IntlMessages id='Customer Status' />
      </TableCell>
      <TableCell align='left' className='tableCell'>
        <IntlMessages id='Account Status' />
      </TableCell>
      <TableCell align='left' className='tableCell'>
        <IntlMessages id='Action' />
      </TableCell>
    </TableRow>
  );
};

export default TableHeading;
