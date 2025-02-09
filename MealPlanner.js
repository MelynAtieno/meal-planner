let inputs = document.querySelector('input');
let btn = document.querySelector('button');
let mealPlan = document.getElementById('meal_plan');
let meal = [];
let localstoragedata = localStorage.getItem('meal array')

if (localstoragedata != null){
    let mealdata = JSON.parse(localstoragedata);
    meal = mealdata;
    makemealplan();
}

btn.addEventListener("click", function() {
    let query = inputs.value;
    inputs.value = "";
    if (query.trim() === ""){
        alert("Please enter a value");
        throw new Error("Empty input field")
    }

    let mealObj = {
        id: Date.now(),
        text: query
    }
    meal.push(mealObj);
    localStorage.setItem("meal array", JSON.stringify(meal));
    makemealplan();
});

function makemealplan() {
    mealPlan.innerHTML = "";
    for(let i = 0; i < meal.length; i++){
        let{id, text} = meal[i];
        let element = document.createElement('div');
        element.innerHTML = `
            <span class="meal" contenteditable="false">${text}</span>
            <button class= "meal_edit"> EDIT </button>
            <button class="meal_delete"> DELETE </button>
        `;
        let delbtn = element.querySelector('.meal_delete');
        let editbtn = element.querySelector('.meal_edit');
        let mealText = element.querySelector('.meal');

        // delete meal
        delbtn.addEventListener("click", function(){
            let filteredarray = meal.filter(function(mealobj) {
                return mealobj.id != id;
            });
            meal = filteredarray;
            localStorage.setItem("meal array", JSON.stringify(meal));
            mealPlan.removeChild(element);
        });

        // edit meal
        editbtn.addEventListener("click", function() {
            if (editbtn.innerText === 'EDIT') {
                mealText.setAttribute('contenteditable', 'true'); // Enable editing
                mealText.focus(); // Focus on the text to start editing
                editbtn.innerText = 'SAVE'; // Change button text to 'Save'
            } else {
                mealText.setAttribute('contenteditable', 'false'); // Disable editing
                let updatedText = mealText.innerText.trim();
                if (updatedText !== "") {
                    meal = meal.map(function(mealobj) {
                        if (mealobj.id === id) {
                            mealobj.text = updatedText;
                        }
                        return mealobj;
                    });
                    localStorage.setItem("meal array", JSON.stringify(meal));
                }
                editbtn.innerText = 'EDIT'; // Change button text back to 'Edit'
            }
        });
        element.classList.add('toEat');
        mealPlan.appendChild(element);
    }
}