console.log(localStorage.getItem("loggedin"));
console.log(localStorage.getItem("user"));
// if(localStorage.getItem("loggedin") !== true){
//     console.log("Not logged in!");
//     throw new Error("User is not logged in!");
// }

let userName = localStorage.getItem("user");


document.getElementById("welcome").innerHTML = "Willkommen " + userName + "!";






