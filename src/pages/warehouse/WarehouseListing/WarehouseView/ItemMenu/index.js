import React from 'react';
import IntlMessages from '@crema/utility/IntlMessages';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AppTooltip from '@crema/core/AppTooltip';
import Box from '@mui/material/Box';
import {styled} from '@mui/material/styles';
import { BiPlus } from 'react-icons/bi';

const WarehouseActionHoverWrapper = styled('div')(() => {
  return {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: -30,
    top: '50%',
    zIndex: 1,
    transform: 'translateY(-50%)',
    transition: 'all 0.4s ease',
    opacity: 0,
    visibility: 'hidden',
  };
});

const ItemMenu = (props) => {
  const {
    onSelectContactsForDelete,
    contact,
    onOpenEditContact,
  } = props;

  const onDeleteWarehouse = (e) => {
    onSelectContactsForDelete([contact.id]);
    e.stopPropagation();
  };

 

  const onClickEditOption = (e) => {
    onOpenEditContact(contact);
    e.stopPropagation();
  };

  return (
    <Box
      component='span'
      sx={{
        display: 'flex',
        alignItems: 'center',
        marginLeft: 'auto',
        position: 'relative',
      }}
    >
      
      <span className='conActionHoverHideRoot'>
        <AppTooltip title={<IntlMessages id='common.more' />}>
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
            <MoreVertIcon />
          </IconButton>
        </AppTooltip>
      </span>

      <WarehouseActionHoverWrapper className='conActionHoverRoot'>
    
       
        <IconButton
          sx={{
            color: (theme) => theme.palette.text.disabled,
            padding: 2,
            '& .MuiSvgIcon-root': {
              fontSize: 22,
            },
          }}
          // onClick={onClickEditOption}
          size='large'
        >
          <BiPlus />
        </IconButton>
        <IconButton
          sx={{
            color: (theme) => theme.palette.text.disabled,
            padding: 2,
            '& .MuiSvgIcon-root': {
              fontSize: 22,
            },
          }}
          onClick={onClickEditOption}
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
          onClick={onDeleteWarehouse}
          size='large'
        >
          <DeleteOutlinedIcon />
        </IconButton>
        
      </WarehouseActionHoverWrapper>
    </Box>
  );
};

export default ItemMenu;

ItemMenu.propTypes = {
  onSelectContactsForDelete: PropTypes.func,
  contact: PropTypes.object.isRequired,
  onOpenEditContact: PropTypes.func,
};
