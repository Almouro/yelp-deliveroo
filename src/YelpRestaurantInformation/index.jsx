import React, { PropTypes } from 'react';
import YelpRating from './YelpRating';
import './yelp.css';

const YelpRestaurantInformation = (props) => {
  const { restaurant } = props;

  if (!restaurant) return <div>{'Nooooo! We didn\'t find that restaurant on Yelp :('}</div>;

  return (
    <a href={restaurant.url}>
      <h2>{restaurant.name}</h2>
      <div className="rating-info clearfix">
        <div className="biz-rating biz-rating-very-large clearfix">
          <YelpRating rating={restaurant.rating} />
          <span className="review-count rating-qualifier">
            {restaurant.review_count} reviews
          </span>
        </div>
      </div>
      <div className="price-category">
        <span className="bullet-after">
          <span className="business-attribute price-range">{restaurant.price}</span>
        </span>
        <span className="category-str-list">
          {restaurant.categories.map(category => category.title).join(', ')}
        </span>
      </div>
    </a>
  );
};

YelpRestaurantInformation.propTypes = {
  restaurant: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  }),
};

export default YelpRestaurantInformation;
