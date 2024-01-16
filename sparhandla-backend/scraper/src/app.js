/**
 * The starting point of the application.
 *
 * @author Shirin Meirkhan <sm223qi@student.lnu.se>
 * @version 1.0.0
 */

import { Application } from './application.js'
import { exit } from 'process'

try {
  const application = new Application()
  await application.run()

  exit(0)
} catch (error) {
  console.error(error.message)
}
