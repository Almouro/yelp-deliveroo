import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import YelpApi from './yelp-api';
import YelpRestaurantInformation from './YelpRestaurantInformation';

const getLocation = () => {
  const urlSplit = window.location.pathname.split('/');
  return urlSplit[urlSplit.length - 1];
};

YelpApi.setAuthenticationToken().then(() => {
  $('.restaurant-index-page-tile').each(function addYelpInfo() {
    const restaurantName = $(this).find('h3').text();
    YelpApi.searchRestaurant(restaurantName, getLocation())
    .then((restaurant) => {
      if (!restaurant || restaurant.rating < 4) {
        $(this).remove();
        return;
      }
      const yelpContent = window.document.createElement('div');
      $(this).append(yelpContent);
      ReactDOM.render(<YelpRestaurantInformation restaurant={restaurant} />, yelpContent);
    });
  });
});
