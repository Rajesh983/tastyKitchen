import {Component} from 'react'

import {Link} from 'react-router-dom'
import './index.css'

import Header from '../Header'
import Footer from '../Footer'
import CartItemCard from '../CartItemCard'

function getCartListFromLocalStorage() {
  const stringifiedCartList = localStorage.getItem('cartData')
  const parsedCartList = JSON.parse(stringifiedCartList)
  if (parsedCartList === null) {
    return []
  }
  return parsedCartList
}

const cartList = getCartListFromLocalStorage()
console.log(cartList)

class Cart extends Component {
  renderEmptyCart = () => (
    <div className="empty-cart-container">
      <img
        src="https://res.cloudinary.com/dtlqsvj2k/image/upload/v1657517285/TastyKitchen/No-items-in-cart_ipjoai.png"
        alt="empty cart"
        className="empty-cart-img"
      />
      <h1 className="empty-cart-heading">No Orders Yet!</h1>
      <p className="empty-cart-para">
        Your cart is empty. Add something from the menu.
      </p>
      <Link to="/" style={{textDecoration: 'none'}}>
        <button type="button" className="order-now-btn">
          Order Now
        </button>
      </Link>
    </div>
  )

  renderPaymentSuccessful = () => (
    <div className="empty-cart-container">
      <img
        src="https://res.cloudinary.com/dtlqsvj2k/image/upload/v1657517127/TastyKitchen/payment-successful-icon_phlnbp.png"
        alt="payment successful"
        className="payment-img"
      />
      <h1 className="empty-cart-heading">Payment Successful</h1>
      <p className="empty-cart-para">
        Thank you for ordering. Your payment is successfully completed.
      </p>
      <Link to="/" style={{textDecoration: 'none'}}>
        <button type="button" className="order-now-btn go-to-btn">
          Go To Home Page
        </button>
      </Link>
    </div>
  )

  renderCartItems = () => (
    <>
      <div className="large-devices-cart-header-bg">
        <div className="large-devices-cart-header">
          <h1 className="food-name margin-adjust">Item</h1>
          <h1 className="food-name">Quantity</h1>
          <h1 className="food-name padding-adjust">Price</h1>
        </div>

        <ul className="cart-items-list-container">
          {cartList.map(eachCart => (
            <CartItemCard cartItem={eachCart} key={eachCart.id} />
          ))}
        </ul>
      </div>
      <div className="small-devices-cart-container">
        <ul className="cart-items-list-container-small">
          {cartList.map(eachCart => (
            <CartItemCard cartItem={eachCart} key={eachCart.id} />
          ))}
        </ul>
      </div>
      <Footer />
    </>
  )

  render() {
    return (
      <>
        <Header />
        <div className="cart-bg-outside-container">
          <div className="cart-bg-container">
            {cartList.length === 0
              ? this.renderEmptyCart()
              : this.renderCartItems()}
          </div>
        </div>
      </>
    )
  }
}

export default Cart
