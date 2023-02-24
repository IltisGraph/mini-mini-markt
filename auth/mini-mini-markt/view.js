


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

const dbRef = ref(getDatabase());
get(child(dbRef, `items/${sessionStorage.getItem("selected")}`)).then((snapshot) => {
    if (snapshot.exists()) {
        console.log(snapshot.val());
        const info = snapshot.val();
        let amount = "/";
        console.log(typeof(info["amount"]));

        if(typeof(info["amount"]) === "number"){
            amount += info["amount"];
            amount += "g";
        }
        else{
            console.error();
            amount = "";
        }
        const divElement = document.createElement("div");
        divElement.innerHTML = `
    <div id="foto">
      <img id="simg" src="./img/(${sessionStorage.getItem("selected")}).jpg">
    </div>
    <div id="description">
      <h2>${info["name"]}</h2>
      <p>Preis: ${info["price"] / 100}€ ${amount}</p>
      <p>${info["slogan"]}</p>
      <p>${info["description"]}</p>
    </div>
    <div class="counter">
      <span style="padding-right: 10px">Preis:</span>
      <button class="counter-button" id="decrement">-</button>
      <input type="number" id="counter-value" value="0">
      <button class="counter-button" id="increment">+</button>
    </div>
    <div id="buy">
      <button id="buybutton">In den Warenkorb</button>
    </div>
  `;
        parentElement.appendChild(divElement);

        const counterValue = document.getElementById("counter-value");

        document.getElementById("increment").addEventListener("click", function () {
            counterValue.value++;
        });

        document.getElementById("decrement").addEventListener("click", function () {
            if (counterValue.value > 0) {
                counterValue.value--;
            }
        });

    } else {
        console.log("No data available");
    }
}).catch((error) => {
    console.error(error);
});







const parentElement = document.getElementById("main"); // replace "parent" with the ID of the parent element
const numItems = 1; // replace 10 with the desired number of items

// for (let i = 1; i <= numItems; i++) {
//   const divElement = document.createElement("div");
//   divElement.innerHTML = `
//     <div id="foto">
//       <img id="simg" src="./img/(${sessionStorage.getItem("selected")}).jpg">
//     </div>
//     <div id="description">
//       <h2>Name</h2>
//       <p>Preis:</p>
//       <p>Slogan</p>
//       <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat, beatae laudantium, atque vitae ea quibusdam reiciendis quia aliquid necessitatibus quod vel tenetur libero molestiae deleniti? Non debitis omnis fuga recusandae.</p>
//     </div>
//     <div class="counter">
//       <span style="padding-right: 10px">Preis:</span>
//       <button class="counter-button" id="decrement">-</button>
//       <input type="number" id="counter-value" value="0">
//       <button class="counter-button" id="increment">+</button>
//     </div>
//     <div id="buy">
//       <button id="buybutton">In den Warenkorb</button>
//     </div>
//   `;
//   parentElement.appendChild(divElement);
// }






// const counterValue = document.getElementById("counter-value");

// document.getElementById("increment").addEventListener("click", function () {
//     counterValue.value++;
// });

// document.getElementById("decrement").addEventListener("click", function () {
//     if (counterValue.value > 0) {
//         counterValue.value--;
//     }
// });



