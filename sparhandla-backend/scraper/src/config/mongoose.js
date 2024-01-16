/**
 * Mongoose configuration.
 *
 * @author Shirin Meirkhan
 * @version 1.0.0
 */

import mongoose from 'mongoose'

/**
 * Establishes a connection to a database.
 *
 * @returns {Promise} Resolves to this if connection succeeded.
 */
export const connectDB = async () => {
  const { connection } = mongoose

  // Bind connection to events (to get notifications).
  connection.on('connected', async () => {
    // Drop the database first when the program starts.
    await connection.dropCollection('products')
    console.log('the database was dropped successfully')

    console.log('MongoDB connection opened.')
  })
  connection.on('error', err => console.error(`MongoDB connection error occurred: ${err}`))
  connection.on('disconnected', () => console.log('MongoDB is disconnected.'))

  // If the Node.js process ends, close the connection.
  process.on('SIGINT', () => {
    connection.close(() => {
      console.log('MongoDB disconnected due to application termination.')
      process.exit(0)
    })
  })

  // Connect to the server.
  return mongoose.connect('mongodb://localhost:27019/productDb')
}
