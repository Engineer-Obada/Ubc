import React from 'react';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {Fonts} from 'shared/constants/AppEnums';
import ItemMenu from '../ItemMenu';
import {blue} from '@mui/material/colors';

import {styled} from '@mui/material/styles';
import {alpha} from '@mui/material';

const ContactListItemWrapper = styled(ListItem)(({theme}) => {
  return {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 14,
    borderBottom: `1px solid ${theme.palette.divider}`,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10,
    cursor: 'pointer',
    overflow: 'hidden',
    '&.rootCheck': {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      boxShadow: `0 3px 5px 0 ${alpha(theme.palette.common.black, 0.08)}`,
    },
    '& .conActionHoverHideRoot': {
      transition: 'all 0.4s ease',
    },
    '&:hover': {
      '& .conActionHoverRoot': {
        opacity: 1,
        visibility: 'visible',
        right: 0,
      },
      '& .conActionHoverHideRoot': {
        opacity: 0,
        visibility: 'hidden',
      },
      '& .contactViewInfo': {
        [theme.breakpoints.up('sm')]: {
          width: 'calc(100% - 114px)',
        },
      },
    },
  };
});

const ContactListItem = ({
  contact,
  labelList,
  onChangeCheckedContacts,
  checkedContacts,
  onChangeStarred,
  onSelectContactsForDelete,
  onViewContactDetail,
  onOpenEditContact,
}) => {
  const onGetLabelColor = (labelId) => {
    if (labelId) {
      return (
        labelList.length > 0 &&
        labelList.find((label) => label.id === labelId).color
      );
    }
  };

  return (
    <>
    {/* {console.log("contactt",contact)} */}
      <ContactListItemWrapper
        dense
        button
        key={contact.id}
        className={clsx('item-hover', {
          rootCheck: checkedContacts.includes(contact.id),
        })}
        onClick={() => onViewContactDetail(contact)}
      >
        <Box ////////////// for select
          sx={{
            width: {xs: '75%', sm: '80%', md: '50%'},
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span onClick={(event) => event.stopPropagation()}>
            <Checkbox
              sx={{
                color: (theme) => theme.palette.text.disabled,
              }}
              checked={checkedContacts.includes(contact.id)}
              onChange={(event) => onChangeCheckedContacts(event, contact.id)}
              color='primary'
            />
          </span>
          <Box     /////// for image
            sx={{
              mr: 3,
            }}
            component='span'
          >
            {contact.image ? (
              <Avatar
                sx={{
                  backgroundColor: blue[500],
                  width: 36,
                  height: 36,
                }}
                src={contact.image}
              />
            ) : (
              <Avatar
                sx={{
                  backgroundColor: blue[500],
                  width: 36,
                  height: 36,
                }}
              >
                {contact.name[0].toUpperCase()}
              </Avatar>
            )}
          </Box>
          <Box                      ////// for firstName
            component='span'
            sx={{
              mr: 4,
              fontWeight: Fonts.MEDIUM,
              flex: 1,
              whiteSpace: 'nowrap',
            }}
          >
            {contact.firstName}
          </Box>
          <Box                      ////// for Acctivate
            component='span'
            sx={{
              mr: 4,
              fontWeight: Fonts.MEDIUM,
              flex: 1,
              whiteSpace: 'nowrap',
            }}
          >
            {contact.accountStatus.toString()}
          </Box>
          <Box                          ////// for lastName
            component='span'
            sx={{
              mr: 4,
              fontWeight: Fonts.MEDIUM,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            {contact.lastName}
          </Box>
          <Box                                ////// for middleName
            component='span'
            sx={{
              mr: 4,
              fontWeight: Fonts.MEDIUM,
              flex: 1,
              whiteSpace: 'nowrap',
            }}
          >
            {contact.middleName}
          </Box>

          <Box                                /////// for Email
            component='span'
            sx={{
              mr: 4,
              flex: 1,
              display: {xs: 'none', sm: 'block'},
              whiteSpace: 'nowrap',
            }}
          >
            {contact.email ? contact.email : null}
          </Box>
        </Box>

        <Box 
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            width: {xs: '25%', sm: '20%', md: '50%'},
          }}
        >
          <Box
            sx={{
              transition: 'all 0.4s ease',
              display: 'flex',
              alignItems: 'center',
              width: {sm: 'calc(100% - 70px)'},
            }}
            className='contactViewInfo'
          >
            <Box                                  // Phone
              component='span'
              sx={{
                mr: 4,
                flex: 1,
                display: {xs: 'none', md: 'block'},
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
            >
              {contact.phoneNum}
            </Box>
            <Box                                            // Role
              component='span'
              sx={{
                flex: 1,
                display: {xs: 'none', md: 'block'},
                whiteSpace: 'nowrap',
              }}
            >
              {contact.role}
            </Box>
    
          </Box>

          <Box
            component='span'
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: 'auto',
            }}
          >
            <span className='conActionHoverHideRoot'>
              <LabelOutlinedIcon
                sx={{
                  ml: 2,
                  color: onGetLabelColor(contact.label),
                }}
              />
            </span>

            <ItemMenu
              contact={contact}
              onChangeStarred={onChangeStarred}
              onOpenEditContact={onOpenEditContact}
              onSelectContactsForDelete={onSelectContactsForDelete}
            />
          </Box>
        </Box>
      </ContactListItemWrapper>
    </>
  );
};

export default ContactListItem;

ContactListItem.defaultProps = {
  labelList: [],
  checkedContacts: [],
};

ContactListItem.propTypes = {
  contact: PropTypes.object.isRequired,
  labelList: PropTypes.array,
  onChangeCheckedContacts: PropTypes.func,
  checkedContacts: PropTypes.array,
  onChangeStarred: PropTypes.func,
  onSelectContactsForDelete: PropTypes.func,
  onViewContactDetail: PropTypes.func,
  onOpenEditContact: PropTypes.func,
};
