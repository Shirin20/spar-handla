import React, { useState } from 'react'

export const CartContext = React.createContext()
let shoppingList = []
if (JSON.parse(localStorage.getItem('shoppingList')) !== null) {
  for (let i = 0; i < shoppingList.length; i++) {
    shoppingList.push(shoppingList[i])
}
}


/**
 *
 */
export const CartProvider = (props) => {
  const [cart, setCart] = useState(shoppingList)
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {props.children}
    </CartContext.Provider>
  )
}
