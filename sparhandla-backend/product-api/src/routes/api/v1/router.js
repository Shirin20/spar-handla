/**
 * API version 1 routes.
 *
 * @author Shirin Meirkhan
 * @version 1.0.0
 */

import express from 'express'
import { router as productsRouter } from './products-router.js'
import { router as codesRouter } from './codes-router.js'

export const router = express.Router()

router.get('/', (req, res) => res.json({ message: 'Hooray! Welcome to version 1 of this product API!' }))

router.use('/product', productsRouter)
router.use('/code', codesRouter)
