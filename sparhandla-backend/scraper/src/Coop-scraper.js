/**
 * Module for CoopScraper.
 *
 * This module extends the functionality of WillysScraper to specifically scrape data from the Coop website.
 * It fetches product information including pricing, promotions, and product identifiers.
 *
 * @module CoopScraper
 * @augments WillysScraper
 * @author Shirin Meirkhan
 * @version 1.0.0
 */

import { Product } from './models/product.js'
import { WillysScraper } from './Willys-scraper.js'
import fetch from 'node-fetch'

/**
 * Fetches and returns sameCode for products in a given category from Coop.
 *
 * @async
 * @param {number} categoryValue - The identifier code of the category in the left menu.
 * @returns {Promise<Array>} - A promise that resolves to an array of sameCodes for all products in the specified category.
 */
export class CoopScraper extends WillysScraper {
  #leftMenuUrl = 'https://www.coop.se/api/ecommerce/section/list'

  /**
   * Gets a JSON response containing sameCode to the given category code.
   *
   * @param {number} categoryValue  The code of the left menu category
   *@returns {Array} an array that contains the sameCode to all products of the given category.
   */
  async getCoopSameCode (categoryValue) {
    try {
      let skip = 0
      const sameCode = []
      let res
      do {
        const response = await fetch('https://proxy.api.coop.se/external/personalization/search/entities/by-attribute?api-version=v1&store=074000&groups=CUSTOMER_PRIVATE&device=desktop&direct=false', {
          method: 'POST',
          headers: {
            'ocp-apim-subscription-key': 'c740b5c278fe417fba101fb6b15134b7',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            attribute: {
              name: 'categoryIds',
              value: `${categoryValue}`
            },
            resultsOptions: {
              facets: [
                {
                  attributeName: 'manufacturerName',
                  name: 'brand',
                  operator: 'OR',
                  selected: [],
                  type: 'distinct'
                },
                {
                  attributeName: 'filterLabels',
                  name: 'environmentalLabels',
                  operator: 'AND',
                  selected: [],
                  type: 'distinct'
                },
                {
                  attributeName: 'allergyFilters',
                  name: 'allergyFilters',
                  operator: 'AND',
                  selected: [],
                  type: 'distinct'
                },
                {
                  attributeName: 'nutritionFilters',
                  name: 'nutritionFilters',
                  operator: 'AND',
                  selected: [],
                  type: 'distinct'
                },
                {
                  attributeName: 'lifestyleFilters',
                  name: 'lifestyleFilters',
                  operator: 'AND',
                  selected: [],
                  type: 'distinct'
                }
              ],
              skip: `${skip}`,
              sortBy: [],
              take: 100
            }
          })
        })
        skip += 100
        res = await response.json()
        for (let i = 0; i < res.results.items.length; i++) {
          sameCode.push(res.results.items[i].id)
        }
      } while (res.results.items.length !== 0)
      return sameCode
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Gets a JSON response containing products detail and save it in the database.
   *
   */
  async coopStoraScraper () {
    try {
      // Get the categories
      const sameCodeArray = []
      const categoriesArray = await this.leftMenu(this.#leftMenuUrl)

      // Get the all the same code array
      for (let i = 0; i < categoriesArray.length; i++) {
        sameCodeArray.push(await this.getCoopSameCode(categoriesArray[i]))
        console.log(i)
      }
      const sameCode = sameCodeArray.flat()
      console.log('sameCodeArray.length', sameCode.length)

      for (let i = 0; i < sameCode.length; i + 100) {
        console.log('i:', i)
        const splice = sameCode.splice(sameCode.length - 100)
        console.log('splice: ', splice.length)
        // console.log('elements kvar: ', sameCode)
        console.log('sameCode.length: ', sameCode.length)

        const response = await fetch('https://www.coop.se/api/hybris/ecommerce/product/productlist', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(
            splice
          )
        })
        const result = await response.json()
        for (let k = 0; k < result.length; k++) {
          if (result[k].promos.length > 0) {
            const product = new Product({
              name: result[k].name,
              store: 'Coop',
              imageUrl: `https://res.cloudinary.com/coopsverige/image/upload/f_auto,fl_clip,fl_progressive,q_auto,c_lpad,g_center,h_120,w_120/${result[k].image.identifier}`,
              price: `${result[k].price} kr`,
              priceValue: result[k].price,
              promotionPrice: result[k].promos[0].details.price,
              promotion: result[k].promos[0].identifier,
              sameCode: result[k].id
            })
            await product.save()
          } else if (!result[k].image) {
            console.log('no image')
            const product = new Product({
              name: result[k].name,
              store: 'Coop',
              imageUrl: 'https://www.coop.se/assets/icons/favicons/apple-touch-icon.png?v=47xlw0b2R7',
              price: `${result[k].price} kr`,
              priceValue: result[k].price,
              promotionPrice: 0,
              promotion: 'none',
              sameCode: result[k].id
            })
            await product.save()
          } else {
            const product = new Product({
              name: result[k].name,
              store: 'Coop',
              imageUrl: `https://res.cloudinary.com/coopsverige/image/upload/f_auto,fl_clip,fl_progressive,q_auto,c_lpad,g_center,h_120,w_120/${result[k].image.identifier}`,
              price: `${result[k].price} kr`,
              priceValue: result[k].price,
              promotionPrice: 0,
              promotion: 'none',
              sameCode: result[k].id
            })
            await product.save()
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Gets a JSON response containing all categories.
   *
   * @param {string} leftMenuUrl  The code of the left menu category
   *@returns {Array} an array that contains the code to each one of categories
   */
  async leftMenu (leftMenuUrl) {
    try {
      const categoriesJson = await this.getJsonResponse(leftMenuUrl)
      const categoriesArray = []
      for (let i = 0; i < categoriesJson.length; i++) {
        if (categoriesJson[i].level === 1) {
          categoriesArray.push(categoriesJson[i].id)
        }
      }
      return categoriesArray
    } catch (error) {
      console.log(error)
    }
  }
}
