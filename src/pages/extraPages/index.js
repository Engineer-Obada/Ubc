import React from 'react';
import {RoutePermittedRole} from 'shared/constants/AppConst';

const ContactUs = React.lazy(() => import('./ContactUs'));

export const extraPagesConfigs = [

  {
    permittedRole: RoutePermittedRole.User,
    path: '/extra-pages/contact-us',
    element: <ContactUs />,
  },
];
