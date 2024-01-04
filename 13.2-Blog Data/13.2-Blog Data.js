const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017';

// Database Name
const dbName = 'blog_database';

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to the MongoDB server
client.connect((err) => {
    if (err) {
        console.error('Error connecting to MongoDB:', err);
        return;
    }

    console.log('Connected to MongoDB');

    // Access or create collections
    const db = client.db(dbName);
    const usersCollection = db.collection('users');
    const blogPostsCollection = db.collection('blog_posts');
    const commentsCollection = db.collection('comments');

    // Find a user and a blog post
    usersCollection.findOne({}, (err, user) => {
        if (err) {
            console.error('Error finding user:', err);
            return;
        }

        blogPostsCollection.findOne({}, (err, blogPost) => {
            if (err) {
                console.error('Error finding blog post:', err);
                return;
            }

            if (!user || !blogPost) {
                console.error('User or blog post not found. Please create at least one user and one blog post first.');
                client.close();
                return;
            }

            // Insert a comment on the blog post
            const commentData = {
                content: 'Great post!',
                author: user._id,
                creationDate: new Date(),
                post: blogPost._id,
            };

            commentsCollection.insertOne(commentData, (err, result) => {
                if (err) {
                    console.error('Error inserting comment:', err);
                    return;
                }

                console.log(`${result.insertedCount} comment inserted.`);

                // Close the connection when done
                client.close();
            });
        });
    });
});

