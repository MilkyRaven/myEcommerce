import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';

import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe'

export default function Cart() {

  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove} = useStateContext();

  const handleCheckout = async () => {
    try {
      const stripe = await getStripe();

      const response = await fetch('/api/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`,
        },
        body: JSON.stringify(cartItems),
      });

      console.log("its in")
  
      if(response.status === 500) return; //status o statusCode?
      
      const data = await response.json();
  
      toast.loading('Redirecting...');
  
      stripe.redirectToCheckout({ sessionId: data.id }); 
    } catch (e) {
      switch (e.type) {
        case 'StripeCardError':
          console.log(`A payment error occurred: ${e.message}`);
          break;
        case 'StripeInvalidRequestError':
          console.log('An invalid request occurred.');
          break;
          case 'StripePermissionError':
            console.log('Se produjo un error del lado de Stripe.');
            break;
        default:
          console.log('Another problem occurred, maybe unrelated to Stripe.');
          break;
      }
    }
  }
  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <button
          type="button"
          className='cart-heading'
          onClick={() => setShowCart(false)}>
          <AiOutlineLeft></AiOutlineLeft>
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({totalQuantities})</span>
        </button>

        {/* if we don't have items on the cart */}

        {cartItems.length < 1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={150} />
            <h3>Your cart is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
        {/* if there are items in the cart */}
        <div className='product-container'>
          {cartItems.length >= 1 && cartItems.map((item) => (
            <div className="product" key={item._id}>
              <img src={urlFor(item?.image[0])}
                className="cart-product-image"></img>
              <div className='item-desc'>
                <div className='flex top'>
                  <h5>{item.name}</h5>
                  <h4>${item.price}</h4>
                </div>
                {/* add or decrease quantity */}
                <div className='flex bottom'>
                  <p className='quantity-desc'>
                    <span className='minus' onClick={() => toggleCartItemQuantity(item._id, 'dec')}><AiOutlineMinus></AiOutlineMinus></span>
                    <span className='num' onClick="">{item.quantity}</span>
                    <span className='plus' onClick={() => toggleCartItemQuantity(item._id, 'inc')}><AiOutlinePlus></AiOutlinePlus></span>
                  </p>

                  <button
                    type='button'
                    className='remove-item'
                    onClick={() => onRemove(item)}>
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length >= 1 && (
          <div className='cart-bottom'>
            <div className='total'>
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

