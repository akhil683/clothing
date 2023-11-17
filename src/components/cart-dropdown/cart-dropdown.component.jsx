import { useContext } from 'react';

import Button from '../button/button.component';
import { CartContext } from '../../context/Cart.context';

import './cart-dropdown.styles.scss';

const CartDropdown = () => {
  const {setIsCartOpen } = useContext(CartContext);
  const cartToggle = () => {
    setIsCartOpen(false);
  }
  return (
  <>
  <div className='black' onClick={cartToggle}>
  </div>
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
      </div>
      <Button>
          Checkout
      </Button>
    </div>
  </>
  )
}
export default CartDropdown