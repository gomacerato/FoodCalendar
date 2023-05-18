const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Recipe = require('./models/recipe');
const controller = require('./controllers/user-controllers');
const multer = require('multer');
const Image = require('./models/image');
// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = "mongodb://127.0.0.1:27017/my_app_data"

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(3000), console.log(`Listening on port 3000`))
    .catch(err => console.log(err));

// register view engine
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

// storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename:(req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now());
    },
});

const upload = multer({storage: storage});
app.get('/create', (req, res) => {
    Image.find({})
    .then((data, err)=>{
        if(err){
            console.log(err);
        }
        res.render('imagepage',{items: data})
    })
})

app.post('/create', upload.single('image'), (req, res, next) => {
 
    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    Image.create(obj)
    .then ((err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            res.redirect('/');
        }
    });
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

app.get('/', controller.getIndex);
app.get('/login', controller.getLogin);
app.get('/register', controller.getRegister);

app.post('/login', controller.postLogin);
app.post('/register', controller.postRegister);

app.post('/logout', controller.postLogout);