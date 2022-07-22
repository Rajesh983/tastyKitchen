import React from 'react'

const CartContext = React.createContext({
  cartList: [1, 2, 3, 4],
  removeAllCartItems: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
})

export default CartContext
