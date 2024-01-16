/**
 * product routes.
 *
 * @author Shirin Meirkhan
 * @version 1.0.0
 */

import express from 'express'
import { ProductsController } from '../../../controllers/api/product-controller.js'

export const router = express.Router()

const controller = new ProductsController()

// Provide req.product to the route if :name is present in the route path.
router.param('name', (req, res, next, name) => controller.loadProduct(req, res, next, name))

// GET products/:id
router.get('/:name', (req, res, next) => controller.find(req, res, next))
