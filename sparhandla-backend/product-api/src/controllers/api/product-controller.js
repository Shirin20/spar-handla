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
   * Provide req.product to the route if :name is present.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @param {string} name - The value of the name for the product to load.
   */
  async loadProduct (req, res, next, name) {
    try {
      // Get the product.
      console.log('load product')
      console.log(req.params)
      const reqName = req.params.name
      const regex = new RegExp(reqName, 'i')
      const product = await Product.find({ name: { $regex: regex } })
      // const product = await Product.find({ name: /req.params.name/i })
      console.log('product', product.length)

      // If no product found send a 404 (Not Found).
      if (!product || product.length < 1) {
        next(createError(404, 'The requested product was not found.'))
        return
      }
      // Provide the product to req.
      req.product = product
      // console.log('req.product', product)

      // Next middleware.
      next()
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  /**
   * Sends a JSON response containing a product code and image url.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async find (req, res, next) {
    console.log('find')
    req.product.sort(function (a, b) {
      return a.sameCode - b.sameCode
    })
    const theSameCode = this.deleteDuplicate(req.product)
    theSameCode.sort(function (a, b) {
      return a.sameCode - b.sameCode
    })

    res.json(theSameCode)
  }

  /**
   * Makes objects array of sameCode and image url after deleting duplicates.
   *
   * @param {object} productsArray - Array of products.
   * @returns {Array} result - Return an array of objects.
   */
  deleteDuplicate (productsArray) {
    const sameCodeArray = []
    for (let i = 0; i < productsArray.length; i++) {
      sameCodeArray.push({
        id: productsArray[i].id,
        sameCode: productsArray[i].sameCode,
        imageUrl: productsArray[i].imageUrl,
        name: productsArray[i].name
      })
    }
    const dataArr = sameCodeArray.map(item => {
      return [item.sameCode, item]
    }) // creates array of array
    const maparr = new Map(dataArr) // create key value pair from array of array
    const result = [...maparr.values()] // converting back to array from mapobject
    return result
  }
}
