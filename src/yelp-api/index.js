import 'whatwg-fetch';
import qs from 'qs';
import Storage from './storage';
import config from './config.json';

const checkNamesCorrespond = require('./checkNamesCorrespond');

const YELP_BASE_URL = `https://${config.CORS_ANYWHERE_URL}/api.yelp.com:443`;
const AUTHENTICATION_TOKEN_STORAGE_KEY = 'token';

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

const parseJson = response => response.json();

const setAuthenticationToken = () => {
  const form = new FormData();
  form.append('grant_type', 'client_credentials');
  form.append('client_id', config.YELP_APP_ID);
  form.append('client_secret', config.YELP_APP_SECRET);

  return fetch(`${YELP_BASE_URL}/oauth2/token`, {
    method: 'POST',
    body: form,
  })
  .then(checkStatus)
  .then(parseJson)
  .then((data) => {
    Storage.set(AUTHENTICATION_TOKEN_STORAGE_KEY, data);
    return data;
  })
  .catch((error) => {
    console.log('request failed', error);
  });
};

const nowTimestamp = new Date().getTime();

const query = (url) => {
  const storageKey = `yelp_api.${url}`;
  const storedValue = Storage.get(storageKey);

  if (storedValue && nowTimestamp < storedValue.cacheExpirationTimestamp) {
    return Promise.resolve(storedValue.data);
  }

  return fetch(`${YELP_BASE_URL}/v3${url}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${Storage.get(AUTHENTICATION_TOKEN_STORAGE_KEY).access_token}`,
    },
  })
  .then(checkStatus)
  .then(parseJson)
  .then((data) => {
    Storage.set(storageKey, {
      data,
      cacheExpirationTimestamp: nowTimestamp + (24 * 3600 * 1000),
    });
    return data;
  });
};

const search = parameters =>
  query(`/businesses/search?${qs.stringify(parameters)}`);

export default {
  searchRestaurant: (name, location) => search({
    term: name,
    location,
    categories: 'restaurants',
  }).then((data) => {
    if (!data.businesses || !data.businesses.length) return null;

    const restaurant = data.businesses[0];

    return checkNamesCorrespond(name, restaurant.name) ? restaurant : null;
  }).catch((error) => {
    console.warn('An error has occured', error);
    return null;
  }),
  setAuthenticationToken,
};
