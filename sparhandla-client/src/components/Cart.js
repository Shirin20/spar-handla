import React, { useContext } from 'react'
import { CartContext } from './CartContext'




/**
 * The shopping list component that displays shopping 
 * list for each store
 */
export const Cart = () => {
  const [cart, setCart] = useContext(CartContext)

  /**
   * convert the stored shoppingslist in the local storage into an array.
   */
  const localStorageShoppingListToArray = function () {
    const shoppingList = JSON.parse(localStorage.getItem('shoppingList'))
    const shoppingListArray = []
    for (let i = 0; i < shoppingList.length; i++) {
        shoppingListArray.push(shoppingList[i])
    }
    return shoppingListArray
  }

  /**
   * Removes the item from the local storage.
   * @returns [Array] of the items which is left in the shopping list in the local storage
   */
  const removeItemFromLocalStorage = function (id) {
    const shoppingList = JSON.parse(localStorage.getItem('shoppingList'))
    const shoppingListArray = []
    for (let i = 0; i < shoppingList.length; i++) {
      if (shoppingList[i].id !== id) {
        shoppingListArray.push(shoppingList[i])
      }
    }
    localStorage.setItem('shoppingList', JSON.stringify(shoppingListArray))
    return localStorageShoppingListToArray()
  }

  
  /**
     * Removes an item from the list.
     * and set the new localsrorage array to the cart
     */
   function handleRemove (id) {
    setCart(removeItemFromLocalStorage(id))
  }

  /**
   * 
   * @param {*} list 
   * @returns html representation of the shopping list
   */
  const fillTheList = function (list) {
    const listElement = list.map(product => {
      return (<div  key={product.id}>
         <li> {product.name} Price: {product.promotion === 'none' ? product.price : product.promotionPrice }
         <img className='list--itemImage' src={product.imageUrl} alt={product.name} />
         {/* display promotion details  */}
         {product.promotion === 'none' ? <p></p> : <p> {product.promotion} </p>}
         <p>Price: {product.promotion === 'none' ? product.price : product.promotionPrice }
         <button onClick={() => handleRemove(product.id)} className='btn btn-warning btn-sm add-product'>Ta bort</button>
         </p>
         </li>
          </div>
      )
     })
     return listElement
   }
  
   // make three arrays of the items that are stored in the local storage and sort them depending on the store name
  // so each store has its own list
  
  const icaList = []
  const willysList = []
  const CoopList = []
  
  
  if (cart.length) {
    cart.map( product => { 
    if (product.store === 'Ica') {
      return icaList.push(product)
    } else if (product.store === 'Willys') {
      return willysList.push(product)
    } else {
      return CoopList.push(product)
    }
  } )
  }

  /**
   * Calculates the total price of the items in all the shopping lists
   * @param {*} shoppingList array of the items that are placed in the shoppingList
   * @returns total amount of all item prices.
   */

  const totalPrice = function(shoppingList) {
  const pricesArray = []
  shoppingList.map( product => {
    if( product.promotion === 'none') { 
      return pricesArray.push(product.priceValue)
     } else {
      return pricesArray.push(product.promotionPrice)
     }
   }) 
   const initialValue = 0;
   const sumtotal = pricesArray.reduce(
     (previousValue, currentValue) => previousValue + currentValue,
     initialValue
   )
   return sumtotal.toFixed(2)
   
}

  return (
    <div>
    <div className='cart--store'>
      <div className='Willys' >
        <p className='cart-list-willysTitle'>Willys</p>
        {willysList && fillTheList(willysList)}
      </div>
      <div  className='Ica' >
        <p className='cart-list-icaTitle'>Ica</p>
        {willysList && fillTheList(icaList)}

      </div>
      <div  className='Coop' >
        <p className='cart-list-coopTitle' >Coop</p>
        {willysList && fillTheList(CoopList)}
      </div>
      
    </div>
      <p className='total-toPay' >Total to pay : {totalPrice(cart)}</p>
    </div>
  )
}
