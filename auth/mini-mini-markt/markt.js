console.log(localStorage.getItem("loggedin"));
console.log(localStorage.getItem("user"));
console.log(localStorage.getItem("loggedin") == "false" || localStorage.getItem("user") == "null");
if (localStorage.getItem("loggedin") == 'false' || localStorage.getItem("user") == 'null') {
  console.log("Not logged in!");
  window.location.href = "https://iltisgraph.github.io/mini-mini-markt/";
  throw new Error("User is not logged in!");
}

import { getDatabase, ref, child, get, set } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyD0X_femAURn9g2LMP99dV13WaXU22W0ks",
  authDomain: "mini-mini-markt.firebaseapp.com",
  projectId: "mini-mini-markt",
  storageBucket: "mini-mini-markt.appspot.com",
  messagingSenderId: "1001531893883",
  appId: "1:1001531893883:web:deabd99888ce9acdb91ade",
  measurementId: "G-QPY0DW5MJ4",
  databaseURL: "https://mini-mini-markt-default-rtdb.europe-west1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

let items;

const dbr = ref(getDatabase());
get(child(dbr, `items`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
    items = snapshot.val();
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

let userName = localStorage.getItem("user");


document.getElementById("welcome").innerHTML = "Willkommen " + userName + "!";


//load the items in

// document.getElementById("main").innerHTML = ""


// Get the target div element
const targetDiv = document.querySelector('#main');

// Create three item boxes with different names and images
for (let i = 1; i <= 8; i++) {
  // Create a new item box element
  const itemBox = document.createElement('div');
  itemBox.classList.add('itemBox');

  // Create a new link element
  const link = document.createElement('a');
  link.onclick = function () {
    console.log("Clicked: " + i);
    sessionStorage.setItem("selected", i);
    console.log("finished!");
  }
  link.href = 'view.html';

  // Create a new item picture element
  const itemPicture = document.createElement('div');
  itemPicture.classList.add('itemPicture');

  // Create a new image element
  const image = document.createElement('img');
  image.classList.add('itemImage');
  image.src = `./img/(${i}).jpg`;
  itemPicture.appendChild(image);

  // Create a new item description element
  const itemDescription = document.createElement('div');
  itemDescription.classList.add('ItemDescription');

  // Create a new h2 element for the item name
  const itemName = document.createElement('h2');
  itemName.textContent = `Name ${i}`;
  itemDescription.appendChild(itemName);

  // Create a new p element for the item price
  const itemPrice = document.createElement('p');
  itemPrice.classList.add('itemPreis');
  itemPrice.textContent = 'Preis: 1,23€/100g';
  itemDescription.appendChild(itemPrice);

  // Create a new p element for the item slogan
  const itemSlogan = document.createElement('p');
  itemSlogan.classList.add('itemWerbeSatz');
  itemSlogan.textContent = 'Immer! Sehr! Lecker!';
  itemDescription.appendChild(itemSlogan);

  // Append the link, item picture and item description to the item box
  link.appendChild(itemPicture);
  link.appendChild(itemDescription);
  itemBox.appendChild(link);

  // Append the item box to the target div
  targetDiv.appendChild(itemBox);
}


// const aElement = document.querySelector('.itemBox a');
// aElement.addEventListener('click', function() {
//   // Your code here
//   window.alert("It worked!");
// });




document.getElementById("logoutbutton").onclick = function () {
  localStorage.setItem("loggedin", false);
  localStorage.removeItem("user");
  window.location.href = "https://iltisgraph.github.io/mini-mini-markt/";
}

document.getElementById("boughtbutton").onclick = function () {
  window.location.href = "warenkorb.html";

}



//check if the user is an admin and add the admin control panel if needed;

const dbRef = ref(getDatabase());
get(child(dbRef, `logins/${localStorage.getItem("user")}`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val()["rank"]);
    if (snapshot.val()["rank"] === "admin") {
      //if the user is admin
      document.getElementById("unterschrift").innerHTML += `
      <div class="infobuttondiv">
            <button id="adminButton" class="infobuttonc">Verifizierung</button>
      </div>
      `;

      document.getElementById("adminButton").onclick = function () {
        localStorage.setItem("isAdmin", true);
        window.location.href = "./admin.html";
      }
    }
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});