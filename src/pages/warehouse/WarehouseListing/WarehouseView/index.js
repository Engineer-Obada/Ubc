import Box from '@mui/material/Box';
import WarehouseGridItem from './WarehouseGridItem';
import React from 'react';
import PropTypes from 'prop-types';
import AppGrid from '@crema/core/AppGrid';

const WarehouseView = (props) => {
  const {
    list,
    onChangeStarred,
    onChangeCheckedContacts,
    checkedContacts,
    onSelectContactsForDelete,
    onOpenEditContact,
    onViewContactDetail,
  } = props;


  return (
    <>
        <Box
          sx={{
            px: 5,
            pt: 0.5,
            pb: 3,
          }}
        >
          <AppGrid
            responsive={{
              xs: 1,
              sm: 2,
              md: 3,
              lg: 2,
              xl: 3,
            }}
            data={list}
            renderRow={(contact) => (
              <WarehouseGridItem
                key={contact.id}
                contact={contact}
                onChangeCheckedContacts={onChangeCheckedContacts}
                checkedContacts={checkedContacts}
                onChangeStarred={onChangeStarred}
                onSelectContactsForDelete={onSelectContactsForDelete}
                onViewContactDetail={onViewContactDetail}
                onOpenEditContact={onOpenEditContact}
              />
            )}
          />
        </Box>
    </>
  );
};

export default WarehouseView;

WarehouseView.defaultProps = {
  list: [],
  checkedContacts: [],
};

WarehouseView.propTypes = {
  list: PropTypes.array,
  pageView: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  handleAddContactOpen: PropTypes.func,
  checkedContacts: PropTypes.array,
  onChangeCheckedContacts: PropTypes.func,
  onChangeStarred: PropTypes.func,
  onSelectContactsForDelete: PropTypes.func,
  onOpenEditContact: PropTypes.func,
  onViewContactDetail: PropTypes.func,
};
