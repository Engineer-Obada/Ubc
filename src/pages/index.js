import React from 'react';
import {Navigate} from 'react-router-dom';
import {initialUrl} from 'shared/constants/AppConst';

import {authRouteConfig} from './auth';
import Error403 from './errorPages/Error403';
import {errorPagesConfigs} from './errorPages';
import {dashBoardConfigs} from './dashboards';
import {userManagmentConfigs} from './userManagment'
import {extraPagesConfigs} from './extraPages';
import {ecommerceConfig} from './ecommerce';
import {userListConfig} from './userList';
import {userPagesConfig} from './userPages';
import {thirdPartyConfigs} from './thirdParty';
import {appsConfig} from './apps';
import {accountPagesConfigs} from './account';
import { productManagmentConfigs } from './productManagment';

const authorizedStructure = {
  fallbackPath: '/signin',
  unAuthorizedComponent: <Error403 />,
  routes: [
    ...dashBoardConfigs,
    ...accountPagesConfigs,
    ...appsConfig,
    ...thirdPartyConfigs,
    ...extraPagesConfigs,
    ...ecommerceConfig,
    ...userPagesConfig,
    ...userListConfig,
    ...userManagmentConfigs,
    ...productManagmentConfigs  ,
  ],
};

const unAuthorizedStructure = {
  fallbackPath: initialUrl,
  routes: authRouteConfig,
};
const anonymousStructure = {
  routes: errorPagesConfigs.concat([
    {
      path: '/',
      element: <Navigate to={initialUrl} />,
    },
    {
      path: '*',
      element: <Navigate to='/error-pages/error-404' />,
    },
  ]),
};

export {authorizedStructure, unAuthorizedStructure, anonymousStructure};
