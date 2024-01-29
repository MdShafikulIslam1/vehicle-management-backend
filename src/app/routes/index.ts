
import express from 'express'

import { AuthRouter } from '../modules/users/route'
import {MaintenanceRouter} from '../modules/maintenance/route'
const rootRoute = express.Router()



const ModuleRoute = [
    {
        path: '/auth',
        routes: AuthRouter
    },
    {
        path: '/maintenance',
        routes: MaintenanceRouter
    },
    
   
]

ModuleRoute.forEach(routes => rootRoute.use(routes.path, routes.routes))

export default rootRoute