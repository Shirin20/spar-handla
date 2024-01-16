/**
 * Mongoose model users.
 *
 * @author Shirin Meirkhan
 * @version 1.0.0
 */

import mongoose from 'mongoose'
// import { boolean } from 'webidl-conversions'

// Create a schema.
const schema = new mongoose.Schema({
  name: {
    type: String
  },
  store: {
    type: String
  },
  imageUrl: {
    type: String
  },
  price: {
    type: String
  },
  priceValue: {
    type: Number
  },
  promotionPrice: {
    type: Number
  },
  promotion: {
    type: String
  },
  sameCode: {
    type: Number
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true, // ensure virtual fields are serialized
    /**
     * Performs a transformation of the resulting object to remove sensitive information.
     *
     * @param {object} doc - The mongoose document which is being converted.
     * @param {object} ret - The plain object representation which has been converted.
     */
    transform: function (doc, ret) {
      delete ret.__v
      delete ret._id
    }
  }
})

schema.virtual('id').get(function () {
  return this._id.toHexString()
})

// Create a model using the schema.
export const Product = mongoose.model('Product', schema)
