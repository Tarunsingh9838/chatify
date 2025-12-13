const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')

const Blog = require('./models/blog');

const userRouter = require('./routes/user');
const blogRoute = require('./routes/blog');

const { checkForAuthenticationCookie } = require('./middlewares/authentication');

const app = express();
const port = 8000;

mongoose.connect('mongodb://localhost:27017/blogify')
    .then(() => console.log("Connected to MongoDB"));

app.set('view engine', 'ejs');
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

// ⭐ Make user available in ALL EJS views
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

app.get("/", async (req, res) => {
    const allBlogs = await Blog.find({});
    res.render("home",{
        user: req.user,
        blogs: allBlogs,
    });
});

app.use("/user", userRouter);
app.use("/blog", blogRoute);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
