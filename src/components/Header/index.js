import {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

import {FiMenu} from 'react-icons/fi'

import {AiFillCloseCircle} from 'react-icons/ai'

class Header extends Component {
  state = {activeItem: 'HOME', isShownMenu: false}

  onChangingActiveItemToHome = () => {
    this.setState({activeItem: 'HOME'})
  }

  onChangingActiveItemToCart = () => {
    this.setState({activeItem: 'CART'})
  }

  onShowHideMenu = () => {
    this.setState(prevState => ({
      isShownMenu: !prevState.isShownMenu,
    }))
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  renderMenuInSmallDevices = (activeHomeStatus, activeCartStatus) => (
    <ul className="menu-container">
      <li className="nav-menu-item" onClick={this.onChangingActiveItemToHome}>
        <Link to="/" className={`nav-link ${activeHomeStatus}`}>
          Home
        </Link>
      </li>
      <li className="nav-menu-item" onClick={this.onChangingActiveItemToCart}>
        <Link to="/cart" className={`nav-link ${activeCartStatus}`}>
          Cart
        </Link>
      </li>
      <li className="nav-menu-item">
        <button
          className="logout-btn"
          type="button"
          onClick={this.onClickLogout}
        >
          Logout
        </button>
      </li>
      <li className="nav-menu-item">
        <button
          type="button"
          className="close-btn"
          onClick={this.onShowHideMenu}
        >
          <AiFillCloseCircle size={30} />
        </button>
      </li>
    </ul>
  )

  render() {
    const {activeItem, isShownMenu} = this.state
    const activeHomeStatus = activeItem === 'HOME' ? 'active-color-home' : ''
    const activeCartStatus = activeItem === 'CART' ? 'active-color-cart' : ''

    return (
      <>
        <nav className="navbar">
          <div className="logo-heading-container">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dtlqsvj2k/image/upload/v1657517641/TastyKitchen/website-logo_bi1pg3.png"
                alt="website logo"
                className="header-logo-img"
              />
            </Link>
            <h1 className="header-heading">Tasty Kitchens</h1>
          </div>
          <div className="small-devices-container">
            <button
              type="button"
              className="menu-btn"
              onClick={this.onShowHideMenu}
            >
              <FiMenu size={22} />
            </button>
          </div>

          <ul className="large-devices-container">
            <li
              className="nav-menu-item"
              onClick={this.onChangingActiveItemToHome}
            >
              <Link to="/" className={`nav-link ${activeHomeStatus}`}>
                Home
              </Link>
            </li>
            <li
              className="nav-menu-item"
              onClick={this.onChangingActiveItemToCart}
            >
              <Link to="/cart" className={`nav-link ${activeCartStatus}`}>
                Cart
              </Link>
            </li>
            <li className="nav-menu-item">
              <button
                className="logout-btn"
                type="button"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
        {isShownMenu &&
          this.renderMenuInSmallDevices(activeHomeStatus, activeCartStatus)}
      </>
    )
  }
}

export default withRouter(Header)