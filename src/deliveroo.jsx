import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import YelpApi from './yelp-api';
import YelpRestaurantInformation from './YelpRestaurantInformation';

YelpApi.setAuthenticationToken().then(() => {
  const location = $('.restaurant-index-page--title').text();

  $('.restaurant-index-page-tile').each(function addYelpInfo() {
    const restaurantName = $(this).find('.restaurant-index-page-tile--name').text();
    YelpApi.searchRestaurant(restaurantName, location)
    .then((data) => {
      const yelpContent = window.document.createElement('div');
      $(this).append(yelpContent);
      ReactDOM.render(<YelpRestaurantInformation restaurant={data.businesses[0]} />, yelpContent);
    })
    .catch((error) => {
      console.warn('An error has occured', error);
      const yelpContent = window.document.createElement('div');
      $(this).append(yelpContent);
      ReactDOM.render(<YelpRestaurantInformation />, yelpContent);
    });
  });
});
