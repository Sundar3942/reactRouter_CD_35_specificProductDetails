/* eslint-disable prettier/prettier */
import {Component, Redirect} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class BlogItemDetails extends Component {
  state = {productData: {}, isLoading: true, productCount: 1}

  componentDidMount() {
    this.getProductData()
  }

  getProductData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      const url = `https://apis.ccbp.in/products/${id}`
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }
      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok) {
        const updatedData = {
          id: data.id,
          imageUrl: data.image_url,
          title: data.title,
          style: data.style,
          price: data.price,
          description: data.description,
          brand: data.brand,
          totalReviews: data.total_reviews,
          rating: data.rating,
          availability: data.availability,
          similarProducts: data.similar_products,
        }
        this.setState({productData: updatedData, isLoading: false})
      } else {
        this.renderFailure()
      }
    } else {
      ;<Redirect to="/login" />
    }
  }

  increaseHandler = () => {
    this.setState(prevState => {
      const newCount = prevState.productCount + 1
      return {productCount: newCount}
    })
  }

  decreaseHandler = () => {
    this.setState(prevState => {
      const newCount = prevState.productCount - 1
      return {productCount: newCount}
    })
  }

  //   renderFailure = () => {}

  renderProductDetails = () => {
    const {productData, productCount} = this.state
    const {
      id,
      title,
      imageUrl,
      style,
      price,
      description,
      brand,
      totalReviews,
      rating,
      availability,
      similarProducts,
    } = productData

    return (
      <>
        <div className="product-details-section">
          <img src={imageUrl} alt="product" className="product-image" />
          <div>
            <h1>{title}</h1>
            <p>Rs {price}/- </p>
            <div className="rating-and-total-reviews-container">
              <p className="product-details-rating">{rating}</p>
              <p>{totalReviews} reviews</p>
            </div>
            <p>{description}</p>
            <p>Available : {availability}</p>
            <p>Brand : {brand}</p>
            <hr />
            <div className="increase-decrease-btn-container">
              <button
                data-testid="minus"
                type="button"
                onClick={this.decreasesHandler}
              >
                -
              </button>
              <p>{productCount}</p>
              <button
                data-testid="plus"
                type="button"
                onClick={this.increaseHandler}
              >
                +
              </button>
            </div>
            <button type="button">Add to Cart</button>
          </div>
        </div>
        <div className="similar-products-section">
          <h1>Similar Products</h1>
          <ul className="similar-products-container">
            {similarProducts.map(each => (
              <SimilarProductItem key={each.id} eachItem={each} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <>
        <Header />
        <div className="blog-container">
          {isLoading ? (
            <div data-testid="loader">
              <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
            </div>
          ) : (
            this.renderProductDetails()
          )}
        </div>
      </>
    )
  }
}

export default BlogItemDetails
