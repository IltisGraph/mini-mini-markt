console.log(localStorage.getItem("loggedin"));
console.log(localStorage.getItem("user"));
console.log(Object.keys(localStorage));
if(!localStorage.getItem("loggedin") === "true"){
    console.log("Not logged in!");
    throw new Error("User is not logged in!");
}




document.getElementById("welcome").innerHTML = localStorage.getItem("user");




