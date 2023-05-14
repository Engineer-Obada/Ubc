import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import React, {useState} from 'react';
import IntlMessages from '@crema/utility/IntlMessages';
// import AppScrollbar from '@crema/core/AppScrollbar';
import CreateContact from '../CreateContact';
import AddIcon from '@mui/icons-material/Add';
import {Zoom} from '@mui/material';

const SideBarContent = ({reCallAPI}) => {
  const [isAddContact, onSetIsAddContact] = useState(false);

  const handleAddContactOpen = () => {
    onSetIsAddContact(true);
  };

  const handleAddContactClose = () => {
    onSetIsAddContact(false);
  };

  return (
    <>
      <Box
        sx={{
          px: {xs: 4, md: 5},
          pt: {xs: 4, md: 5},
          pb: 2.5,
        }}
      >
        <Zoom in style={{transitionDelay: '300ms'}}>
          <Button
            variant='outlined'
            color='primary'
            sx={{
              padding: '8px 28px',
              borderRadius: 8,
              '& .MuiSvgIcon-root': {
                fontSize: 26,
              },
            }}
            startIcon={<AddIcon />}
            onClick={handleAddContactOpen}
          >
            <IntlMessages id='Add a new employee' />
          </Button>
        </Zoom>
      </Box>

      {/* <AppScrollbar className='scroll-app-sidebar'> */}
        <Box
          sx={{
            pr: 4,
            pb: {xs: 4, md: 5, lg: 6.2},
          }}
        >
          <CreateContact                     ///////////////////////////////// Create contact 
            isAddContact={isAddContact}
            handleAddContactClose={handleAddContactClose}
            reCallAPI={reCallAPI}
          />
        </Box>
      {/* </AppScrollbar> */}
    </>
  );
};

export default SideBarContent;

SideBarContent.propTypes = {
  reCallAPI: PropTypes.func,
};
