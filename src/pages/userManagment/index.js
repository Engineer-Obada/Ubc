import React from 'react';
import { Navigate } from 'react-router-dom';
import { RoutePermittedRole } from 'shared/constants/AppConst';
const Customer = React.lazy(() => import('./customer/customer'));
const Employess = React.lazy(() => import('./employes/index'));
const Warehouse = React.lazy(() => import('../warehouse/index'));

export const userManagmentConfigs = [
    {
        permittedRole: RoutePermittedRole.User,
        path: ['/userManagment/employees/folder/:name', '/userManagment/employees/label/:name'],
        element:<Employess/>,
    },
    {
        path: '/userManagment/employees',
        element: <Navigate to='/userManagment/employees/folder/all' />,
      },
    {
        permittedRole: RoutePermittedRole.User,
        path:'/userManagment/customer',
        
        element:<Customer/>,
    },
     {
        permittedRole: RoutePermittedRole.User,
        path: '/dashboards/warehouse' ,
        element:<Warehouse/>,
    },

]