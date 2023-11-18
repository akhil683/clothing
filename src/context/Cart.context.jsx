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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [ isCartOpen, setIsCartOpen ] = useState(false);
  const [ cartItems, setCartItems ] = useState([]);
  const [cartCount, setCartCount ] = useState(0);
  
  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    setCartCount(newCartCount)
  }, [cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount }

  return (
    <CartContext.Provider value={value}>
      { children }
    </CartContext.Provider>
  )
}