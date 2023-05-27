import React from 'react';
import TableCell from '@mui/material/TableCell';
import {Box, IconButton, Switch} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import {Fonts} from 'shared/constants/AppEnums';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { CancelOutlined, LinkRounded} from '@mui/icons-material';

const TableItem = (props) => {
  const {
    row,
    handelOpenClick,
    handelOpenRejectClick,
    onDeleteCustomer,
    onUpdateStatusCustomer
  } = props;

const onDelte = (productId)=>{
  onDeleteCustomer(productId)
}

const onChangeCustomerStatus = (e) => {
  onUpdateStatusCustomer(!row.accountStatus, row);
  e.stopPropagation();
};


  return (
    <TableRow
      key={row.firstName}
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
            <Avatar src={row.image}/>
            ) : (
            <Avatar >{row.firstName[0].toUpperCase()}</Avatar>
          )}
          <Box
            component='span'
            sx={{
              ml: 3.5,
              fontWeight: Fonts.MEDIUM,
          
            }}

          >
            {row.firstName}
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
          {row.email}
        </TableCell>
      
      <TableCell
        align='left'
        sx={{
          whiteSpace: 'no-wrap',
        }}
        className='tableCell'
      >
        {row.phoneNum}
      </TableCell>
      
      <TableCell
        align='left'
        sx={{
          whiteSpace: 'no-wrap',
        }}
        className='tableCell'
      >
        {row.date}
      </TableCell>
      
      <TableCell
        align='left'
        sx={{
          whiteSpace: 'no-wrap',
        }}
        className='tableCell'
      >
        <Box  sx={{color: row.status === "Linked" ? 'green' : 'red',}}>
            {row.status}
        </Box>
      </TableCell>
      <TableCell
        align='left'
        sx={{
          whiteSpace: 'no-wrap',
        }}
        className='tableCell'
      >
          <Box  sx={{
      color: row.accountStatus === true ? 'green' : 'red',
    }}>{row.accountStatus === true ?'Acitve' : 'Not Active'} </Box>
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
          disabled={row.status === 'Linked' ? true : false} 

        >
          <LinkRounded onClick={()=>handelOpenClick(row)} />
          
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
          disabled={row.status === 'Linked' ? true : false} 
        >
          <CancelOutlined  onClick={() => handelOpenRejectClick(row)} />
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
        <Switch
      size="small"
      defaultChecked 
      onClick={onChangeCustomerStatus}

      />
       
        
      </TableCell>
    </TableRow>
  );
};

export default TableItem;

TableItem.propTypes = {
  row: PropTypes.object.isRequired,
  handelOpenClick: PropTypes.func,
  handelOpenRejectClick: PropTypes.func,
  onDeleteCustomer: PropTypes.func,
  onUpdateStatusCustomer: PropTypes.func,


}
  
