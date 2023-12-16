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
  //find the cartItem to remove
  const Exist = cartItems.find((item) => item.id === cartItemToRemove.id);
  // check if quantity is equal to 1, if it is remove that items from teh cart
  if(Exist.quantity === 1) {
  return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
  }
  //return back cartItems with matching cart item with reduced quantity 
  return cartItems.map((cartItem) => 
    cartItem.id === cartItemToRemove.id 
      ? {...cartItem, quantity:cartItem.quantity - 1}
      : cartItem
  )}

  const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id)
  
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  clearItemFromCart: () => {},
  removeCartFromCart: () => {},
  addItemToCart: () => {},
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [ isCartOpen, setIsCartOpen ] = useState(false);
  const [ cartItems, setCartItems ] = useState([]);
  const [ cartCount, setCartCount ] = useState(0);
  const [ cartTotal, setCartTotal ] = useState(0);
  
  useEffect(() => {
    const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
    setCartTotal(newCartTotal)
  }, [cartItems])


  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    setCartCount(newCartCount)
  }, [cartItems])
  
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };
  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  }
  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  }

  const value = { 
    isCartOpen, 
    clearItemFromCart, 
    removeItemFromCart, 
    setIsCartOpen, 
    addItemToCart, 
    cartItems, 
    cartCount,
    cartTotal, 
  }

  return (
    <CartContext.Provider value={value}>
      { children }
    </CartContext.Provider>
  )
}