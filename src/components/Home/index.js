import {Component} from 'react'
import {BsFilterLeft} from 'react-icons/bs'
import Header from '../Header'
import CarouselOffers from '../CarouselOffers'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class Home extends Component {
  state = {activeOptionId: sortByOptions[1].value}

  onChangeSortBy = event => {
    this.setState({activeOptionId: event.target.value})
  }

  render() {
    const {activeOptionId} = this.state
    return (
      <>
        <Header />
        <div className="home-bg-outside-container">
          <div className="home-bg-container">
            <CarouselOffers />
            <div className="popular-restaurants-bg-container">
              <div className="heading-para-sorting-bg-container">
                <div className="heading-para-sorting-container">
                  <div className="heading-para-container">
                    <h1 className="popular-restaurants-heading">
                      Popular Restaurants
                    </h1>
                    <p className="popular-para">
                      Select Your favourite restaurant special dish and make
                      your day happy...
                    </p>
                  </div>
                  <div className="sort-by-container">
                    <BsFilterLeft className="sort-by-icon" />
                    <p className="sort-by">Sort by</p>
                    <select
                      className="sort-by-select"
                      value={activeOptionId}
                      onChange={this.onChangeSortBy}
                    >
                      {sortByOptions.map(eachOption => (
                        <option
                          key={eachOption.id}
                          value={eachOption.value}
                          className="select-option"
                        >
                          {eachOption.displayText}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <hr className="hr-line" />
              <input
                type="search"
                className="search-box"
                placeholder="Search Restaurant"
              />
              <ul className="restaurants-list-container">Rajesh</ul>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Home
