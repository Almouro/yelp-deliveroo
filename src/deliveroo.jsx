import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import YelpApi from './yelp-api';
import YelpRestaurantInformation from './YelpRestaurantInformation';

YelpApi.setAuthenticationToken().then(() => {
  const location = $('.restaurant-index-page--title').text();

  $('.restaurant-index-page-tile').each(function addYelpInfo() {
    const restaurantName = $(this).find('h3').text();
    YelpApi.searchRestaurant(restaurantName, location)
    .then((restaurant) => {
      const yelpContent = window.document.createElement('div');
      $(this).append(yelpContent);
      ReactDOM.render(<YelpRestaurantInformation restaurant={restaurant} />, yelpContent);
    });
  });
});
