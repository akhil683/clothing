import { useContext } from 'react';
import { CartContext } from '../../context/Cart.context';

import './cart-icon.styles.scss';

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
  return (
    <div className='cart-icon-container' onClick={toggleIsCartOpen}>
      <img className='shopping-icon' src="https://uxwing.com/wp-content/themes/uxwing/download/e-commerce-currency-shopping/shopping-cart-icon.png" alt="" />
      <span className='item-count'>{cartCount}</span>
    </div>
  )
}
export default CartIcon