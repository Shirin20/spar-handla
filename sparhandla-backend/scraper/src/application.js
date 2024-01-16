/**
 * Main application module.
 *
 * This module initializes and runs the web scraping application, which is designed to scrape product data from
 * various grocery stores' websites. It imports necessary scraper classes and a database connection module.
 *
 * @module Application
 * @author Shirin Meirkhan
 * @version 1.0.0
 */

import { WillysScraper } from './Willys-scraper.js'
import { CoopScraper } from './Coop-scraper.js'
import { IcaScraper } from './Ica-scraper.js'
import { connectDB } from '../src/config/mongoose.js'

/**
 * Class representing the main application.
 *
 * This class encapsulates the entire application's functionality, including initializing scrapers for
 * different stores and managing database connections.
 *
 * @class Application
 */
export class Application {
  /**
   * Initializes and runs the scrapers for each store, connecting to the database first.
   *
   * This method starts by establishing a connection to the database. Then, it sequentially runs scrapers for
   * Willys, Coop, and Ica stores, logging the successful completion of each scraping operation.
   *
   * @async
   */
  async run () {
    await connectDB()
    console.log('Database connected successfully.')

    const willysScraper = new WillysScraper()
    const coopScraper = new CoopScraper()
    const icaScraper = new IcaScraper()

    await willysScraper.willysScraper()
    console.log('Willys was scrapped successfully.')

    await coopScraper.coopStoraScraper()
    console.log('Coop was scrapped successfully.')

    await icaScraper.icaMaxiKalmarScraper()
    console.log('Ica was scrapped successfully.')
  }
}
