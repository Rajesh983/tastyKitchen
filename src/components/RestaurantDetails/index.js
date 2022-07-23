import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'
import RestaurantBanner from '../RestaurantBanner'
import Header from '../Header'
import Footer from '../Footer'

class RestaurantDetails extends Component {
  state = {isLoading: false, restDetails: {}, foodItemsList: []}

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({isLoading: true})

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const data = await fetch(apiUrl, options)

    const updatedData = await data.json()

    const updatedRestDetails = {
      id: updatedData.id,
      imageUrl: updatedData.image_url,
      name: updatedData.name,
      location: updatedData.location,
      rating: updatedData.rating,
      reviewsCount: updatedData.reviews_count,
      costForTwo: updatedData.cost_for_two,
      cuisine: updatedData.cuisine,
    }

    const foodItems = updatedData.food_items.map(eachItem => ({
      cost: eachItem.cost,
      id: eachItem.id,
      imageUrl: eachItem.image_url,
      name: eachItem.name,
      rating: eachItem.rating,
    }))

    this.setState({
      isLoading: false,
      restDetails: updatedRestDetails,
      foodItemsList: foodItems,
    })
  }

  renderLoader = () => (
    <div
      testid="restaurant-details-loader"
      className="restaurant-details-loader"
    >
      <Loader type="ThreeDots" color="#F7931E" height={50} width={50} />
    </div>
  )

  renderDetails = () => {
    const {restDetails} = this.state

    return <RestaurantBanner restDetails={restDetails} />
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Header />
        <div className="restaurant-details-bg-container">
          {isLoading ? this.renderLoader() : this.renderDetails()}
        </div>
        <Footer />
      </>
    )
  }
}

export default RestaurantDetails
