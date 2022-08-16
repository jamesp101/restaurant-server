import { Router } from "express"
import orderRoute from './routes/orders.route'
import deviceRoute from './routes/device.route'
import productsRoute from './routes/products.route'

const router = Router ();

router.use ('/orders', orderRoute)
router.use ('/device', deviceRoute)
router.use ('/products', productsRoute)

export default router


