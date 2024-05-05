import { Home, Popular, Show, TopRated, Upcoming, } from '../pages';
import { RouteObject, createBrowserRouter } from 'react-router-dom';

import PrivateRouter from './PrivateRouter';
import PublicRouter from './PublicRouter';
import { ROUTES } from './constants';
import { element } from 'prop-types';
import { Favorites } from '../pages/Favorites';

const routes: RouteObject[] = [
    {
        path: '/', element: <PrivateRouter />,
        children: [
            { path: ROUTES.HOME, element: <Home />},
            { 
              path: ROUTES.POPULAR, 
              element: <Popular showButtonsP={true} showListTypeP={true} showListTypePF = {false} />
            },
            { path: ROUTES.TOPRATED,
              element: <TopRated showButtonsTR={true} showListTypeTR={true} showListTypeTRF = {false}/>
            },
            { path: ROUTES.UPCOMING,
              element: <Upcoming showButtonsNP={true} showListTypeNP={true} showListTypeNPF = {false}/>
            },
            { path: ROUTES.FAVORITES, element: <Favorites />},
            { path: `${ROUTES.SHOW}:id`, 
              element: <Show  />}
        ]
    },
    {
        path: '/login', element: <PublicRouter />,
        children: [
            { path: '/login', element: <div> Login </div>},
        ]
    },
];

export const router = createBrowserRouter(routes);
