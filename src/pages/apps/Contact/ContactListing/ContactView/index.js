import ContactListItem from './ContactListItem';
import Box from '@mui/material/Box';
import ContactGridItem from './ContactGridItem';
import React from 'react';
import PropTypes from 'prop-types';
import AppList from '@crema/core/AppList';
import AppGrid from '@crema/core/AppGrid';
import ListEmptyResult from '@crema/core/AppList/ListEmptyResult';
import IntlMessages from '@crema/utility/IntlMessages';
import ContactListSkeleton from '@crema/core/AppSkeleton/ContactListSkeleton';
import {Hidden} from '@mui/material';
import ContactListItemMobile from './ContactListItem/ContactListItemMobile';
import {useGetDataApi} from '@crema/utility/APIHooks';

const ContactView = (props) => { // ContactView //
  const {
    list,
    pageView,
    loading,
    handleAddContactOpen,
    onChangeStarred,
    onChangeCheckedContacts,
    checkedContacts,
    onSelectContactsForDelete,
    onOpenEditContact,
    onViewContactDetail,
  } = props;
  const [{apiData: labelList}] = useGetDataApi(
    '/api/contactApp/labels/list',
    [],
  );

  return (
    <>
      {pageView === 'list' ? (
        <>
          <Hidden smDown>
            <AppList
              data={list} // view data table // list from props
              animation='transition.slideUpIn'
              sx={{
                pt: 0,
                pb: 0,
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
              }}
              ListEmptyComponent={ // اذا انمسح كلشي عناصر بالجدول  بيطلع هاد الكومبونينت
                <ListEmptyResult
                  loading={loading}
                  actionTitle={<IntlMessages id='contactApp.createContact' />}
                  onClick={handleAddContactOpen}
                  placeholder={<ContactListSkeleton />}
                />
              } 
              renderRow={(contact) => (
                <ContactListItem                ///////// view list item
                  key={contact.id}
                  contact={contact}
                  labelList={labelList} /// From useGetDataApi line 8 
                  onChangeCheckedContacts={onChangeCheckedContacts}
                  checkedContacts={checkedContacts}
                  onSelectContactsForDelete={onSelectContactsForDelete}
                  onChangeStarred={onChangeStarred}
                  onViewContactDetail={onViewContactDetail}
                  onOpenEditContact={onOpenEditContact}
                />
              )}
            />
          </Hidden>

          <Hidden smUp>
            <AppList
              data={list} // from Props 
              animation='transition.slideUpIn'
              sx={{
                pt: 0,
                pb: 0,
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
              }}
              ListEmptyComponent={
                <ListEmptyResult
                  loading={loading}
                  actionTitle={<IntlMessages id='contactApp.createContact' />}
                  onClick={handleAddContactOpen}
                  placeholder={<ContactListSkeleton />}
                />
              }
              renderRow={(contact) => (
                <ContactListItemMobile
                  key={contact.id}
                  contact={contact}
                  checkedContacts={checkedContacts}
                  labelList={labelList}
                  onChangeStarred={onChangeStarred}
                  onViewContactDetail={onViewContactDetail}
                  onOpenEditContact={onOpenEditContact}
                />
              )}
            />
          </Hidden>
        </>
      ) : (
        <Box
          sx={{
            px: 5,
            pt: 0.5,
            pb: 3,
          }}
        >
          <AppGrid         ////////////////////// view Grid Item
            responsive={{
              xs: 1,
              sm: 2,
              md: 3,
              lg: 2,
              xl: 3,
            }}
            data={list}
            renderRow={(contact) => ( 
              <ContactGridItem
                key={contact.id}
                contact={contact}
                labelList={labelList}
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
      )}
    </>
  );
};

export default ContactView;

ContactView.defaultProps = {
  list: [],
  checkedContacts: [],
};

ContactView.propTypes = {
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
