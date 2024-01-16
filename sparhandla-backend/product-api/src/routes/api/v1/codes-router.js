/**
 * product routes.
 *
 * @author Shirin Meirkhan
 * @version 1.0.0
 */

import express from 'express'
import { ProductsController } from '../../../controllers/api/code-controller.js'

export const router = express.Router()

const controller = new ProductsController()

// Provide req.product to the route if :sameCode is present in the route path.
router.param('sameCode', (req, res, next, sameCode) => controller.loadProductSameCode(req, res, next, sameCode))

// GET products/:id
router.get('/:sameCode', (req, res, next) => controller.findSameCode(req, res, next))
