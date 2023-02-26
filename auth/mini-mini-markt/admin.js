
const user = localStorage.getItem("user");
console.log("Hallo " + user + "!");
if (user == "null" || localStorage.getItem("isAdmin") != "true") {
    console.log("You are not logged in or don't have perimission to acces this page");
    document.write("You are not logged in or don't have perimission to acces this page!");
    throw new Error("User not logged in!");
}


//user is logged in!

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

let data;

const dbRef = ref(getDatabase());
get(child(dbRef, `veri`)).then((snapshot) => {
    if (snapshot.exists()) {
        console.log(snapshot.val());
        data = snapshot.val();
        let users = Object.keys(data);
        document.getElementById("anzahl").innerHTML = users.length + " neue(r) Login(s)!";

        // console.log(Object.keys(data));
        let count = 0;
        function actualize(count) {
            document.getElementById("userName").innerHTML = "Nickname: " + data[users[count]]["Nickname"];
            document.getElementById("firstName").innerHTML = "Echter Name: " + data[users[count]]["name"];
            document.getElementById("lastName").innerHTML = "Echter Nachname: " + data[users[count]]["last_name"];
        }
        actualize(count);
        document.getElementById("bestaetigt").onclick = function () {
            //write the current account into the logins
            // const db = getDatabase();
            // set(ref(db, 'logins/' + data[users[count]]["Nickname"]), {
            //     password: data[user[count]]["password"]
            // });


            //remove the account from the veri page


            const db = getDatabase();
            set(ref(db, 'veri/' + users[count]), {
            });
            if (count + 1 < users.length) {
                count++;
                actualize(count);
            } else {
                document.write("No more logins to check!");
            }
            
        }

        document.getElementById("abgelehnt").onclick = function () {
            //remove user from veri page
            const db = getDatabase();
            set(ref(db, 'veri/' + users[count]), {
            });

            //remove user from login page
            set(ref(db, 'logins/' + data[users[count]]["Nickname"]), {
            });


            if (count + 1 < users.length) {
                count++;
                actualize(count);
            } else {
                document.write("No more logins to check!");
            }
            
        }
    } else {
        console.log("No data available");
        document.getElementById("anzahl").innerHTML = "Keine Weiteren Logins verfügbar!";
    }
}).catch((error) => {
    console.error(error);
});



