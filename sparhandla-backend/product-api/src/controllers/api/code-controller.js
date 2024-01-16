/**
 * Module for the ProductController.
 *
 * @author Shirin Meirkhan
 * @version 1.0.0
 */

import { Product } from '../../models/product.js'
import createError from 'http-errors'

/**
 * Encapsulates a controller.
 */
export class ProductsController {
  /**
   * Provide req.product to the route if :sameCode is present.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @param {string} sameCode - The value of the name for the product to load.
   */
  async loadProductSameCode (req, res, next, sameCode) {
    try {
      // Get the product.
      console.log('load product by sameCode')

      console.log(req.params.sameCode)
      const product = await Product.find({ sameCode: req.params.sameCode })
      console.log(product)

      // If no product found send a 404 (Not Found).
      if (!product || product.length < 1) {
        next(createError(404, 'The requested product was not found.'))
        return
      }
      // Provide the product to req.
      req.product = product

      // Next middleware.
      next()
    } catch (error) {
      // console.log(error)
      next(error)
    }
  }

  /**
   * Sends a JSON response containing a product.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async findSameCode (req, res, next) {
    console.log('find')
    req.product.sort(function (a, b) {
      return a.sameCode - b.sameCode
    })
    res.json(req.product)
  }
}
