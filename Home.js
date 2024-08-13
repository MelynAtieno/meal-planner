const api_url = "https://api.edamam.com/api/recipes/v2?type=public&app_id=d892684e&app_key=56901bab6e1988ad6ca75aabf25b2bda%09&imageSize=SMALL&random=true&field=label&field=image&field=url&field=ingredientLines&field=calories&field=yield";
const outputElement = document.getElementById("display-recs");
const savedElement = document.getElementById("saved-sec");
const searchBar = document.getElementById("searchBar");
const searchButton = document.getElementById("btn-search")

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
   // e.preventDefault();
    if(searchBar.value !== ''){
    fetch(`https://api.edamam.com/api/recipes/v2?type=public&app_id=d892684e&app_key=56901bab6e1988ad6ca75aabf25b2bda%09&imageSize=SMALL&field=label&field=image&field=url&field=ingredientLines&field=calories&field=yield&q=${searchBar.value}`)
    .then(response => response.json())
    .then(data =>{data.hits.forEach(data => {        
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

    })
})
    } else {
        alert("Please enter a value")
    }
}


//save recipe
    $(document).on("click", ".btn-save", function(e){
        e.preventDefault();

    
    let savedRecipes = outputElement.value;
    localStorage.setItem("recipes", savedRecipes);
    displayData();
});
    function displayData(){
    const savedData = localStorage.getItem("recipes");
    savedElement.innerHTML = savedData;
 }
    displayData();


