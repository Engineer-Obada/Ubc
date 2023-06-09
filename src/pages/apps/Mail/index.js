import React from 'react';
import MailsList from './MailsList';
import MailDetail from './MailDetail';
import PropTypes from 'prop-types';
import AppsContainer from '@crema/core/AppsContainer';
import MailSidebar from './MailSideBar';
import {useIntl} from 'react-intl';
import {useParams} from 'react-router-dom';
import clsx from 'clsx';
import Box from '@mui/material/Box';

import {styled} from '@mui/material/styles';

const MailDetailViewWrapper = styled(Box)(({theme}) => {
  return {
    transition: 'all 0.5s ease',
    transform: 'translateX(100%)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
    opacity: 0,
    visibility: 'hidden',
    backgroundColor: theme.palette.background.paper,
    '&.show': {
      transform: 'translateX(0)',
      opacity: 1,
      visibility: 'visible',
    },
  };
});

const Mail = () => {
  const {id} = useParams();
  const {messages} = useIntl();

  return (
    <AppsContainer
      title={messages['mailApp.mail']}
      sidebarContent={<MailSidebar />}
    >
      <MailsList />
      <MailDetailViewWrapper
        className={clsx({
          show: id,
        })}
      >
        <MailDetail />
      </MailDetailViewWrapper>
    </AppsContainer>
  );
};

export default Mail;

Mail.defaultProps = {};

Mail.propTypes = {
  match: PropTypes.object,
};
