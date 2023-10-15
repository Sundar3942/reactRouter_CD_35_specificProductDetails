// Write your code here

import './index.css'

const SimilarProductItem = props => {
  const {eachItem} = props
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
  } = eachItem

  return (
    <li className="similar-product-item">
      <img
        src={imageUrl}
        alt="similar product"
        className="similar-product-image"
      />
      <p>{title}</p>
      <p>By {brand}</p>
      <div className="similar-product-price-and-rating-container">
        <p>Rs {price}/- </p>
        <p className="similar-product-rating">{rating}</p>
      </div>
    </li>
  )
}

export default SimilarProductItem
