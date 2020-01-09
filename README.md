# Parky

## Overview

Parky is a full-stack web application that allows users to search, list, and rent private parking spaces.

> Deployed Link: [See Here](https://parky-app.herokuapp.com/)

> Repository: [See Here](https://github.com/Abraval/Parky)

## Getting Started

Create an account, or use our demo accounts:

> "Power User"
> Username: user
> Password: test

> "Listing Owner"
> Username: owner
> Password: test

### Login

Users can login using their account information or sign up for a new account by clicking the link.

<img src="/assets/login.png" width="600">

### Search

After logging in, users are redirected to the Search page where users can search for parking spots available for rent by location and date. Users can also complete bookings from this page via the "Book Now" buttons in the search results.

<img src="/assets/search.png" width="600">

### Create Listing

Users can create listings for their own parking spots under the "Create" section of the application. This is done through a stepper component where users are guided through submitting listing details, choosing availability, and confirming the new listing.

<img src="/assets/create.png" width="600">

### Dashboard

<img src="/assets/reserv.png" width="600">

The profile dashboard offers two views: Listings and Reservations.

The Listings view allows users to see all of their active listings as well as edit availability & details, see earnings from listings, and remove listings from the app.

The reservation view allows users to see all upcoming reservations on parking spots with the ability to cancel reservations entirely or partially (for multi-day reservations).

## Technologies Used

- React
- Express
- Node.js
- Mongo DB
- JavaScript
- Mongoose
- Passport.js

### Node Packages used:

- Mongoose
- DotEnv
- Material UI
- Axios
- Moment.js

## Authors:

- Ana Chernov - https://github.com/purpetrator
- Chris Gottshalk - https://github.com/cgottshalkjr
- Tomas Gear - https://github.com/nexio-t
- Valentyna Abraimova - https://github.com/Abraval
