import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
// find if cartItems contains product to add
  const Exist = cartItems.find((item) => item.id === productToAdd.id);
  //if found, increment quantity
  if (Exist) {
    return cartItems.map((item) => item.id === productToAdd.id 
    ? {...item, quantity: item.quantity + 1}
    : item
    )
  }
//return new array with modified cartItems/ new cartItems
  return [...cartItems, {...productToAdd, quantity: 1}]; 
}

const removeCartItem = (cartItems, cartItemToRemove) => {
  // find the cartitem to remove 
  const Exist = cartItems.find((item) => item.id === cartItemToRemove.id);
  // check if quantity is equal to 1, if it is remove that item from the cart
  if (Exist.quantity === 1) {
    return cartItems.filter((item) => item.id !== cartItemToRemove.id)
  }
  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((item) => item.id === cartItemToRemove.id 
    ? {...item, quantity: item.quantity - 1}
    : item
    )
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
});

const [ isCartOpen, setIsCartOpen ] = useState(false);
const [ cartItems, setCartItems ] = useState([]);

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount ] = useState(0);
 
  useEffect(() => {
  const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
  setCartCount(newCartCount)
}, [cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };
  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  const value = { 
    isCartOpen, 
    setIsCartOpen, 
    addItemToCart, 
    cartItems, 
    cartCount, 
    removeItemFromCart, 
  }

  return (
    <CartContext.Provider value={value}>
      { children }
    </CartContext.Provider>
  )
}