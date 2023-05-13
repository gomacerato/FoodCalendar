const form = document.getElementById('addRecipeForm');
const recipeCards = document.getElementById('recipeCards');

form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form from submitting normally

  // Get the values of the form fields
  const recipeName = document.getElementById('recipeName').value;
  const recipeIngredients = document.getElementById('recipeIngredients').value;
  const recipeInstructions = document.getElementById('recipeInstructions').value;

  // Create a new recipe card
  const card = document.createElement('div');
  card.classList.add('card');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const cardTitle = document.createElement('h5');
  cardTitle.classList.add('card-title');
  cardTitle.textContent = recipeName;

  const cardIngredients = document.createElement('p');
  cardIngredients.classList.add('card-text');
  cardIngredients.textContent = recipeIngredients;

  const cardInstructions = document.createElement('p');
  cardInstructions.classList.add('card-text');
  cardInstructions.textContent = recipeInstructions;

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardIngredients);
  cardBody.appendChild(cardInstructions);

  card.appendChild(cardBody);

  recipeCards.appendChild(card);

  // Reset the form fields
  form.reset();
});