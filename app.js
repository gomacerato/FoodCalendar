const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Recipe = require('./models/recipe');

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = "mongodb://127.0.0.1:27017/my_app_data"

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(3000))
    .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

// routes
app.get('/', (req, res) => {
    res.redirect('/recipes');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// recipe routes
app.get('/recipes/create', (req, res) => {
    res.render('create', { title: 'Create a new recipe' });
});

app.get('/recipes', (req, res) => {
    Recipe.find().sort({createdAt: -1})
        .then(result => {
            res.render('index', {recipes: result, title: 'All recipes'});
        })
        .catch(err => {
            console.log(err);
        });
});

app.post('/recipes', (req, res) => {
    const recipe = new Recipe(req.body);
    
    recipe.save()
        .then(result => {
            res.redirect('/recipes');
        })
        .catch(err => {
            console.log(err);
        });
});

app.get('/recipes/:id', (req, res) => {
    const id = req.params.id;
    Recipe.findById(id)
        .then(result => {
            res.render('details', {recipe: result, title: 'Recipe Details'});
        })
        .catch(err => {
            console.log(err);
        });
});

app.delete('recipes/:id', (req, res) => {
    const id = req.params.id;

    Recipe.findById(id)
        .then(result => {
            res.json({redirect: '/recipes'});
        })
        .catch(err => {
            console.log(err);
        })
});