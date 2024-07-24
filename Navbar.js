function myFunction(){
    var x = document.getElementById("myTopnav")
    if(x.className === "topnav"){
        x.className += "responsive";
    } else {
        x.className = "topnav";
    }
}

document.addEventListener("DOMContentLoaded",
    function(){
        const navItems = document.querySelectorAll("a");

        navItems.forEach(item => {
            item.addEventListener("click",function(){
                navItems.forEach(navItem => navItem.classList.remove("active"));
                this.classList.add("active");
            });
        });
    }
);