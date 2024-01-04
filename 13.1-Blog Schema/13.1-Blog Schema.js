// Lets create a mongo database that holds blog posts.
// Users are able to create blog post’s and create
// comments on blog post.
// Part 1
// Design your Data Model
// 1. Create an appropriate schema for a blog.
// - What collections do you need?
// - How are you going to structure your documents?
// - Should you embed your data or use references?

// 1. Collections:

// Users:

// Store information about the users who create blog posts and comments. Each user document might include fields such as username, email, password, etc.
// BlogPosts:

// Store information about each blog post. Fields might include title, content, author (reference to a User), creationDate, tags, etc.
// Comments:

// Store information about each comment. Fields might include content, author (reference to a User), creationDate, post (reference to a BlogPost), etc.

// 2. Document Structure:

// Users Document: json

{
    "_id": ObjectId("user_id"),
    "username": "user123",
    "email": "user@example.com",
    "password": "hashed_password",
  }

//   BlogPosts Document: json

{
    "_id": ObjectId("post_id"),
    "title": "Sample Blog Post",
    "content": "Lorem ipsum...",
    "author": ObjectId("user_id"),
    "creationDate": ISODate("2024-01-03T12:00:00Z"),
    "tags": ["mongodb", "blogging", "nosql"],
  }

//   Comments Document: json

{
    "_id": ObjectId("comment_id"),
    "content": "Great post!",
    "author": ObjectId("user_id"),
    "creationDate": ISODate("2024-01-03T13:30:00Z"),
    "post": ObjectId("post_id"),
  }
  
//   3. Embedding or References:

//   Embedding:
//   if the number of comments is not expected to be very large.
//   References:
//   If large number of comments per post or if comments need to be queried independently.
  
  


  

