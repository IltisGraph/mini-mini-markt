
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

let isSiteLoaded = false;

let info;

const dbRef = ref(getDatabase());
get(child(dbRef, `items/${sessionStorage.getItem("selected")}`)).then((snapshot) => {
    if (snapshot.exists()) {
        console.log(snapshot.val());
        info = snapshot.val();
        let amount = "/";
        console.log(typeof (info["amount"]));

        if (typeof (info["amount"]) === "number") {
            amount += info["amount"];
            amount += "g";
        }
        else {
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
      <input type="number" id="counter-value" value="1">
      <button class="counter-button" id="increment">+</button>
    </div>
    <div id="buy">
      <button id="buybutton">Kaufen</button>
    </div>
  `;
        divElement.id = "d";
        parentElement.appendChild(divElement);
        //add functionality to the buy-button
        const counterValue = document.getElementById("counter-value");
        document.getElementById("buybutton").onclick = function () {
            //check if the counter is valid
            if (counterValue.value <= 0 || counterValue.value > 10) {
                console.warn("Invalid counter state!");
                document.write("invalid Amount!");
                return;
            }
            //is valid
            const db = getDatabase();
            console.log("Started writing to db");
            console.log("Writing to address: " + `logins/${localStorage.getItem("user")}/warenkorb/1`);
            console.log("Writing " + counterValue.value + "as amount");
            set(ref(db, `logins/${localStorage.getItem("user")}/warenkorb/1`), {
                amount: counterValue.value
            });
            console.log("Wrote to db!");
        }

        isSiteLoaded = true;


        document.getElementById("increment").addEventListener("click", function () {
            counterValue.value++;
        });

        document.getElementById("decrement").addEventListener("click", function () {
            if (counterValue.value > 1) {
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


//use timeouts to constantly check, wheather the site is already loaded


function checkAdminPanel() {
    console.log("Checking if site is loaded!");
    if (!isSiteLoaded) {
        setTimeout(checkAdminPanel, 200);
        console.log("check failed");
        return;
    }
    console.log("Check passed!");
    //if site is loaded check if user is admin and is he is, add the input fields
    get(child(dbRef, `logins/${localStorage.getItem("user")}`)).then((snapshot) => {
        if (snapshot.exists()) {
            // console.log(snapshot.val());
            if (snapshot.val()["rank"] === "employee") {
                console.log("You are an employee!");
                //add the input fields
                document.getElementById("d").innerHTML += `
                <input type="text" placeholder="Name" value="${info["name"]}" id="newName">
                <input type="text" placeholder="Preis" value="${info["price"]}" id="newPrice">
                <input type="text" placeholder="Spruch" value="${info["slogan"]}" id="newSlogan">
                <input type="text" placeholder="Beschreibung" value="${info["description"]} " id="newDescription">
                <button id="acceptnewData" style="margin-top: 10px; padding-right: 10%; margin-left: auto; margin-right: auto; text-align:center">Fertig</button>
                `;

                document.getElementById("acceptnewData").onclick = function () {
                    console.log("getting the new data");
                    const nPrice = document.getElementById("newPrice").value;
                    const nSlogan = document.getElementById("newSlogan").value;
                    const nDescription = document.getElementById("newDescription").value;
                    const nName = document.getElementById("newName").value;
                    const db = getDatabase();
                    console.log("Started writing");
                    set(ref(db, 'items/' + sessionStorage.getItem("selected")), {
                        price: nPrice,
                        description: nDescription,
                        slogan: nSlogan,
                        name: nName
                    });
                    console.log("Finished writing the new data!");
                }

            }
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

setTimeout(checkAdminPanel, 200);



