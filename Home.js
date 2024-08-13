const api_url = "https://api.edamam.com/api/recipes/v2?type=public&app_id=d892684e&app_key=56901bab6e1988ad6ca75aabf25b2bda%09&imageSize=SMALL&random=true&field=label&field=image&field=url&field=ingredientLines&field=calories&field=yield";
const searchButton = document.getElementById("btn-search");
const outputElement = document.getElementById("display-recs");
const savedElement = document.getElementById("saved-sec");



fetch(api_url)
    .then(response =>{
        if(!response.ok){
            throw new Error("No response")
        }
        return response.json();
    })
    .then((data) =>{
        //console.log(data.hits[0].recipe);
        data.hits.forEach(data => {
            //console.log(recipe);
            
            outputElement.innerHTML +=   `
                                        <div class=recipes>    
                                        <h3>${data.recipe.label}</h3>
                                     <img src="${data.recipe.image}"></img>
                                     <p><b>Calories:</b> ${Math.round(data.recipe.calories)} </p>
                                     <p><b>Servings:</b> ${data.recipe.yield}</p>
                                     <p class=ingredients><b>Ingredients</b></p>
                                     <p>${data.recipe.ingredientLines}</p>
                                     <span><button><a href="${data.recipe.url}" target="_blank"><b>RECIPE</b></a></button></span> <span><button class=btn-save><b>SAVE</b></button></span>
                                     </div>`;
        });         
        
    })
    .catch(error =>{
        console.error("Error:", error)
    })

//search for a recipe
function searchRecipes(){
    const searchBar = document.getElementById("search-input");
    const input = searchBar.value;
    const search_url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=d892684e&app_key=56901bab6e1988ad6ca75aabf25b2bda%09&imageSize=SMALL&field=label&field=image&field=url&field=ingredientLines&field=calories&field=yield&q=${input}`;
    const outputElement = document.getElementById("display-recs");
    
    if(input !== ''){
    fetch(search_url)
    .then(response => response.json())
    .then(data =>{
        outputElement.innerHTML = '';
        data.hits.forEach(recipeData => {        
        outputElement.innerHTML +=   `
                                    <div class=recipes>    
                                    <h3>${recipeData.recipe.label}</h3>
                                 <img src="${recipeData.recipe.image}"></img>
                                 <p><b>Calories:</b> ${Math.round(recipeData.recipe.calories)} </p>
                                 <p><b>Servings:</b> ${recipeData.recipe.yield}</p>
                                 <p class=ingredients><b>Ingredients</b></p>
                                 <p>${recipeData.recipe.ingredientLines}</p>
                                 <span><button><a href="${recipeData.recipe.url}" target="_blank"><b>RECIPE</b></a></button></span> <span><button class=btn-save><b>SAVE</b></button></span>
                                 </div>`;

    })
})
.catch(error => {
    console.error("Error fetching recipes", error);
});
    } else {
        alert("Please enter a value")
    }
    
}


//save recipe
   