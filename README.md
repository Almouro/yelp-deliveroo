# deliveroo-yelp

A Chrome extension to get Yelp info on restaurants on Deliveroo.com

![Yelp on Deliveroo](https://raw.githubusercontent.com/Almouro/yelp-deliveroo/master/deliveroo-yelp.png "Yelp on Deliveroo")

## Installation

First, you have to create a Yelp app to use their API.

Then, run
```
npm install
```

## Development

Run
```
npm start
```

The script is served through https so we have to make Chrome trust us.  
Open `https://localhost:3001/extension/index.js` in Chrome. You should see the **Your connection is not private** page, click **Advanced** and then **proceed**.

Now, open `chrome://extensions/` on Chrome.  
Click **Load unpacked extension**, and select the `extensions` folder.

Go to a Deliveroo page, say [this one](https://deliveroo.fr/fr/restaurants/paris/paris-10eme-gare-de-lest) and you should see Yelp ratings below every restaurant tile.

Now, whenever you change some code, you only have to reload the Deliveroo page to see your changes.

## Build the production extension

```
npm run production
```
