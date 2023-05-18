//Express server
const express = require('express');
const app = express();
const port = 3000;

//Registration route
const bodyParser = require('body-parser');
const User = require('./User');

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/register', async (req, res) => {
	
	try {
		const { name, email, password } = req.body;
		
		// Check if the email is already registered
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: 'Email is already registered' });
		}
		
		// Create a new user
		const newUser = new User({ name, email, password });
		
		// Save the user to the database
		await newUser.save();
		
		res.status(201).json({ message: 'User registered successfully' });
		} catch (err) {
			console.error('Error registering user:', err);
			res.status(500).json({ message: 'An error occurred' });
		}
});

//Login route

const bcrypt = require('bcrypt');

app.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		
		// Find the user by email
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}
		
		// Compare the password
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}
		
		// Authentication successful
		req.session.userId = user._id; // Store the user ID in the session
		
		res.status(200).json({ message: 'Logged in successfully' });
	  } catch (err) {
			console.error('Error logging in:', err);
			res.status(500).json({ message: 'An error occurred' });
		}
});

//Middleware function
const requireAuth = (req, res, next) => {
	if (!req.session.userId) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
	next();
};
app.get('/protected', requireAuth, (req, res) => {
	res.status(200).json({ message: 'Protected route accessed successfully' });
});

//Logout Function
app.post('/logout', (req, res) => {
	req.session.destroy(); // Destroy the session
	res.status(200).json({ message: 'Logged out successfully' });
});

//Create Recipe route
app.post('/recipes', requireAuth, async (req, res) => {
	try {
		const { recipeName, recipeIngredients, recipeInstructions } = req.body;

		// Create a new recipe
		const newRecipe = new Recipe({
			recipeName,
			recipeIngredients,
			recipeInstructions,
		});

		// Save the recipe to the database
		await newRecipe.save();
		res.status(201).json({ message: 'Recipe created successfully' });
	  } catch (err) {
			console.error('Error creating recipe:', err);
			res.status(500).json({ message: 'An error occurred' });
	  }
});

//MongoDB connection
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017>', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(() => {
	console.log('Connected to MongoDB');
}).catch((err) => {
	console.error('Error connecting to MongoDB:', err);
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});