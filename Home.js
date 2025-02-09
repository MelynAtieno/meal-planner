const api_url = "https://api.edamam.com/api/recipes/v2?type=public&app_id=d892684e&app_key=56901bab6e1988ad6ca75aabf25b2bda%09&imageSize=SMALL&random=true&field=label&field=image&field=url&field=ingredientLines&field=calories&field=yield";
const searchButton = document.getElementById("btn-search");
const outputElement = document.getElementById("display-recs");
const savedOutput = document.getElementById("saved-sec");



fetch(api_url)
    .then(response => {
        if(!response.ok){
            throw new Error("No response")
        }
        return response.json();
    })
    .then((data) =>{
        //console.log(data);
        //outputElement.innerHTML = "";
        data.hits.forEach((recipeData, index) => {
            const recipe = recipeData.recipe;
            //console.log(index, recipe.url)
            outputElement.innerHTML +=   `
                                        <div class="recipes">    
                                        <h3>${recipe.label}</h3>
                                     <img src="${recipe.image}"></img>
                                     <p><b>Calories:</b> ${Math.round(recipe.calories)} </p>
                                     <p><b>Servings:</b> ${recipe.yield}</p>
                                     <p class=ingredients><b>Ingredients</b></p>
                                     <p>${recipe.ingredientLines}</p>
                                     <span><button><a href="${recipe.url}" target="_blank"><b>RECIPE</b></a></button></span> 
                                     <span><button class="btn-save" data-index="${index}">SAVE</button></span>
                                     </div>`;
            //console.log("data-index", index);
        });
        document.querySelectorAll(".btn-save").forEach((btn) => {
            btn.addEventListener("click", (event) => {
                const index = parseInt(event.target.getAttribute("data-index"));
               // console.log("Button clicked with index:", index);
                
                if (index >= 0 && index < data.hits.length){
                    const recipe = data.hits[index].recipe;
                    //console.log("saving recipe:", recipe.url);

                    if(recipe){
                        if(!recipe.url){
                            console.error("recipe has no url")
                            return;
                        }
                        saveRecipe(recipe);
                    } else {
                        console.error("Undefined recipe:", recipe);
                    }
                
                }
            });
        });       
        
    })
    .catch(error => {
        console.error("Error:", error)
    });

//search for a recipe
function searchRecipes(){
    const searchBar = document.getElementById("search-input");
    const input = searchBar.value;
    const search_url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=d892684e&app_key=56901bab6e1988ad6ca75aabf25b2bda%09&imageSize=SMALL&field=label&field=image&field=url&field=ingredientLines&field=calories&field=yield&q=${input}`;
    const outputElement = document.getElementById("display-recs");
    
    if(input !== ''){
    fetch(search_url)
    .then(response => response.json())
    .then((data) =>{
        outputElement.innerHTML = '';
        data.hits.forEach((recipeData, index) => { 
        const recipe = recipeData.recipe;       
        outputElement.innerHTML +=   `
                                    <div class=recipes>    
                                    <h3>${recipe.label}</h3>
                                 <img src="${recipe.image}"></img>
                                 <p><b>Calories:</b> ${Math.round(recipe.calories)} </p>
                                 <p><b>Servings:</b> ${recipe.yield}</p>
                                 <p class=ingredients><b>Ingredients</b></p>
                                 <p>${recipe.ingredientLines}</p>
                                 <span><button><a href="${recipe.url}" target="_blank"><b>RECIPE</b></a></button></span> <span><button class=btn-save data-index="${index}">SAVE</button></span>
                                 </div>`;

    })
    document.querySelectorAll(".btn-save").forEach((btn) => {
        btn.addEventListener("click", (event) => {
            const index = parseInt(event.target.getAttribute("data-index"));
           // console.log("Button clicked with index:", index);
            
            if (index >= 0 && index < data.hits.length){
                const recipe = data.hits[index].recipe;
                //console.log("saving recipe:", recipe.url);

                if(recipe){
                    if(!recipe.url){
                        console.error("recipe has no url")
                        return;
                    }
                    saveRecipe(recipe);
                } else {
                    console.error("Undefined recipe:", recipe);
                }
            
            }
        });
    });       
})
.catch(error => {
    console.error("Error fetching recipes", error);
});
    } else {
        alert("Please enter a value")
    }
    
}

//save recipe
function saveRecipe(recipe){
    console.log("save recipe function:",recipe.url)
    
    let savedRecipes= JSON.parse(localStorage.getItem('saved-recipes')) || [];

    console.log("saved recipes before check:", savedRecipes);

    if(!Array.isArray(savedRecipes)){
        console.error("saved recipes is not an array")
        savedRecipes = [];
    }

    const isRecipeSaved = savedRecipes.some(saved => saved.url === recipe.url);

    //check if the recipe is saved
    if(!isRecipeSaved){
        savedRecipes.push(recipe);
        localStorage.setItem("saved-recipes", JSON.stringify(savedRecipes));
        alert("Recipe saved successfully!")
    } else {
        alert("Recipe is already saved!")
    }  
    

}

// load saved recipes
function getSavedRecipes(){
    return JSON.parse(localStorage.getItem('saved-recipes')) || [];
}

function displaySavedRecipes(){
    const savedOutput = document.getElementById("saved-sec");
    const savedRecipes = getSavedRecipes();
    
    savedOutput.innerHTML = "";
    savedRecipes.forEach(recipe => {
        savedOutput.innerHTML +=   `
            <div class="recipes">    
            <h3>${recipe.label}</h3>
            <img src="${recipe.image}"></img>
            <p><b>Calories:</b> ${Math.round(recipe.calories)} </p>
            <p><b>Servings:</b> ${recipe.yield}</p>
            <p class=ingredients><b>Ingredients</b></p>
            <p>${recipe.ingredientLines}</p>
            <span><button><a href="${recipe.url}" target="_blank"><b>RECIPE</b></a></button></span>
            <span><button class="btn-remove" onclick="removeRecipe('${recipe.url}')"><b>REMOVE</b></button></span>
            </div>`;

    });
}

//Remove saved recipe
function removeRecipe(recipeUrl){
    let savedRecipes = getSavedRecipes();
    savedRecipes = savedRecipes.filter(recipe => recipe.url !== recipeUrl);
    localStorage.setItem('saved-recipes', JSON.stringify(savedRecipes));
    displaySavedRecipes();  

}
