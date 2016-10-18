import 'whatwg-fetch';
import qs from 'qs';
import Storage from './storage';
import config from './config.json';

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

const parseJson = response => response.json();

const query = (url) => {
  const storageKey = `yelp_api.${url}`;
  const storedValue = Storage.get(storageKey);

  if (storedValue) return Promise.resolve(storedValue);

  return fetch(`https://${config}/api.yelp.com:443/v3${url}`, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer INSERT_ACCESS_TOKEN_HERE',
    },
  })
  .then(checkStatus)
  .then(parseJson)
  .then((data) => {
    Storage.set(storageKey, data);
    return data;
  })
  .catch(() => {
    // console.log('request failed', error);
  });
};

const search = parameters =>
  query(`/businesses/search?${qs.stringify(parameters)}`);

export default {
  searchRestaurant: name => search({
    term: name,
    location: 'Paris',
    categories: 'restaurants',
  }),
};
