import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../button/button.component';
import { CartContext } from '../../context/Cart.context';
import CartItem from '../cart-item/cart-item.component';

import './cart-dropdown.styles.scss';

const CartDropdown = () => {
  const {setIsCartOpen, cartItems } = useContext(CartContext);

  const navigate = useNavigate();
  const goToCheckoutHandler = () => {
    navigate('/checkout');
    setIsCartOpen(false);
  }

  const cartToggle = () => {
    setIsCartOpen(false);
  }
  return (
  <>
  <div className='black' onClick={cartToggle}></div>

    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)}
      </div>
      <Button onClick={goToCheckoutHandler}>
          Checkout
      </Button>
    </div>
  </>
  )
}
export default CartDropdown