import React from 'react';
import TableCell from '@mui/material/TableCell';
import {Box, IconButton, Switch} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import {Fonts} from 'shared/constants/AppEnums';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const TableItem = (props) => {
  const {row,onDeleteProduct,onOpenEditProduct} = props;
const onDelte = (productId)=>{
  onDeleteProduct(productId)
}

const onClickEditOption = (e)=>{
  onOpenEditProduct(row);
  e.stopPropagation();
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
          {row.image ? (
            <Avatar>{row.name[0].toUpperCase()}</Avatar>
            ) : (
            <Avatar src={row.image} />
          )}
          <Box
            component='span'
            sx={{
              ml: 3.5,
              fontWeight: Fonts.MEDIUM,
          
            }}

          >
            {row.name}
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
        {row.categorytId}
      </TableCell>
      
      <TableCell
        align='left'
        sx={{
          whiteSpace: 'no-wrap',
        }}
        className='tableCell'
      >
        {row.weight}
      </TableCell>
      
      <TableCell
        align='left'
        sx={{
          whiteSpace: 'no-wrap',
        }}
        className='tableCell'
      >
        {row.price}
      </TableCell>
      
      <TableCell
        align='left'
        sx={{
          whiteSpace: 'no-wrap',
        }}
        className='tableCell'
      >
        {row.available}
      </TableCell>
      <TableCell
        align='left'
        sx={{
          whiteSpace: 'no-wrap',
        }}
        className='tableCell'>
          <Switch
        size="small"
        defaultChecked 
        />
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
          <EditOutlinedIcon onClick={onClickEditOption} />
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
  onDeleteProduct: PropTypes.func,
  onOpenEditProduct: PropTypes.func


}
  
