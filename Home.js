const api_url = "https://api.edamam.com/api/recipes/v2?type=public&app_id=d892684e&app_key=56901bab6e1988ad6ca75aabf25b2bda%09&imageSize=SMALL&random=true&field=label&field=image&field=url&field=ingredientLines&field=calories&field=yield&";
const outputElement = document.getElementById("display-recs");
//const recipe = document.querySelector("#display-recs")

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
            // let label = data.recipe.label;
            // let image = data.recipe.image;
            // let url = data.recipe.url;
            // let ingredientLines = data.recipe.ingredientLines;
            outputElement.innerHTML +=   `<p><b>${data.recipe.label}</b></p>
                                     <img src="${data.recipe.image}"></img>
                                     <p>Calories: ${Math.round(data.recipe.calories)} </p>
                                     <p>Servings: ${data.recipe.yield}</p>
                                     <button><a href="${data.recipe.url}" target="_blank">RECIPE</a></button>
                                     <p>${data.recipe.ingredientLines}</p>`;
        });         
        
    })
    .catch(error =>{
        console.error("Error:", error)
    })