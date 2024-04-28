const express = require('express');
const cors = require('cors');
const session = require('express-session');
const dbService = require('./services/dbServices');
const blogRoutes = require("./routes/blogs");
const saveRoutes = require('./routes/save');
const userRoutes = require("./routes/users");
const likeRoutes = require('./routes/likes');
const commentRoutes = require('./routes/comments');
const subscribeRoutes = require('./routes/subscribe');
const mongoose = require("mongoose");
const { save } = require('./controllers/saveController');



const app = express();
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(session({
    secret : 'blogs',
    resave : false,
    saveUninitialized: true,
    cookie: {secure: false},
}))

app.use('/api/blogs',blogRoutes);
app.use('/api/users/',userRoutes);
app.use('/api/likes/',likeRoutes);
app.use('/api/comments/',commentRoutes);
app.use('/api/subscribes/',subscribeRoutes);
app.use('/api/save/',saveRoutes);

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017/blog')
    .then(() => {
        app.listen(5000, () => {
            console.log("Server is running on port 5000");
        });
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
    });