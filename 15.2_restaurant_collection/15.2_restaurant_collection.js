// Let's do some queries against the restaurant collection from the previous exercise:
// 1.Crud
// 1.1 – Write a MongoDB query to display all the documents in the restaurant collection.

db.restaurants.find({});

// 1.2 - Write a MongoDB query to display all restaurants that have a specific cuisine

db.restaurants.find({ cuisineType: "Italian" });

// 1.3 - Write a MongoDb query that displays only kosher restaurants

db.restaurants.find({ isKosherHalal: true });

// 1.4 - Write a MongoDb query that displays only specific cities restaurants

db.restaurants.find({ "address.city": { $in: ["New York", "Tokyo", "Barcelona"] } });

// 1.5 Write a MongoDb query to display a specific restaurants address

db.restaurants.find({ restaurantName: "Spice Haven" }, { "address": 1, _id: 0 });

// 1.6 - Write a MongoDB query to display specific restaurants coordinates

db.restaurants.find({ restaurantName: "Sushi Delight" }, { "address.coordinates": 1, _id: 0 });

// 1.7. - Write a MongoDB query that should display all restaurants in ascending order by restaurant
// name.

db.restaurants.find().sort({ restaurantName: 1 });

// 1.8 - Write a MongoDB query that should display all restaurants in ascending order by city
// names.

db.restaurants.find().sort({ "address.city": 1 });

// 1.9 - Update a specific restaurant's name

db.restaurants.update({ restaurantName: "Cuisine Paradise" }, { $set: { restaurantName: "New Name" } });

// 1.10 - Update a specific restaurant by adding a new review.

db.restaurants.update(
    { restaurantName: "Fusion Junction" },
    { $push: { reviews: { date: ISODate("2024-04-15"), score: 4 } } }
  );  

// 1.11 - Update all restaurants to be kosher

db.restaurants.update({}, { $set: { isKosherHalal: true } }, { multi: true });

// 1.12 - Delete a specific restaurant

db.restaurants.deleteOne({ restaurantName: "Mediterranean Breeze" });

// 1.13 - Delete all restaurants

db.restaurants.deleteMany({});

// 2. forEach Queries
// use the forEach cursor method to query the following:
// 2.1 - Write a MongoDB query to print all restaurant names.

db.restaurants.find({}, { restaurantName: 1, _id: 0 }).forEach(function(doc) {
    print(doc.restaurantName);
});

// 2.2 - Write a MongoDB query to print all restaurant cities

db.restaurants.find({}, { "address.city": 1, _id: 0 }).forEach(function(doc) {
    print(doc.address.city);
});

// 2.3 - Write a MongoDb query to print all restaurant coordinates

db.restaurants.find({}, { "address.coordinates": 1, _id: 0 }).forEach(function(doc) {
    printjson(doc.address.coordinates);
});

// 3. Advanced Queries
// 3.1 - Query for restaurant names that start with a specific alphabet

db.restaurants.find({ restaurantName: { $regex: /^S/i } });

// 3.2 - Query how many documents you have from the restaurant collection.

db.restaurants.find().count();

// 3.3 - Write a MongoDb query to get restaurants that include reviews from a specific date.

db.restaurants.find({ "reviews.date": ISODate("2022-06-30") });

// 4. Aggregation operations
// use the aggregation framework to query the following:
// 4.1- Write a mongoDb query to display all restaurants average score.

db.restaurants.aggregate([
    {
      $project: {
        restaurantName: 1,
        averageScore: { $avg: "$reviews.score" }
      }
    }
  ]);  

// 4.2 - Write a MongoDB query to display a specific restaurant average score

db.restaurants.aggregate([
    {
      $match: { restaurantName: "Cuisine Paradise" }
    },
    {
      $project: {
        restaurantName: 1,
        averageScore: { $avg: "$reviews.score" }
      }
    }
  ]);
  