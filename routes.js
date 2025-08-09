import { Router } from 'express'
import productsRouter from './src/products/routes.js'
import usersRouter from './src/users/routes.js'
import rolesRouter from './src/roles/routes.js'
import permissionsRouter from './src/permissions/routes.js'
import companiesRouter from './src/companies/routes.js'
import contactsRouter from './src/contacts/routes.js'
import salesRouter from './src/sales/routes.js'
import loginRouter from './src/login/routes.js'
import dashboardRouter from './src/dashboard/routes.js'
import tablesRouter from './src/tables/routes.js'

const router = Router()

router.use('/login', loginRouter)
router.use('/products', productsRouter)
router.use('/users', usersRouter)
router.use('/roles', rolesRouter)
router.use('/permissions', permissionsRouter)
router.use('/companies', companiesRouter)
router.use('/contacts', contactsRouter)
router.use('/tables', tablesRouter)
router.use('/sales', salesRouter)
router.use('/dashboard', dashboardRouter)

export default router
