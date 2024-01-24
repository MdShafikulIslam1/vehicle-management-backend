
import express from 'express'

import { AuthRouter } from '../modules/users/route'
const rootRoute = express.Router()



const ModuleRoute = [
    {
        path: '/auth',
        routes: AuthRouter
    },
    
   
]

ModuleRoute.forEach(routes => rootRoute.use(routes.path, routes.routes))

export default rootRoute