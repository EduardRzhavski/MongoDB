// Node JS – Restaurant collection
// Instructions
// Create a database called findMyRestaurant
// Create a collection called restaurants
// inside the collection create at least 5 restaurant
// documents that include the following:
// restaurant name
// a sub-document called to address that includes:
// a city
// a street
// An array of coordinates e.g. [-77,564, 40.677]
// a type of cuisine
// a boolean if it is Kosher/Halal or not
// An array of at least 3 reviews that include:
// a date
// an integer score

// Create the database
use findMyRestaurant;

// Create the collection 'restaurants' and insert documents
db.restaurants.insertMany([
  {
    restaurantName: "Cuisine Paradise",
    address: {
      city: "New York",
      street: "123 Main Street",
      coordinates: [-77.564, 40.677],
    },
    cuisineType: "Italian",
    isKosherHalal: false,
    reviews: [
      { date: ISODate("2023-01-01"), score: 4 },
      { date: ISODate("2023-02-15"), score: 5 },
      { date: ISODate("2023-03-20"), score: 3 },
    ],
  },
  {
    restaurantName: "Spice Haven",
    address: {
      city: "Los Angeles",
      street: "456 Oak Avenue",
      coordinates: [-118.243, 34.052],
    },
    cuisineType: "Indian",
    isKosherHalal: true,
    reviews: [
      { date: ISODate("2023-04-10"), score: 4 },
      { date: ISODate("2023-05-25"), score: 5 },
      { date: ISODate("2023-06-30"), score: 4 },
    ],
  },
  {
    restaurantName: "Sushi Delight",
    address: {
      city: "Tokyo",
      street: "789 Sakura Lane",
      coordinates: [139.691, 35.689],
    },
    cuisineType: "Japanese",
    isKosherHalal: false,
    reviews: [
      { date: ISODate("2023-07-15"), score: 5 },
      { date: ISODate("2023-08-20"), score: 4 },
      { date: ISODate("2023-09-05"), score: 3 },
    ],
  },
  {
    restaurantName: "Mediterranean Breeze",
    address: {
      city: "Barcelona",
      street: "101 Seafront Drive",
      coordinates: [2.173, 41.385],
    },
    cuisineType: "Mediterranean",
    isKosherHalal: true,
    reviews: [
      { date: ISODate("2023-10-10"), score: 4 },
      { date: ISODate("2023-11-15"), score: 5 },
      { date: ISODate("2023-12-20"), score: 4 },
    ],
  },
  {
    restaurantName: "Fusion Junction",
    address: {
      city: "Sydney",
      street: "555 Crossroads Avenue",
      coordinates: [151.209, -33.868],
    },
    cuisineType: "Fusion",
    isKosherHalal: false,
    reviews: [
      { date: ISODate("2024-01-01"), score: 5 },
      { date: ISODate("2024-02-15"), score: 4 },
      { date: ISODate("2024-03-20"), score: 3 },
    ],
  },
]);

// To test your data against our queries do the following:
// Only 3 different city names
// Only 3 different types of cuisine
// Give different dates for your reviews.

// Drop the existing 'restaurants' collection
db.restaurants.drop();

// Insert modified documents with 3 different city names, 3 different types of cuisine, and different dates for reviews
db.restaurants.insertMany([
  {
    restaurantName: "Cuisine Paradise",
    address: {
      city: "New York",
      street: "123 Main Street",
      coordinates: [-77.564, 40.677],
    },
    cuisineType: "Italian",
    isKosherHalal: false,
    reviews: [
      { date: ISODate("2022-01-01"), score: 4 },
      { date: ISODate("2022-02-15"), score: 5 },
      { date: ISODate("2022-03-20"), score: 3 },
    ],
  },
  {
    restaurantName: "Spice Haven",
    address: {
      city: "Los Angeles",
      street: "456 Oak Avenue",
      coordinates: [-118.243, 34.052],
    },
    cuisineType: "Indian",
    isKosherHalal: true,
    reviews: [
      { date: ISODate("2022-04-10"), score: 4 },
      { date: ISODate("2022-05-25"), score: 5 },
      { date: ISODate("2022-06-30"), score: 4 },
    ],
  },
  {
    restaurantName: "Sushi Delight",
    address: {
      city: "Tokyo",
      street: "789 Sakura Lane",
      coordinates: [139.691, 35.689],
    },
    cuisineType: "Japanese",
    isKosherHalal: false,
    reviews: [
      { date: ISODate("2022-07-15"), score: 5 },
      { date: ISODate("2022-08-20"), score: 4 },
      { date: ISODate("2022-09-05"), score: 3 },
    ],
  },
  {
    restaurantName: "Mediterranean Breeze",
    address: {
      city: "Barcelona",
      street: "101 Seafront Drive",
      coordinates: [2.173, 41.385],
    },
    cuisineType: "Mediterranean",
    isKosherHalal: true,
    reviews: [
      { date: ISODate("2022-10-10"), score: 4 },
      { date: ISODate("2022-11-15"), score: 5 },
      { date: ISODate("2022-12-20"), score: 4 },
    ],
  },
  {
    restaurantName: "Fusion Junction",
    address: {
      city: "Sydney",
      street: "555 Crossroads Avenue",
      coordinates: [151.209, -33.868],
    },
    cuisineType: "Fusion",
    isKosherHalal: false,
    reviews: [
      { date: ISODate("2023-01-01"), score: 5 },
      { date: ISODate("2023-02-15"), score: 4 },
      { date: ISODate("2023-03-20"), score: 3 },
    ],
  },
]);
