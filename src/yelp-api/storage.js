const baseKey = 'yelp-deliveroo__';

export default class Storage {
  static set(key, value) {
    window.localStorage.setItem(`${baseKey}${key}`, JSON.stringify(value));
  }

  static get(key) {
    const value = window.localStorage.getItem(`${baseKey}${key}`);

    return value === undefined || value === 'undefined' ? undefined : JSON.parse(value);
  }

  static remove(key) {
    return window.localStorage.removeItem(`${baseKey}${key}`);
  }
}
