import React, { useState, useContext } from 'react'
import { CartContext } from './CartContext'

/**
 *
 */
export default function Product (props) {
  const [selectedProduct, setSelectedProduct] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [cart, setCart] = useContext(CartContext)

  /**
   *
   */
  const onProductClick = async () => {
    const response = await fetch(`https://cscloud8-18.lnu.se/spar-handla/api/v1/code/${props.sameCode}`)
    setSelectedProduct(await response.json())
  }

  /**
   * Delete duplicated store prices.
   *
   * @param {Array} selectedProduct .
   * @returns {Array} stores
   */
  function deleteDuplicates (selectedProduct) {
    let stores
    if (selectedProduct) {
      stores = [...selectedProduct.reduce((map, obj) => map.set(obj.store, obj), new Map()).values()]
    }
    return stores
  }
  

  const stores = deleteDuplicates(selectedProduct)
  stores && stores.sort(function(a, b) {
    return a.priceValue - b.priceValue;
  })
 

  /**
   * Store the items thats added to the shopping list in the local storage
   * @param {*} storeProduct 
   */
 
  const storingShoppingListsItems = function (storeProduct) {
    let shoppingList
    if (localStorage.getItem('shoppingList') === null) {
      shoppingList = []
    } else {
      shoppingList = JSON.parse(localStorage.getItem('shoppingList'))
    }
    shoppingList.push(storeProduct)
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList))
  }


  return (
      //  if the user clicks on the product, will see the prices.
    <div className='product--card' >
      <img onClick={onProductClick} className='card--image'  src={props.imageUrl} alt={props.name} />
      <p>{props.name}</p>
      {stores &&
       stores.map(storeProduct => {
        //  if the product has a promotion
         if (storeProduct.promotion !== 'none') {
           return <div  key={storeProduct.id}>
          <p className={`product-${storeProduct.store}`} >{storeProduct.store}</p>
          <p>ord Pris: {storeProduct.price}</p>
          <p>{storeProduct.promotionPrice} kr</p>
          <p>{storeProduct.promotion} 
          {/* on click add the product only if its not already in the cart */}
          <button onClick={() => {
            (!cart.some(product => product.id === storeProduct.id)) &&
            storingShoppingListsItems(storeProduct)
            setCart(JSON.parse(localStorage.getItem('shoppingList')))
            }} 
            className='btn btn-warning btn-sm add-product'>Lägg Till</button></p>
          </div>
          //  if the product has no promotion
         } else {
           return <div   key={storeProduct.id}>
          <p className={`product-${storeProduct.store}`} >{storeProduct.store}</p>
          <p>{storeProduct.price}
          <button onClick={() => {
            (!cart.some(product => product.id === storeProduct.id)) &&
            storingShoppingListsItems(storeProduct)
            setCart(JSON.parse(localStorage.getItem('shoppingList')))
            }}
             className='btn btn-warning btn-sm add-product'>Lägg Till</button></p>
          </div>
         }
       })
      }
    </div>
  )
}
