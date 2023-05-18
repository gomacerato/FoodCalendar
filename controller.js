const form = document.querySelector('#recipeForm');
const inputTitle = document.querySelector('#recipeTitle');
const inputDescrip = document.querySelector('#recipeDescription');
const recipeList = document.querySelector('#recipeCards');


var listStart = 7;
function createLi(start){
    const li = document.createElement('li');
    li.className = "cardStyle";
    li.id = `li${start}`;
    const outerDiv = document.createElement('div');
    outerDiv.className= "container";
    const image = document.createElement('img');
    image.className="imageSize";
    image.src = "assets/Spaghetti-Bolognese.jpeg";
    const title = document.createElement('h5');
    title.className = "titleS";
    title.textContent = inputTitle.value;
    const description = document.createElement('p');
    description.className = "descriptionS";
    description.textContent = inputDescrip.value;
    const a = document.createElement('a');
    a.textContent = "View Recipe";
    a.href="recipePage.html";
    a.className="btn btn-primary";
    a.onclick=showRecipeItem(`li${listStart}`);
    li.appendChild(outerDiv);
    outerDiv.appendChild(image);
    outerDiv.appendChild(title);
    outerDiv.appendChild(description);
    outerDiv.appendChild(a);

    return li;
    
}

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    const li = createLi(listStart);
    recipeList.appendChild(li);
    listStart = listStart + 1;
});

