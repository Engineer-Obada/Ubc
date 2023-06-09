import React, {useEffect, useState} from 'react';
import AppSidebar from './AppSidebar';
import AppThemeSetting from '../../AppThemeSetting';
import AppHeader from './AppHeader';
import clsx from 'clsx';
import Hidden from '@mui/material/Hidden';
import Box from '@mui/material/Box';
import BitBucketWrapper from './BitBucketWrapper';
import {LayoutType} from 'shared/constants/AppEnums';
import {useLayoutContext} from '../../../utility/AppContextProvider/LayoutContextProvider';
import BitBucketContainer from './BitBucketContainer';
import AppContentView from '../../AppContentView';
import {useLocation} from 'react-router-dom';

const BitBucket = () => {
  const {pathname} = useLocation();
  const [isCollapsed, setCollapsed] = useState(false);
  const [isNavCollapsed, setNavCollapsed] = useState(false);
  const {layoutType} = useLayoutContext();

  const toggleNavCollapsed = () => {
    setNavCollapsed(!isNavCollapsed);
  };
  useEffect(() => {
    if (isNavCollapsed) setNavCollapsed(!isNavCollapsed);
  }, [pathname]);

  return (
    <BitBucketContainer
      className={clsx({
        boxedLayout: layoutType === LayoutType.BOXED,
        framedLayout: layoutType === LayoutType.FRAMED,
      })}
    >
      <BitBucketWrapper
        className={clsx('bitBucketWrapper', {
          bitBucketCollapsed: isCollapsed,
        })}
      >
        <Hidden lgUp>
          <AppHeader toggleNavCollapsed={toggleNavCollapsed} />
        </Hidden>
        <AppSidebar
          isCollapsed={isCollapsed}
          setCollapsed={setCollapsed}
          isNavCollapsed={isNavCollapsed}
          toggleNavCollapsed={toggleNavCollapsed}
        />
        <Box className='mainContent'>
          <AppContentView />
        </Box>
        <AppThemeSetting />
      </BitBucketWrapper>
    </BitBucketContainer>
  );
};

export default BitBucket;
