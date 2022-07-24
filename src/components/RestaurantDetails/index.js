import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'
import RestaurantBanner from '../RestaurantBanner'
import Header from '../Header'
import Footer from '../Footer'
import FoodItemCard from '../FoodItemCard'

class RestaurantDetails extends Component {
  state = {
    isLoading: true,
    restDetails: {},
    foodItemsList: [],
    addedToCartList: [],
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    this.setState({isLoading: true})
    const {match} = this.props
    const {params} = match
    const {id} = params

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
      quantity: 1,
    }))

    this.setState({
      restDetails: updatedRestDetails,
      foodItemsList: foodItems,
      isLoading: false,
    })
  }

  onAddingToCartList = cartItem => {
    this.setState(
      prevState => ({
        addedToCartList: [...prevState.addedToCartList, cartItem],
      }),
      this.onUpdatingCartData,
    )
  }

  onDecrementingQuantity = id => {
    const {addedToCartList} = this.state
    const targetItem = addedToCartList.find(eachObj => eachObj.id === id)
    let {quantity} = targetItem
    if (quantity > 1) {
      quantity -= 1
    }
    const newItem = {...targetItem, quantity}
    const filteredData = addedToCartList.filter(eachItem => eachItem.id !== id)
    this.setState(
      {addedToCartList: [...filteredData, newItem]},
      this.onUpdatingCartData,
    )
  }

  onIncrementingQuantity = id => {
    const {addedToCartList} = this.state
    const targetItem = addedToCartList.find(eachObj => eachObj.id === id)
    let {quantity} = targetItem
    quantity += 1
    const newItem = {...targetItem, quantity}
    const filteredData = addedToCartList.filter(eachItem => eachItem.id !== id)
    this.setState(
      {addedToCartList: [...filteredData, newItem]},
      this.onUpdatingCartData,
    )
  }

  onUpdatingCartData = () => {
    const {addedToCartList} = this.state

    const updatedCartData = addedToCartList.map(eachCart => ({
      cost: eachCart.cost,
      id: eachCart.id,
      quantity: eachCart.quantity,
      imageUrl: eachCart.imageUrl,
      name: eachCart.name,
    }))
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
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
    const {restDetails, foodItemsList, addedToCartList} = this.state
    return (
      <>
        <RestaurantBanner restDetails={restDetails} />
        <ul className="food-items-list-container">
          {foodItemsList.map(eachItem => (
            <FoodItemCard
              foodItem={eachItem}
              key={eachItem.id}
              onAddingToCartList={this.onAddingToCartList}
              checkRes={addedToCartList.findIndex(
                eachOne => eachOne.id === eachItem.id,
              )}
              quantityCheck={addedToCartList.find(
                eachOne => eachOne.id === eachItem.id,
              )}
              onIncrementingQuantity={this.onIncrementingQuantity}
              onDecrementingQuantity={this.onDecrementingQuantity}
            />
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Header />
        <div className="large-container">
          <div className="restaurant-details-bg-outside-container">
            <div className="restaurant-details-bg-container">
              {isLoading ? this.renderLoader() : this.renderDetails()}
            </div>
            <Footer />
          </div>
        </div>
      </>
    )
  }
}

export default RestaurantDetails
