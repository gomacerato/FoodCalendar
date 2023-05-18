function showRecipeItem(listNumber){
    const listItem = document.getElementById(listNumber);
    // Select the inner elements within the list item
    const image = listItem.querySelector('img.imageSize');
    const title = listItem.querySelector('h5.titleS');
    const description = listItem.querySelector('p.descriptionS');
    const viewRecipeLink = listItem.querySelector('a.btn-primary');

    // Access the innerHTML or attributes of the selected elements
    const imageSrc = image.src;
    const titleText = title.innerText;
    const descriptionText = description.innerText;
    const viewRecipeLinkHref = viewRecipeLink.href;

    // Do something with the selected elements and their values
    // For example, update the recipe page with the retrieved details
    document.getElementById('recipeImage').src = imageSrc;
    document.getElementById('titleText').innerText = titleText;
    document.getElementById('descriptionText').innerText = descriptionText;
    document.getElementById('viewRecipeLink').href = viewRecipeLinkHref;
}