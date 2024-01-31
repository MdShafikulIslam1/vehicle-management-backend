import express from 'express';

import { AuthRouter } from '../modules/users/route';
import { MaintenanceRouter } from '../modules/maintenance/route';
import { DriverRoutes } from '../modules/driver/driver.routes';
const rootRoute = express.Router();

const ModuleRoute = [
  {
    path: '/auth',
    routes: AuthRouter,
  },
  {
    path: '/maintenance',
    routes: MaintenanceRouter,
  },
  {
    path: '/driver',
    routes: DriverRoutes,
  },
];

ModuleRoute.forEach(routes => rootRoute.use(routes.path, routes.routes));

export default rootRoute;
