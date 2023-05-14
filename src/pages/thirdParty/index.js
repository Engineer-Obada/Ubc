import {rechartsConfigs} from './recharts';
import React from 'react';
import GoogleMap from './googleMap';
import ReactNotificationEx from './reactNotification';

export const thirdPartyConfigs = [
  ...rechartsConfigs,
 
  {
    path: '/third-party/google-map',
    element: <GoogleMap />,
  },
  {
    path: '/third-party/react-notification',
    element: <ReactNotificationEx />,
  },
  
];
