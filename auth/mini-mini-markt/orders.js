
if (localStorage.getItem("isEmployee") != "true") {
    console.error("No Perimission!");
    document.write("You don't have peremission to view this file!");
    throw new Error("PeremissionError!");
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

const dbRef = ref(getDatabase());
get(child(dbRef, `logins`)).then((snapshot) => {
    if (snapshot.exists()) {
        const users = Object.keys(snapshot.val());
        const data = snapshot.val();
        for (let user of users) {
            console.log(user);
            //check if they have an order
            // if(data[user]["warenkorb"])

            console.log(data[user]["warenkorb"]);
            if (data[user]["warenkorb"] == null) {
                console.log("I don't have anything in my warenkorb!...");
            } else {
                const userWaren = data[user]["warenkorb"];
                const bestellteWarenNummern = Object.keys(userWaren);
                //formulate the bestellung
                let bestellung = "";
                for (let warenNummer of bestellteWarenNummern) {
                    console.log(warenNummer);
                    bestellung += "Warennummer:";
                    bestellung += warenNummer;
                    bestellung += "|"
                    bestellung += "Anzahl:";
                    bestellung += userWaren[warenNummer]["amount"];
                    bestellung += ";\n"
                }
                document.getElementById("main").innerHTML += `
                <div id="element">
                    <p> Name: ${user}</p>
                    Bestellung: ${bestellung}
                    <hr>
                </div>
                `
            }
        }
    } else {
        console.log("No data available");
    }
}).catch((error) => {
    console.error(error);
});