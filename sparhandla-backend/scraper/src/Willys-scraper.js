/**
 * Module for the WillysScraper.
 *
 * This module contains the WillysScraper class which is responsible for scraping product data
 * from the Willys supermarket website. It handles fetching product information, processing it,
 * and saving it to a database.
 *
 * @module WillysScraper
 * @author Shirin Meirkhan
 * @version 1.0.0
 */

import { Product } from './models/product.js'

import fetch from 'node-fetch'

/**
 * Class responsible for scraping product data from the Willys website.
 *
 * This class includes methods to fetch category data, construct product URLs, and retrieve product information.
 * It saves the fetched product data into a database.
 *
 * @class WillysScraper
 */
export class WillysScraper {
  /**
   * Initiates the scraping process for Willys supermarket.
   *
   * This method orchestrates the entire scraping process by calling helper methods to fetch categories,
   * scrape product data, and save it to the database.
   *
   * @async
   */
  async willysScraper () {
    try {
      const categoriesArray = await this.fetchCategoryUrls()
      await this.processCategories(categoriesArray)
    } catch (error) {
      console.log('Scraping error:', error)
    }
  }

  /**
   * Fetches category URLs from Willys website.
   *
   * @returns {Promise<Array>} An array of category URLs.
   * @async
   */
  async fetchCategoryUrls () {
    const categoriesJson = await this.getJsonResponse('https://www.willys.se/leftMenu/categorytree?avoidCache=1649757098727')
    return categoriesJson.children.map(child => child.url)
  }

  /**
   * Processes each category URL to scrape product data.
   *
   * @param {Array} categoriesArray An array of category URLs.
   * @async
   */
  async processCategories (categoriesArray) {
    for (const category of categoriesArray) {
      const link = `https://www.willys.se/c/${category}?categoryPath=${category}&size=30&page=`
      await this.scrapeCategory(link)
    }
  }

  /**
   * Scrapes product data from a given category URL.
   *
   * @param {string} categoryUrl The URL of the category to scrape.
   * @async
   */
  async scrapeCategory (categoryUrl) {
    let pageNumber = 0
    let willysResults

    do {
      const willysRes = await this.getJsonResponse(`${categoryUrl}${pageNumber}`)
      await this.processPageResults(willysRes.results)
      pageNumber += 1
      willysResults = willysRes.results
    } while (willysResults !== null)
  }

  /**
   * Processes product results from a single page.
   *
   * @param {Array} results An array of product results from the page.
   * @async
   */
  async processPageResults (results) {
    if (!results) return

    for (const result of results) {
      const sameCode = this.getSameCode(result)
      const productData = this.prepareProductData(result, sameCode)
      const product = new Product(productData)
      await product.save()
    }
  }

  /**
   * Prepares product data for database insertion.
   *
   * @param {object} result The product result.
   * @param {string} sameCode The same code of the product.
   * @returns {object} The prepared product data.
   */
  prepareProductData (result, sameCode) {
    const hasPromotion = result.potentialPromotions && result.potentialPromotions.length
    return {
      name: result.name,
      store: 'Willys',
      imageUrl: result.image.url,
      price: result.price,
      priceValue: result.priceValue,
      promotionPrice: hasPromotion ? result.potentialPromotions[0].price.value : 0,
      promotion: hasPromotion ? result.potentialPromotions[0].conditionLabel : 'none',
      sameCode
    }
  }

  /**
   * Extracts the 'same code' from a product result.
   *
   * @param {object} result The product result.
   * @returns {string} The extracted 'same code'.
   */
  getSameCode (result) {
    const url = result.image.url
    const numbers = url.split('/')
    const splitNumber = numbers[6]
    const sameCode = splitNumber.split('_')
    return parseInt(sameCode, 10)
  }

  /**
   * To fetch data from an url.
   *
   * @param {string} url the url to get the left menu categories from.
   * @returns {object} json object.
   */
  async getJsonResponse (url) {
    const categoryResponse = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:98.0) Gecko/20100101 Firefox/98.0',
        'Content-Type': 'application/json'
      }
    })
    const categoriesJson = await categoryResponse.json()
    return categoriesJson
  }
}
