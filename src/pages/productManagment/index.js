import React from 'react';
import { RoutePermittedRole } from 'shared/constants/AppConst';
const Category = React.lazy(() => import('./category/index'));
const Product = React.lazy(() => import('./product/index'));

export const productManagmentConfigs = [
    {
        permittedRole: RoutePermittedRole.User,
        path: '/productManagment/category',
        element:<Category/>,
    },
    {
        permittedRole: RoutePermittedRole.User,
        path: '/productManagment/product',
        element:<Product/>,
    },
]