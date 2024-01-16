/**
 * Module for the icaScraper.
 *
 * @author Shirin Meirkhan
 * @version 1.0.0
 */

import { Product } from './models/product.js'

// import fetch from 'node-fetch'
import { WillysScraper } from './Willys-scraper.js'

/**
 * Encapsulates a controller.
 */
export class IcaScraper extends WillysScraper {
  /**
   * Gets a JSON response containing products details by using sameCode.
   *
   */
  /**
   * Initiates the scraping process for ICA Maxi Kalmar supermarket.
   *
   * @async
   */
  async icaMaxiKalmarScraper () {
    try {
      const sameCode = await this.icaMaxiKalmarLinkScraper()
      let sameCodeCounter = 1
      const emptyArray = []

      for (const code of sameCode) {
        const sameCodeResponseJson = await this.getJsonResponse(`https://handla.ica.se/api/content/v1/collection/customer-type/B2C/store/maxi-ica-stormarknad-kalmar-id_02597/products-data?skus=${code}`)
        const imageCode = sameCodeResponseJson.length && sameCodeResponseJson[0].gtin ? sameCodeResponseJson[0].gtin : code
        const imageUrl = `https://assets.icanet.se/t_product_medium_v1,f_auto/${`${imageCode}`.padStart(13, '0')}.jpg`

        if (sameCodeResponseJson.length) {
          await this.saveProductToDatabase(sameCodeResponseJson[0], imageUrl, code)
        } else {
          console.log('Empty Array')
          emptyArray.push(code)
        }

        console.log(`${sameCodeCounter} -- ${code}`)
        sameCodeCounter += 1
      }
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Saves the product data to the database.
   *
   * @param {object} productData - The data of the product.
   * @param {string} imageUrl - The URL of the product image.
   * @param {string} sameCode - The same code of the product.
   * @async
   */
  async saveProductToDatabase (productData, imageUrl, sameCode) {
    const hasPromotion = productData.promotions && productData.promotions.priorityPromotion
    const productInfo = {
      name: productData.name,
      store: 'Ica',
      imageUrl,
      price: productData.priceText,
      priceValue: productData.price,
      promotionPrice: hasPromotion ? productData.promotions.priorityPromotion.price : 0,
      promotion: hasPromotion ? productData.promotions.priorityPromotion.maxItemsText : 'none',
      sameCode
    }

    const product = new Product(productInfo)
    await product.save()
  }

  /**
   * Gets a JSON response containing all products sameCode.
   *
   * a code to a product that is the same in all grocery store is sameCode.
   *
   * @returns {Array} an array of the same code.
   */
  async icaMaxiKalmarLinkScraper () {
    // get the categories list

    const categoriesJson = await this.getJsonResponse('https://handla.ica.se/api/product-info/v1/store/16255/category/catalog80002')
    const categoriesArray = []

    for (let i = 0; i < categoriesJson.childCategories.length; i++) {
      categoriesArray.push(categoriesJson.childCategories[i].seoUrl)
    }

    // to use each category in the url below to get an array of urls to get lists of all the items "sameCode"
    const categoriesUrlsArray = []
    for (let i = 0; i < categoriesArray.length; i++) {
      categoriesUrlsArray.push(`https://handla.ica.se/api/content/v1/collection/customer-type/B2C/store/maxi-ica-stormarknad-kalmar-id_02597/products?categories=${categoriesArray[i]}&sortBy=MYUSUALS&bb=true`)
    }
    // get the "sameCode"s that is returned from the urls.
    const sameCode = []
    let urlCounter = 0
    for (let i = 0; i < categoriesUrlsArray.length; i++) {
      urlCounter += 1
      const categoriesUrlsArrayResponseJason = await this.getJsonResponse(categoriesUrlsArray[i])
      for (let l = 0; l < categoriesUrlsArrayResponseJason.items.length; l++) {
        if (!this.containsAnyLetter(categoriesUrlsArrayResponseJason.items[l].id)) {
          sameCode.push(categoriesUrlsArrayResponseJason.items[l].id)
        }
      }
      console.log(urlCounter)
    }
    return sameCode
  }

  /**
   * Checks if the string contains en letter.
   *
   * @param {string} str The data.
   * @returns {boolean} returns true if there is letter in the str.
   */
  containsAnyLetter (str) {
    return /[a-zA-Z]/.test(str)
  }
}
