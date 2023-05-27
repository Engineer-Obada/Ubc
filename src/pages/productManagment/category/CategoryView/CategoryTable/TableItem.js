import React from 'react';
import TableCell from '@mui/material/TableCell';
import {Box, IconButton} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import {Fonts} from 'shared/constants/AppEnums';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const TableItem = (props) => {
  const {row,onDeleteCategory} = props;
const onDelte = (categoryId)=>{
  onDeleteCategory(categoryId)
}
  return (
    <TableRow
      key={row.name}
      sx={{
        borderBottom: '0 none',
        '& .tableCell': {
          borderBottom: '0 none',
          fontSize: 13,
          padding: 2,

          '&:first-of-type': {
            pl: 5,

          },
          '&:last-of-type': {
            pr: 5,
          },
        },
      }}
      className='item-hover'
    >
      <TableCell scope='row' className='tableCell'>
        {row.id}.
      </TableCell>
      <TableCell
        align='left'
        sx={{
          whiteSpace: 'no-wrap',
        }}
        className='tableCell'
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {row.logo ? (
            <Avatar src={row.logo} />
          ) : (
            <Avatar>{row.nameCategory[0].toUpperCase()}</Avatar>
          )}
          <Box
            component='span'
            sx={{
              ml: 3.5,
              fontWeight: Fonts.MEDIUM,
            }}
          >
            {row.nameCategory}
          </Box>
        </Box>
      </TableCell>
    
      
      <TableCell
        align='left'
        sx={{
          whiteSpace: 'no-wrap',
        }}
        className='tableCell'
      >
        {row.created}
      </TableCell>
      <TableCell
        align='left'
        sx={{
          whiteSpace: 'no-wrap',
        }}
        className='tableCell'>
        <IconButton
          sx={{
            color: (theme) => theme.palette.text.disabled,
            padding: 2,
            '& .MuiSvgIcon-root': {
              fontSize: 22,
            },
          }}
          size='large'
        >
          <EditOutlinedIcon />
        </IconButton>
        <IconButton
          sx={{
            color: (theme) => theme.palette.text.disabled,
            padding: 2,
            '& .MuiSvgIcon-root': {
              fontSize: 22,
            },
          }}
          size='large'
        >
          <DeleteOutlinedIcon 
          onClick={()=>onDelte(row.id)}
           />
        </IconButton>
        
      </TableCell>
    </TableRow>
  );
};

export default TableItem;

TableItem.propTypes = {
  row: PropTypes.object.isRequired,
  onDeleteCategory: PropTypes.func}
  
