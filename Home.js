const api_url = "https://api.edamam.com/api/recipes/v2?type=public&app_id=d892684e&app_key=56901bab6e1988ad6ca75aabf25b2bda%09&imageSize=SMALL&random=true&field=label&field=image&field=url&field=ingredientLines&field=calories&field=yield&";
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
                                     <button><a href="${data.recipe.url}" target="_blank"><b>RECIPE</b></a></button>
                                     <p>${data.recipe.ingredientLines}</p>
                                     <button class=btn-save><b>SAVE</b></button>
                                     </div>`;
        });         
        
    })
    .catch(error =>{
        console.error("Error:", error)
    })

//search for a recipe


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


