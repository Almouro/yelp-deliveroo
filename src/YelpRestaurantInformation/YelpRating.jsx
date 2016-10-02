import React, { PropTypes } from 'react';

const YelpRating = (props) => {
  const { rating } = props;
  const starsClassName = `${rating}`.replace('.5', '_half');

  return (
    <div className="rating-very-large">
      <i className={`star-img stars_${starsClassName}`} title={`${rating} star rating`} />
    </div>
  );
};

YelpRating.propTypes = {
  rating: PropTypes.number,
};

export default YelpRating;
