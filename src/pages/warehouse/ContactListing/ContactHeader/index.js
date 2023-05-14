import React, { useState } from 'react';
import Box from '@mui/material/Box';
import AppSearchBar from '@crema/core/AppSearchBar';
import {Button, Hidden, Zoom} from '@mui/material';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';
import CheckBox from './CheckBox';
import ContactCheckedActions from './ContactCheckedActions';
import ViewSelectButtons from './ViewSelectButtons';
import AppsPagination from '@crema/core/AppsPagination';
import AddIcon from '@mui/icons-material/Add';
import IntlMessages from '@crema/utility/IntlMessages';

import CreateContact from '../../CreateContact';
import { useGetDataApi } from '@crema/utility/APIHooks';

const ContactHeader = (props) => {
  const {
    checkedContacts,
    setCheckedContacts,
    filterText,
    onSetFilterText,
    apiData,
    onUpdateContacts,
    onChangePageView,
    onSelectContactsForDelete,
    page,
    onPageChange,
    pageView,
    reCallAPI
  } = props;

  const {messages} = useIntl();
  // const [{reCallAPI}] =
  // useGetDataApi('/api/warehouse/list', {}, {}, false);
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
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <CheckBox
          contactList={apiData?.data || []}
          checkedContacts={checkedContacts}
          setCheckedContacts={setCheckedContacts}
        />

        <AppSearchBar
          iconPosition='right'
          overlap={false}
          value={filterText}
          onChange={(event) => onSetFilterText(event.target.value)}
          placeholder={messages['common.searchHere']}
        />
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
            <IntlMessages id='Create A New Warhouse' />
          </Button>
        </Zoom>
      </Box>
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
        {checkedContacts.length > 0 ? (
          <ContactCheckedActions
            onSelectContactsForDelete={onSelectContactsForDelete}
            checkedContacts={checkedContacts}
            setCheckedContacts={setCheckedContacts}
            onUpdateContacts={onUpdateContacts}
          />
        ) : null}
        

        <ViewSelectButtons
          pageView={pageView}
          onChangePageView={onChangePageView}
        />
      </Box>
      <Hidden smDown>
        {apiData?.data?.length > 0 ? (
          <AppsPagination
            sx={{ml: 2}}
            count={apiData?.count}
            page={page}
            onPageChange={onPageChange}
          />
        ) : null}
      </Hidden>
    </>
  );
};

export default ContactHeader;

ContactHeader.defaultProps = {
  checkedContacts: [],
  filterText: '',
  page: 0,
};

ContactHeader.propTypes = {
  checkedContacts: PropTypes.array,
  setCheckedContacts: PropTypes.func,
  filterText: PropTypes.string,
  onSetFilterText: PropTypes.func,
  apiData: PropTypes.object,
  onUpdateContacts: PropTypes.func,
  onSelectContactsForDelete: PropTypes.func,
  page: PropTypes.number,
  onPageChange: PropTypes.func,
  pageView: PropTypes.string.isRequired,
  onChangePageView: PropTypes.func,
};
