import React from 'react';
import { RoutePermittedRole } from 'shared/constants/AppConst';
const Customer = React.lazy(() => import('./customer/customer'));
const Employess = React.lazy(() => import('./employees/index'));
const Warehouse = React.lazy(() => import('../warehouse/index'));

export const userManagmentConfigs = [
    {
        permittedRole: RoutePermittedRole.User,
        path: ['/userManagment/employees'],
        element:<Employess/>,
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