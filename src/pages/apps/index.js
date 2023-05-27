import React from 'react';
import {Navigate} from 'react-router-dom';
import {RoutePermittedRole} from 'shared/constants/AppConst';
const Mail = React.lazy(() => import('./Mail'));
const ToDo = React.lazy(() => import('./ToDo'));
const ScrumBoard = React.lazy(() => import('./ScrumBoard'));

export const appsConfig = [
  {
    permittedRole: RoutePermittedRole.User,
    path: [
      '/apps/mail/label/:label',
      '/apps/mail/label/:label/:id',
      '/apps/mail/:folder',
      '/apps/mail/:folder/:id',
    ],
    element: <Mail />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: '/apps/mail',
    element: <Navigate to='/apps/mail/inbox' />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: [
      '/apps/todo/label/:label',
      '/apps/todo/label/:label/:id',
      '/apps/todo/:folder',
      '/apps/todo/:folder/:id',
    ],
    element: <ToDo />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: '/apps/todo',
    element: <Navigate to='/apps/todo/all' />,
  },
 
  {
    path: '/apps/contact',
    element: <Navigate to='/apps/contact/folder/all' />,
  },

  {
    permittedRole: RoutePermittedRole.User,
    path: ['/apps/scrum-board/:id', '/apps/scrum-board'],
    element: <ScrumBoard />,
  },
];
