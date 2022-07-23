import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import RestaurantBanner from '../RestaurantBanner'
import Header from '../Header'
import Footer from '../Footer'

class RestaurantDetails extends Component {
  state = {isLoading: false, restDetails: {}}

  renderLoader = () => (
    <div testid="restaurant-details-loader" className="restaurant-loader">
      <Loader type="ThreeDots" color="#F7931E" height={50} width={50} />
    </div>
  )

  render() {
    return (
      <>
        <Header />
        <div className="restaurant-details-bg-container">
          Restaurant Details
        </div>
        <Footer />
      </>
    )
  }
}

export default RestaurantDetails
